import { NextResponse } from 'next/server';
import { OpenAI } from 'openai';
import { createClient } from '@supabase/supabase-js';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Initialize Supabase client with service role key for admin operations
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);

export async function POST(request: Request) {
  try {
    const { query, documentId } = await request.json();

    if (!query) {
      return NextResponse.json(
        { error: 'No query provided' },
        { status: 400 }
      );
    }

    if (!documentId) {
      return NextResponse.json(
        { error: 'No document ID provided' },
        { status: 400 }
      );
    }

    console.log(`Processing query for document ${documentId}:`, query);

    // Generate embedding for the query
    const embeddingResponse = await openai.embeddings.create({
      model: process.env.EMBED_MODEL || 'text-embedding-3-small',
      input: query,
    });
    const queryEmbedding = embeddingResponse.data[0].embedding;
    
    // Query the database using the match_documents function with document ID filter
    const { data: matches, error } = await supabaseAdmin.rpc('match_documents', {
      query_embedding: queryEmbedding,
      match_count: 5,
      min_similarity: 0.2,
      document_id_filter: documentId
    });

    if (error) {
      console.error('Database error:', error);
      throw error;
    }

    // Fetch the document name for reference
    const { data: documentInfo, error: documentError } = await supabaseAdmin
      .from('documents')
      .select('file_name')
      .eq('id', documentId)
      .single();

    if (documentError) {
      console.error('Error fetching document info:', documentError);
    }

    console.log('Number of matches found:', matches?.length || 0);

    if (!matches || matches.length === 0) {
      return NextResponse.json({
        answer: "I couldn't find any relevant information in this document related to your query.",
        documentId,
        documentName: documentInfo?.file_name || 'Unknown'
      });
    }

    // Use the matches to generate a response
    const context = matches.map((match: any) => match.document_content).join('\n\n');
    
    const completion = await openai.chat.completions.create({
      model: process.env.MODEL_NAME || 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: `You are a helpful assistant that answers questions based on the provided document content.
            Only answer questions based on the information in the document.
            If the document doesn't contain information to answer the question, say so politely.
            The document content is from: "${documentInfo?.file_name || 'the requested document'}"`
        },
        {
          role: 'user',
          content: `Context: ${context}\n\nQuestion: ${query}`
        }
      ],
      temperature: 0.7,
      max_tokens: 500
    });

    const answer = completion.choices[0].message.content;

    return NextResponse.json({
      answer,
      documentId,
      documentName: documentInfo?.file_name || 'Unknown'
    });
  } catch (error) {
    console.error('Document query error:', error);
    return NextResponse.json(
      { error: 'Failed to process document query' },
      { status: 500 }
    );
  }
} 