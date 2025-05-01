import { supabase } from './supabase';

/**
 * Performs similarity search on documents using vector embeddings
 * @param queryEmbedding - The embedding vector of the search query
 * @param matchCount - Maximum number of matching documents to return (default: 5)
 * @param minSimilarity - Minimum similarity threshold (default: 0.75)
 * @returns Array of matching documents with their similarity scores
 * @throws Error if the database query fails
 */
export async function matchDocuments(
  queryEmbedding: number[],
  matchCount: number = 5,
  minSimilarity: number = 0.75,
  category?: string
) {
  // Build the RPC parameters
  const rpcParams: any = {
    query_embedding: queryEmbedding,
    match_count: matchCount,
    min_similarity: minSimilarity,
  };

  // Add category filter if provided
  if (category) {
    rpcParams.category_filter = category;
  }

  const { data, error } = await supabase.rpc('match_documents', rpcParams);

  if (error) {
    console.error('Error matching documents:', error);
    throw error;
  }

  return data;
}

/**
 * Inserts a new document into the database with its vector embedding
 * @param userId - ID of the user who uploaded the document
 * @param fileName - Original name of the uploaded file
 * @param content - Extracted text content from the document
 * @param embedding - Vector representation of the document content
 * @returns The inserted document record
 * @throws Error if the database insertion fails
 */
export async function insertDocument(
  userId: string,
  fileName: string,
  content: string,
  embedding: number[]
) {
  const { data, error } = await supabase
    .from('documents')
    .insert([
      {
        user_id: userId,
        file_name: fileName,
        content,
        embedding,
      },
    ])
    .select();

  if (error) {
    console.error('Error inserting document:', error);
    throw error;
  }

  return data[0];
}

/**
 * Inserts a new document into the database with category and size information
 * @param userId - ID of the user who uploaded the document
 * @param fileName - Original name of the uploaded file
 * @param content - Extracted text content from the document
 * @param embedding - Vector representation of the document content
 * @param category - Category of the document (contractAgent, rfpAgent, operations, etc.)
 * @param fileSize - Size of the file in bytes
 * @returns The inserted document record
 * @throws Error if the database insertion fails
 */
export async function insertDocumentWithCategory(
  userId: string,
  fileName: string,
  content: string,
  embedding: number[],
  category: string = 'general',
  fileSize: number = 0
) {
  const { data, error } = await supabase
    .from('documents')
    .insert([
      {
        user_id: userId,
        file_name: fileName,
        content,
        embedding,
        category,
        size: fileSize,
      },
    ])
    .select();

  if (error) {
    console.error('Error inserting document:', error);
    throw error;
  }

  return data[0];
} 