import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client with service role key for admin operations
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);

// Get a specific document for preview purposes
export async function GET(
  request: Request,
  { params }: { params: Promise<{ documentId: string }> }
) {
  try {
    const { documentId } = await params;
    console.log(`Fetching document with ID: ${documentId}`);
    
    if (!documentId) {
      return NextResponse.json(
        { error: 'Document ID is required' },
        { status: 400 }
      );
    }

    // Get document details
    const { data: document, error: fetchError } = await supabaseAdmin
      .from('documents')
      .select('file_name, category, user_id')
      .eq('id', documentId)
      .single();

    if (fetchError) {
      console.error('Error fetching document details:', fetchError);
      throw fetchError;
    }

    console.log(`Found document: ${document.file_name} in category: ${document.category}`);

    // List files in the category folder to find matching file
    const { data: bucketFiles, error: listError } = await supabaseAdmin
      .storage
      .from('manuals')
      .list(document.category);
    
    if (listError) {
      console.error('Error listing storage bucket:', listError);
      throw listError;
    }

    console.log(`Found ${bucketFiles?.length || 0} files in the category folder`);

    // Find the file that ends with the document's filename
    const matchingFile = bucketFiles.find(file => 
      file.name.endsWith(document.file_name)
    );

    if (!matchingFile) {
      console.error(`No matching file found for ${document.file_name}`);
      
      // Log all files in the bucket for debugging
      console.log('Available files:', bucketFiles.map(f => f.name).join(', '));
      
      return NextResponse.json(
        { error: 'File not found in storage' },
        { status: 404 }
      );
    }

    console.log(`Found matching file: ${matchingFile.name}`);

    // Try both methods to get a URL
    
    // First try signed URL
    try {
      const { data: urlData, error: signedUrlError } = await supabaseAdmin
        .storage
        .from('manuals')
        .createSignedUrl(`${document.category}/${matchingFile.name}`, 60 * 30); // 30 minutes expiry

      if (signedUrlError) {
        console.error('Error creating signed URL:', signedUrlError);
        throw signedUrlError;
      }

      if (urlData?.signedUrl) {
        console.log('Generated signed URL successfully');
        return NextResponse.json({ url: urlData.signedUrl });
      }
    } catch (signedUrlError) {
      console.error('Error generating signed URL:', signedUrlError);
      // Continue to public URL if signed URL fails
    }
    
    // If signed URL fails, try public URL
    try {
      const { data: publicUrlData } = supabaseAdmin
        .storage
        .from('manuals')
        .getPublicUrl(`${document.category}/${matchingFile.name}`);
      
      if (publicUrlData?.publicUrl) {
        console.log('Generated public URL successfully');
        // Return the public URL with proper headers for embedding
        return NextResponse.json({ 
          url: publicUrlData.publicUrl,
          contentType: 'application/pdf'
        });
      }
    } catch (publicUrlError) {
      console.error('Error generating public URL:', publicUrlError);
    }
    
    // If we get here, both methods failed
    throw new Error('Could not generate URL for document');
  } catch (error: any) {
    console.error('Error in document fetch API:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch document' },
      { status: 500 }
    );
  }
} 