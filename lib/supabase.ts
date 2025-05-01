import { createClient } from '@supabase/supabase-js';

// Validate required environment variables
if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
  throw new Error('Missing env.NEXT_PUBLIC_SUPABASE_URL');
}
if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  throw new Error('Missing env.NEXT_PUBLIC_SUPABASE_ANON_KEY');
}

/**
 * Supabase client instance configured with environment variables
 * - Uses the public URL and anonymous key for client-side operations
 * - Persists authentication sessions for better UX
 */
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  {
    auth: {
      persistSession: true,
    },
  }
);

/**
 * Type definition for documents stored in the database
 * - id: Unique identifier for the document
 * - user_id: Reference to the user who uploaded the document
 * - file_name: Original name of the uploaded file
 * - content: Extracted text content from the document
 * - embedding: Vector representation of the document content (1536 dimensions)
 * - created_at: Timestamp of when the document was created
 */
export type Document = {
  id: string;
  user_id: string;
  file_name: string;
  content: string;
  embedding: number[];
  created_at: string;
}; 