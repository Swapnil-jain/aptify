// import { NextResponse } from 'next/server';
// import { createClient } from '@supabase/supabase-js';

// // Initialize Supabase client with service role key for admin operations
// const supabaseAdmin = createClient(
//   process.env.NEXT_PUBLIC_SUPABASE_URL!,
//   process.env.SUPABASE_SERVICE_KEY!
// );

// export async function POST(request: Request) {
//   try {
//     const { query, contractId } = await request.json();
    
//     if (!query) {
//       return NextResponse.json(
//         { error: 'Query is required' },
//         { status: 400 }
//       );
//     }

//     if (!contractId) {
//       return NextResponse.json(
//         { error: 'Contract ID is required' },
//         { status: 400 }
//       );
//     }

//     // Fetch contract details
//     const { data: contract, error: contractError } = await supabaseAdmin
//       .from('contracts')
//       .select('*')
//       .eq('id', contractId)
//       .single();

//     if (contractError) {
//       throw contractError;
//     }

//     if (!contract) {
//       return NextResponse.json(
//         { error: 'Contract not found' },
//         { status: 404 }
//       );
//     }

//     // In a real application, this would use an AI model to analyze the contract
//     // and provide an answer to the query. For now, we'll return a mock response.
    
//     // Generate mock answer based on the query
//     let answer = '';
//     const lowercaseQuery = query.toLowerCase();
    
//     if (lowercaseQuery.includes('expiry') || lowercaseQuery.includes('expire')) {
//       answer = `This contract expires on ${contract.expiry_date}.`;
//     } else if (lowercaseQuery.includes('risk') || lowercaseQuery.includes('metrics')) {
//       answer = `The contract has the following risk metrics: Temperature: ${contract.risk_metrics?.temperature}°C, Humidity: ${contract.risk_metrics?.humidity}%, Expiry timeline: ${contract.risk_metrics?.expiry_timeline} days.`;
//     } else if (lowercaseQuery.includes('party') || lowercaseQuery.includes('parties')) {
//       answer = `This contract is between ${contract.parties?.join(' and ')}.`;
//     } else {
//       answer = `The contract "${contract.name}" was created on ${new Date(contract.created_at).toLocaleDateString()}.`;
//     }

//     return NextResponse.json({ answer });
//   } catch (error: any) {
//     console.error('Error processing query:', error);
//     return NextResponse.json(
//       { error: 'Failed to process query' },
//       { status: 500 }
//     );
//   }
// } 