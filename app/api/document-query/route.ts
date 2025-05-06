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

    // Fetch the specific document content from Supabase
    const { data: document, error: documentError } = await supabaseAdmin
      .from('documents')
      .select('content, file_name, id')
      .eq('id', documentId)
      .single();

    if (documentError) {
      console.error('Error fetching document:', documentError);
      return NextResponse.json(
        { error: 'Failed to retrieve document content' },
        { status: 500 }
      );
    }

    if (!document) {
      return NextResponse.json(
        { error: 'Document not found' },
        { status: 404 }
      );
    }

    console.log(`Found document: ${document.file_name}`);

    // Use the document content to generate a response
    const completion = await openai.chat.completions.create({
      model: process.env.MODEL_NAME || 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: `You are a helpful assistant that answers questions based on the provided PDF document content.
            Only answer questions based on the information in the document.
            If the document doesn't contain information to answer the question, say so politely.
            The document content is from: "${document.file_name}"`
        },
        {
          role: 'user',
          content: `Document content: ${document.content}\n\nQuestion: ${query}`
        }
      ],
      temperature: 0.7,
      max_tokens: 500
    });

    const answer = completion.choices[0].message.content;

    return NextResponse.json({
      answer,
      documentId: document.id,
      documentName: document.file_name
    });
  } catch (error) {
    console.error('Document query error:', error);
    return NextResponse.json(
      { error: 'Failed to process document query' },
      { status: 500 }
    );
  }
} 