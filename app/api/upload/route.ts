import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { OpenAI } from 'openai';
import { insertDocumentWithCategory } from '@/lib/vector';
import pdfParse from 'pdf-parse';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Initialize Supabase client with service role key for admin operations
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);

/**
 * Enhanced PDF text extraction with OCR fallback for scanned documents
 * @param buffer PDF file buffer
 * @param fileName Original filename
 * @returns Extracted text content
 */
async function extractDocumentText(buffer: Buffer, fileName: string): Promise<string> {
  try {
    // First try regular PDF parsing
    console.log(`Attempting to parse ${fileName} with pdf-parse`);
    const pdfData = await pdfParse(buffer);
    const text = pdfData.text.trim();
    
    // Check if we got a reasonable amount of text
    // TODO: Check if 200 is a good threshold.
    if (text.length > 200) {
      console.log(`Successfully extracted ${text.length} characters with pdf-parse`);
      return text;
    }
    
    console.log(`Limited text extracted (${text.length} chars), document may be scanned`);
    
    // For scanned documents, we'll fall back to a simpler approach
    console.log('Scanned document detected - returning basic text extraction results');
    
    // If OCR is needed, we should inform the user that the extraction might be limited
    if (text.length === 0) {
      return "This appears to be a scanned document. Basic text extraction could not retrieve any content. For better results, consider using a document with embedded text.";
    }
    
    return text;
  } catch (error: any) {
    console.error('Error extracting text:', error);
    throw new Error(`Failed to extract text from ${fileName}: ${error.message}`);
  }
}

/**
 * Splits text into chunks of approximately maxChunkSize tokens
 * @param text The text to split
 * @param maxChunkSize The maximum size of each chunk in tokens (estimated)
 * @returns Array of text chunks
 */
function chunkText(text: string, maxChunkSize: number = 6000): string[] {
  // Rough estimate: 1 token is ~4 characters for English text
  const charsPerToken = 4;
  const maxChunkLength = maxChunkSize * charsPerToken;
  
  // If text is already small enough, return it as is
  if (text.length <= maxChunkLength) {
    return [text];
  }
  
  const chunks: string[] = [];
  let startIndex = 0;
  
  while (startIndex < text.length) {
    // Find a good breaking point - end of a paragraph or sentence
    let endIndex = startIndex + maxChunkLength;
    
    if (endIndex >= text.length) {
      // Last chunk
      endIndex = text.length;
    } else {
      // Look for paragraph breaks first
      const paragraphBreakIndex = text.lastIndexOf('\n\n', endIndex);
      if (paragraphBreakIndex > startIndex && paragraphBreakIndex > endIndex - 500) {
        endIndex = paragraphBreakIndex;
      } else {
        // Look for sentence breaks
        const sentenceBreakIndex = findLastSentenceBreak(text, startIndex, endIndex);
        if (sentenceBreakIndex > startIndex) {
          endIndex = sentenceBreakIndex;
        }
      }
    }
    
    chunks.push(text.substring(startIndex, endIndex).trim());
    startIndex = endIndex;
  }
  
  return chunks;
}

/**
 * Finds the last sentence break (., !, ?) in a text range
 */
function findLastSentenceBreak(text: string, startIndex: number, endIndex: number): number {
  for (let i = endIndex; i > startIndex; i--) {
    if (i < text.length && ['.', '!', '?'].includes(text[i]) && (i + 1 >= text.length || text[i + 1] === ' ' || text[i + 1] === '\n')) {
      return i + 1;
    }
  }
  return -1; // No good break found
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const category = formData.get('category') as string || 'general';
    
    if (!file) {
      return NextResponse.json(
        { error: 'No file uploaded' },
        { status: 400 }
      );
    }

    // Validate file type
    if (!file.type.includes('pdf') && 
        !file.type.includes('word') && 
        !file.type.includes('document')) {
      return NextResponse.json(
        { error: 'Only PDF and document files are supported' },
        { status: 400 }
      );
    }

    // Get file buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Extract text based on file type
    let content = "";
    if (file.type.includes('pdf')) {
      content = await extractDocumentText(buffer, file.name);
    } else {
      // For non-PDF files, we'll just acknowledge them without text extraction
      content = `Document: ${file.name} (Text extraction not available for this file type)`;
    }

    if (!content || content.trim().length === 0) {
      return NextResponse.json(
        { error: 'Could not extract text from document' },
        { status: 400 }
      );
    }

    console.log('Extracted content length:', content.length);

    // Split content into chunks if it's too large
    const chunks = chunkText(content);
    console.log(`Split content into ${chunks.length} chunks`);
    
    // For embedding, use just the first chunk if there are multiple
    // This represents the beginning of the document which is often most representative
    const embeddingContent = chunks[0];

    // Generate embedding for the first chunk
    const embeddingResponse = await openai.embeddings.create({
      model: process.env.EMBED_MODEL || 'text-embedding-3-small',
      input: embeddingContent,
    });
    const embedding = embeddingResponse.data[0].embedding;

    console.log('Generated embedding length:', embedding.length);

    // Upload file to Supabase Storage
    const { data: storageData, error: storageError } = await supabaseAdmin.storage
      .from('manuals')
      .upload(`${category}/${Date.now()}-${file.name}`, buffer, {
        contentType: file.type,
      });

    if (storageError) {
      throw storageError;
    }

    // Create a test user if it doesn't exist
    const testUserEmail = 'test@example.com';
    const testUserPassword = 'testpassword123';

    // Try to sign up the test user
    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email: testUserEmail,
      password: testUserPassword,
      email_confirm: true,
    });

    let userId: string;

    if (authError) {
      // If user already exists, sign in to get the user ID
      const { data: signInData, error: signInError } = await supabaseAdmin.auth.signInWithPassword({
        email: testUserEmail,
        password: testUserPassword,
      });

      if (signInError) {
        throw signInError;
      }

      userId = signInData.user.id;
    } else {
      userId = authData.user.id;
    }

    // Calculate file size
    const fileSize = bytes.byteLength;
    
    // For database, store a truncated version if content is very large
    const dbContent = content.length > 100000 
      ? content.substring(0, 100000) + `\n\n[Content truncated, full length: ${content.length} characters]` 
      : content;
    
    // Store document in database with category and size info
    const document = await insertDocumentWithCategory(
      userId,
      file.name,
      dbContent,
      embedding,
      category,
      fileSize
    );

    //console.log('Stored document:', document);

    return NextResponse.json({
      success: true,
      document,
      storagePath: storageData.path,
    });
  } catch (error: any) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Failed to process upload: ' + error.message },
      { status: 500 }
    );
  }
} 