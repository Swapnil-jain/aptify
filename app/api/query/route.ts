// import { NextResponse } from 'next/server';
// import { OpenAI } from 'openai';
// import { createClient } from '@supabase/supabase-js';

// // Initialize OpenAI client
// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// // Initialize Supabase client with service role key for admin operations
// const supabaseAdmin = createClient(
//   process.env.NEXT_PUBLIC_SUPABASE_URL!,
//   process.env.SUPABASE_SERVICE_KEY!
// );

// interface DocumentMatch {
//   document_content: string;
//   similarity: number;
// }

// export async function POST(request: Request) {
//   try {
//     const { query } = await request.json();

//     if (!query) {
//       return NextResponse.json(
//         { error: 'No query provided' },
//         { status: 400 }
//       );
//     }

//     console.log('Processing query:', query);

//     // Generate embedding for the query
//     const embeddingResponse = await openai.embeddings.create({
//       model: process.env.EMBED_MODEL || 'text-embedding-3-small',
//       input: query,
//     });
//     const queryEmbedding = embeddingResponse.data[0].embedding;
    
//     // Query the database using the match_documents function
//     const { data: matches, error } = await supabaseAdmin.rpc('match_documents', {
//       query_embedding: queryEmbedding,
//       match_count: 5,
//       min_similarity: 0.2 // Lowered threshold to match our test documents
//     });

//     if (error) {
//       console.error('Database error:', error);
//       throw error;
//     }

//     console.log('Number of matches found:', matches?.length || 0);
//     if (matches && matches.length > 0) {
//       console.log('Matches details:', matches.map((match: DocumentMatch) => ({
//         similarity: match.similarity,
//         contentPreview: match.document_content.substring(0, 100)
//       })));
//     } else {
//       // If no matches, let's try to find any documents at all
//       const { data: allDocs, error: allDocsError } = await supabaseAdmin
//         .from('documents')
//         .select('id, content')
//         .limit(5);
      
//       if (allDocsError) {
//         console.error('Error fetching documents:', allDocsError);
//       } else {
//         console.log('Total documents in database:', allDocs?.length || 0);
//         if (allDocs && allDocs.length > 0) {
//           console.log('Available documents:', allDocs.map(doc => ({
//             id: doc.id,
//             contentPreview: doc.content.substring(0, 100)
//           })));
//         }
//       }
//     }

//     if (!matches || matches.length === 0) {
//       return NextResponse.json({
//         answer: "I couldn't find any relevant information in the manuals. The documents available don't seem to contain information about your query.",
//         sources: []
//       });
//     }

//     // Use the matches to generate a response
//     const context = matches.map((match: DocumentMatch) => match.document_content).join('\n\n');
    
//     const completion = await openai.chat.completions.create({
//       model: process.env.CHAT_MODEL || 'gpt-4o-mini',
//       messages: [
//         {
//           role: 'system',
//           content: 'You are a helpful assistant that answers questions based on the provided context. If the context does not contain relevant information, say so. Do not make up information.'
//         },
//         {
//           role: 'user',
//           content: `Context: ${context}\n\nQuestion: ${query}`
//         }
//       ],
//       temperature: 0.7,
//       max_tokens: 500
//     });

//     const answer = completion.choices[0].message.content;

//     return NextResponse.json({
//       answer,
//       sources: matches.map((match: DocumentMatch) => ({
//         content: match.document_content,
//         similarity: match.similarity
//       }))
//     });
//   } catch (error) {
//     console.error('Query error:', error);
//     return NextResponse.json(
//       { error: 'Failed to process query' },
//       { status: 500 }
//     );
//   }
// } 