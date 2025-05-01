// import { NextResponse } from 'next/server';
// import { createClient } from '@supabase/supabase-js';

// // Initialize Supabase client with service role key for admin operations
// const supabaseAdmin = createClient(
//   process.env.NEXT_PUBLIC_SUPABASE_URL!,
//   process.env.SUPABASE_SERVICE_KEY!
// );

// // Get all contracts with risk metrics
// export async function GET() {
//   try {
//     // For simplicity, we're using a test user
//     const testUserEmail = 'test@example.com';
//     const testUserPassword = 'testpassword123';

//     // Sign in to get the user ID
//     const { data: signInData, error: signInError } = await supabaseAdmin.auth.signInWithPassword({
//       email: testUserEmail,
//       password: testUserPassword,
//     });

//     if (signInError) {
//       throw signInError;
//     }

//     const userId = signInData.user.id;

//     // Fetch contracts for this user
//     const { data, error } = await supabaseAdmin
//       .from('contracts')
//       .select('id, name, created_at, expiry_date, risk_metrics')
//       .eq('user_id', userId)
//       .order('created_at', { ascending: false });

//     if (error) {
//       throw error;
//     }

//     return NextResponse.json({ contracts: data });
//   } catch (error: any) {
//     console.error('Error fetching contracts:', error);
//     return NextResponse.json(
//       { error: 'Failed to fetch contracts' },
//       { status: 500 }
//     );
//   }
// }

// // Delete a contract
// export async function DELETE(request: Request) {
//   try {
//     const { contractId } = await request.json();
    
//     if (!contractId) {
//       return NextResponse.json(
//         { error: 'Contract ID is required' },
//         { status: 400 }
//       );
//     }

//     // Delete the contract from the database
//     const { error: deleteError } = await supabaseAdmin
//       .from('contracts')
//       .delete()
//       .eq('id', contractId);

//     if (deleteError) {
//       throw deleteError;
//     }

//     return NextResponse.json({ success: true });
//   } catch (error: any) {
//     console.error('Error deleting contract:', error);
//     return NextResponse.json(
//       { error: 'Failed to delete contract' },
//       { status: 500 }
//     );
//   }
// } 