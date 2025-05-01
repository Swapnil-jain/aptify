import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client with service role key for admin operations
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);

// Get all documents for knowledge library
export async function GET() {
  try {
    // For simplicity, we're using a test user
    const testUserEmail = 'test@example.com';
    const testUserPassword = 'testpassword123';

    // Sign in to get the user ID
    const { data: signInData, error: signInError } = await supabaseAdmin.auth.signInWithPassword({
      email: testUserEmail,
      password: testUserPassword,
    });

    if (signInError) {
      throw signInError;
    }

    const userId = signInData.user.id;

    // Fetch documents for this user
    const { data, error } = await supabaseAdmin
      .from('documents')
      .select('id, file_name, created_at')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      throw error;
    }

    return NextResponse.json({ documents: data });
  } catch (error: any) {
    console.error('Error fetching documents:', error);
    return NextResponse.json(
      { error: 'Failed to fetch documents' },
      { status: 500 }
    );
  }
}

// Delete a specific document
export async function DELETE(request: Request) {
  try {
    const { documentId } = await request.json();
    
    if (!documentId) {
      return NextResponse.json(
        { error: 'Document ID is required' },
        { status: 400 }
      );
    }

    // Get document details first to delete from storage
    const { data: document, error: fetchError } = await supabaseAdmin
      .from('documents')
      .select('file_name, id, user_id, category')
      .eq('id', documentId)
      .single();

    if (fetchError) {
      throw fetchError;
    }

    // Delete the file from storage bucket - using the pattern from upload/route.ts
    // Pattern: `${category}/${Date.now()}-${file.name}`
    
    // First list the bucket contents to find the exact file
    const { data: bucketFiles, error: listError } = await supabaseAdmin
      .storage
      .from('manuals') // Bucket name from upload implementation
      .list(document.category); // List files in the category folder
    
    if (listError) {
      console.error('Error listing bucket files:', listError);
    } else {
      // Find all files that match the file name (ignoring the timestamp prefix)
      const matchingFiles = bucketFiles.filter(file => 
        file.name.endsWith(document.file_name)
      );
      
      // Delete each matching file
      if (matchingFiles.length > 0) {
        for (const file of matchingFiles) {
          const filePath = `${document.category}/${file.name}`;
          const { error: removeError } = await supabaseAdmin
            .storage
            .from('manuals')
            .remove([filePath]);
          
          if (!removeError) {
            console.log(`Successfully deleted file: ${filePath}`);
          } else {
            console.error(`Failed to delete file ${filePath}:`, removeError);
          }
        }
      } else {
        console.warn(`No matching files found for ${document.file_name} in ${document.category} folder`);
      }
    }

    // Delete the document from the database
    const { error: deleteError } = await supabaseAdmin
      .from('documents')
      .delete()
      .eq('id', documentId);

    if (deleteError) {
      throw deleteError;
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error deleting document:', error);
    return NextResponse.json(
      { error: 'Failed to delete document' },
      { status: 500 }
    );
  }
} 