'use client';

import { useState, useEffect } from 'react';
import { 
  FileText, 
  Upload, 
  ChevronDown, 
  ChevronUp, 
  Loader2, 
  AlertCircle, 
  Trash2 
} from 'lucide-react';

interface Document {
  id: string;
  file_name: string;
  created_at: string;
  category: string;
  size: string;
}

// Example size formatter
const formatFileSize = (bytes: number): string => {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1048576) return (bytes / 1024).toFixed(0) + ' KB';
  return (bytes / 1048576).toFixed(0) + ' MB';
};

export default function KnowledgeLibrary() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedSection, setExpandedSection] = useState<string>('contractAgent');
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadCategory, setUploadCategory] = useState<string>('');

  // Fetch actual documents from the API on component mount
  useEffect(() => {
    fetchDocuments();
  }, []);

  // Fetch documents from the API
  const fetchDocuments = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/knowledge-library');
      const data = await response.json();
      
      if (data.error) {
        console.error('Error fetching documents:', data.error);
        setError(data.error);
        setDocuments([]);
      } else {
        console.log('Fetched documents:', data.documents);
        setDocuments(data.documents || []);
        setError(null);
      }
    } catch (error) {
      console.error('Failed to fetch documents:', error);
      setError('Failed to fetch documents');
      setDocuments([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSectionToggle = (section: string) => {
    if (expandedSection === section) {
      setExpandedSection('');
    } else {
      setExpandedSection(section);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, category: string) => {
    setError(null);
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (!selectedFile.type.includes('pdf') && 
          !selectedFile.type.includes('word') && 
          !selectedFile.type.includes('document')) {
        setError('Please upload a PDF or document file');
        setFile(null);
        return;
      }
      setFile(selectedFile);
      setUploadCategory(category);
    }
  };

  const handleUpload = async () => {
    if (!file || !uploadCategory) return;

    setUploading(true);
    setError(null);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('category', uploadCategory);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (data.success) {
        // Add the new document to the list
        const newDoc: Document = {
          id: data.document.id,
          file_name: file.name,
          created_at: new Date().toISOString(),
          category: uploadCategory,
          size: formatFileSize(file.size)
        };
        
        setDocuments([...documents, newDoc]);
        setFile(null);
      } else {
        setError(data.error || 'Upload failed');
      }
    } catch (error) {
      setError('Upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteDocument = async (documentId: string) => {
    if (!confirm('Are you sure you want to delete this document?')) return;
    
    try {
      const response = await fetch('/api/documents', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ documentId }),
      });

      const data = await response.json();
      
      if (data.success) {
        // Remove the document from the state
        setDocuments(documents.filter(doc => doc.id !== documentId));
      } else {
        setError('Failed to delete document');
      }
    } catch (error) {
      setError('Failed to delete document');
    }
  };

  // Helper to render documents for a category
  const renderDocuments = (category: string) => {
    const categoryDocs = documents.filter(doc => doc.category === category);
    
    if (categoryDocs.length === 0) {
      return (
        <div className="text-center py-4 text-muted-foreground">
          No documents found in this category
        </div>
      );
    }

    return (
      <div className="space-y-3">
        {categoryDocs.map((doc) => {
          const fileType = doc.file_name.split('.').pop()?.toUpperCase() || 'DOC';
          const isDoc = fileType === 'DOC' || fileType === 'DOCX';
          
          return (
            <div 
              key={doc.id} 
              className="border border-muted rounded-lg p-3 flex items-center gap-3 hover:bg-muted/30 transition-colors"
            >
              <div className={`p-2 ${isDoc ? 'bg-blue-500/10' : 'bg-primary/10'} rounded-md text-center w-12`}>
                <div className={`text-xs font-semibold ${isDoc ? 'text-blue-500' : 'text-primary'}`}>
                  {fileType}
                </div>
                <FileText className={`h-6 w-6 mx-auto mt-1 ${isDoc ? 'text-blue-500' : 'text-primary'}`} />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium truncate" title={doc.file_name}>
                  {doc.file_name}
                </h3>
                <p className="text-xs text-muted-foreground">
                  {doc.size}
                </p>
              </div>
              <button
                type="button"
                className="text-muted-foreground hover:text-destructive p-2 rounded-full hover:bg-muted/50"
                onClick={() => handleDeleteDocument(doc.id)}
                title="Delete document"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          );
        })}
      </div>
    );
  };

  const renderUploadForm = (category: string) => {
    const isCurrentCategory = uploadCategory === category;
    const showUploadButton = file && isCurrentCategory;
    
    return (
      <div className="mt-4 border-t pt-4">
        <div className="flex gap-3 items-center">
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleFileChange(e, category)}
            className="flex-1 py-2 px-3 rounded-md border border-input bg-transparent file:border-0 file:bg-transparent file:text-sm file:font-medium"
          />
          {showUploadButton && (
            <button 
              onClick={handleUpload}
              disabled={uploading}
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-md flex items-center gap-2 disabled:opacity-50"
            >
              {uploading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <Upload className="h-4 w-4" />
                  Upload
                </>
              )}
            </button>
          )}
        </div>
        {error && isCurrentCategory && (
          <div className="flex items-center gap-2 text-red-500 mt-2">
            <AlertCircle className="h-4 w-4" />
            <span>{error}</span>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <h1 className="text-3xl font-bold mb-8">Knowledge Library</h1>
      
      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : (
        <div className="space-y-6">
          {/* Contract Agent Section */}
          <div className="border rounded-lg shadow-sm overflow-hidden">
            <div 
              className="p-4 flex justify-between items-center cursor-pointer bg-muted/20 hover:bg-muted/40 transition-colors"
              onClick={() => handleSectionToggle('contractAgent')}
            >
              <h2 className="text-xl font-semibold">Contract Agent</h2>
              {expandedSection === 'contractAgent' ? <ChevronUp /> : <ChevronDown />}
            </div>
            
            {expandedSection === 'contractAgent' && (
              <div className="p-4">
                {renderDocuments('contractAgent')}
                {renderUploadForm('contractAgent')}
              </div>
            )}
          </div>
          
          {/* RFP Agent Section */}
          <div className="border rounded-lg shadow-sm overflow-hidden">
            <div 
              className="p-4 flex justify-between items-center cursor-pointer bg-muted/20 hover:bg-muted/40 transition-colors"
              onClick={() => handleSectionToggle('rfpAgent')}
            >
              <h2 className="text-xl font-semibold">RFP Agent</h2>
              {expandedSection === 'rfpAgent' ? <ChevronUp /> : <ChevronDown />}
            </div>
            
            {expandedSection === 'rfpAgent' && (
              <div className="p-4">
                {renderDocuments('rfpAgent')}
                {renderUploadForm('rfpAgent')}
              </div>
            )}
          </div>
          
          {/* Operations Section */}
          <div className="border rounded-lg shadow-sm overflow-hidden">
            <div 
              className="p-4 flex justify-between items-center cursor-pointer bg-muted/20 hover:bg-muted/40 transition-colors"
              onClick={() => handleSectionToggle('operations')}
            >
              <h2 className="text-xl font-semibold">Operations</h2>
              {expandedSection === 'operations' ? <ChevronUp /> : <ChevronDown />}
            </div>
            
            {expandedSection === 'operations' && (
              <div className="p-4">
                {renderDocuments('operations')}
                {renderUploadForm('operations')}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
} 