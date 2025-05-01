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

// export async function POST(request: Request) {
//   try {
//     const { category } = await request.json();
    
//     if (!category) {
//       return NextResponse.json(
//         { error: 'Category is required' }, 
//         { status: 400 }
//       );
//     }
    
//     // You could add more functionality here, like creating placeholder documents
    
//     return NextResponse.json({ success: true });
    
//   } catch (error) {
//     console.error('Error in POST:', error);
//     return NextResponse.json(
//       { error: 'Failed to process request' }, 
//       { status: 500 }
//     );
//   }
// } 