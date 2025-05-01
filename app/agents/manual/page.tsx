// 'use client';

// import { useState, useEffect } from 'react';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Card } from '@/components/ui/card';
// import { Loader2, AlertCircle, FileText, Trash2, RefreshCcw } from 'lucide-react';

// interface Document {
//   id: string;
//   file_name: string;
//   created_at: string;
// }

// export default function AgentsPage() {
//   const [file, setFile] = useState<File | null>(null);
//   const [uploading, setUploading] = useState(false);
//   const [query, setQuery] = useState('');
//   const [answer, setAnswer] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [documents, setDocuments] = useState<Document[]>([]);
//   const [libraryLoading, setLibraryLoading] = useState(false);

//   // Fetch documents on page load
//   useEffect(() => {
//     fetchDocuments();
//   }, []);

//   const fetchDocuments = async () => {
//     setLibraryLoading(true);
//     try {
//       const response = await fetch('/api/documents');
//       const data = await response.json();
      
//       if (data.error) {
//         console.error('Error fetching documents:', data.error);
//       } else {
//         setDocuments(data.documents);
//       }
//     } catch (error) {
//       console.error('Failed to fetch documents:', error);
//     } finally {
//       setLibraryLoading(false);
//     }
//   };

//   const handleDeleteDocument = async (documentId: string) => {
//     if (!confirm('Are you sure you want to delete this document?')) return;
    
//     try {
//       const response = await fetch('/api/documents', {
//         method: 'DELETE',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ documentId }),
//       });

//       const data = await response.json();
      
//       if (data.success) {
//         // Remove the document from the state
//         setDocuments(documents.filter(doc => doc.id !== documentId));
//       } else {
//         setError('Failed to delete document');
//       }
//     } catch (error) {
//       setError('Failed to delete document');
//     }
//   };

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setError(null);
//     if (e.target.files && e.target.files[0]) {
//       const selectedFile = e.target.files[0];
//       if (selectedFile.type !== 'application/pdf') {
//         setError('Please upload a PDF file');
//         setFile(null);
//         return;
//       }
//       setFile(selectedFile);
//     }
//   };

//   const handleUpload = async () => {
//     if (!file) return;

//     setUploading(true);
//     setError(null);
//     const formData = new FormData();
//     formData.append('file', file);

//     try {
//       const response = await fetch('/api/upload', {
//         method: 'POST',
//         body: formData,
//       });

//       const data = await response.json();
//       if (data.success) {
//         setFile(null);
//         setError(null);
//         // Refresh the documents list after successful upload
//         fetchDocuments();
//       } else {
//         setError(data.error || 'Upload failed');
//       }
//     } catch (error) {
//       setError('Upload failed. Please try again.');
//     } finally {
//       setUploading(false);
//     }
//   };

//   const handleQuery = async () => {
//     if (!query.trim()) return;

//     setLoading(true);
//     setError(null);
//     try {
//       const response = await fetch('/api/query', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ query }),
//       });

//       const data = await response.json();
//       if (data.error) {
//         setError(data.error);
//       } else {
//         setAnswer(data.answer);
//       }
//     } catch (error) {
//       setError('Failed to get answer. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <main className="container mx-auto p-4 max-w-3xl">
//       <h1 className="text-2xl font-bold mb-6">Manual Q&A Assistant</h1>
      
//       {/* File Upload Section */}
//       <Card className="p-4 mb-6">
//         <h2 className="text-xl font-semibold mb-4">Upload Manual</h2>
//         <div className="flex flex-col gap-4">
//           <div className="flex gap-4">
//             <Input
//               type="file"
//               accept=".pdf"
//               onChange={handleFileChange}
//               className="flex-1"
//             />
//             <Button 
//               onClick={handleUpload}
//               disabled={!file || uploading}
//             >
//               {uploading ? (
//                 <>
//                   <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                   Uploading...
//                 </>
//               ) : (
//                 'Upload'
//               )}
//             </Button>
//           </div>
//           {error && (
//             <div className="flex items-center gap-2 text-red-500">
//               <AlertCircle className="h-4 w-4" />
//               <span>{error}</span>
//             </div>
//           )}
//         </div>
//       </Card>

//       {/* Query Section */}
//       <Card className="p-4 mb-6">
//         <h2 className="text-xl font-semibold mb-4">Ask a Question</h2>
//         <div className="flex flex-col gap-4">
//           <Input
//             type="text"
//             placeholder="Type your question here..."
//             value={query}
//             onChange={(e) => setQuery(e.target.value)}
//             onKeyDown={(e) => e.key === 'Enter' && handleQuery()}
//           />
//           <Button 
//             onClick={handleQuery}
//             disabled={!query.trim() || loading}
//           >
//             {loading ? (
//               <>
//                 <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                 Thinking...
//               </>
//             ) : (
//               'Ask'
//             )}
//           </Button>
//         </div>

//         {/* Answer Display */}
//         {answer && (
//           <div className="mt-4 p-4 bg-muted rounded-lg">
//             <h3 className="font-semibold mb-2">Answer:</h3>
//             <p className="whitespace-pre-wrap">{answer}</p>
//           </div>
//         )}
//       </Card>

//       {/* Knowledge Library Section */}
//       <Card className="p-4">
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-xl font-semibold">Knowledge Library</h2>
//           <Button 
//             variant="outline" 
//             size="sm" 
//             onClick={fetchDocuments}
//             disabled={libraryLoading}
//           >
//             <RefreshCcw className={`h-4 w-4 mr-2 ${libraryLoading ? 'animate-spin' : ''}`} />
//             Refresh
//           </Button>
//         </div>

//         {libraryLoading ? (
//           <div className="flex justify-center py-8">
//             <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
//           </div>
//         ) : documents.length === 0 ? (
//           <div className="text-center py-8 text-muted-foreground">
//             <p>No documents found. Upload a PDF to get started.</p>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             {documents.map((doc) => (
//               <div 
//                 key={doc.id} 
//                 className="border rounded-lg p-3 flex items-start gap-3 hover:bg-muted/50 transition-colors"
//               >
//                 <div className="p-2 bg-primary/10 rounded-md">
//                   <FileText className="h-6 w-6 text-primary" />
//                 </div>
//                 <div className="flex-1 min-w-0">
//                   <h3 className="font-medium truncate" title={doc.file_name}>
//                     {doc.file_name}
//                   </h3>
//                   <p className="text-sm text-muted-foreground">
//                     {new Date(doc.created_at).toLocaleDateString()}
//                   </p>
//                 </div>
//                 <Button
//                   variant="ghost"
//                   size="icon"
//                   className="text-muted-foreground hover:text-destructive"
//                   onClick={() => handleDeleteDocument(doc.id)}
//                   title="Delete document"
//                 >
//                   <Trash2 className="h-4 w-4" />
//                 </Button>
//               </div>
//             ))}
//           </div>
//         )}
//       </Card>
//     </main>
//   );
// } 