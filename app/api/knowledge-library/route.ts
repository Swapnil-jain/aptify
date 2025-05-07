import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-server';

// Get all documents with optional category filter
export async function GET() {
  try {
    // Fetch documents from Supabase
    const { data: documents, error } = await supabaseAdmin
      .from('documents')
      .select('id, file_name, created_at, category, size')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching documents:', error);
      return NextResponse.json(
        { error: 'Failed to fetch documents' }, 
        { status: 500 }
      );
    }

    // Return the fetched documents
    return NextResponse.json({ documents });
    
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch documents' }, 
      { status: 500 }
    );
  }
}