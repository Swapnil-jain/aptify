import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Document } from "../../api/documents/types";
import DocumentList from "./DocumentList";
import PDFViewer from "./PDFViewer";
import DocumentChat from "./DocumentChat";

// Format file size to human-readable format
const formatFileSize = (size: string | number): string => {
  const numSize = typeof size === 'string' ? parseInt(size, 10) : size;
  
  if (isNaN(numSize)) return size.toString();
  
  if (numSize < 1024) return numSize + ' B';
  if (numSize < 1048576) return Math.round(numSize / 1024) + ' KB';
  return Math.round(numSize / 1048576) + ' MB';
};

type SectionKey = 'contractAgent' | 'rfpAgent' | 'operations';

const KnowledgeLibrary: React.FC = () => {
  const [expandedSections, setExpandedSections] = useState({
    contractAgent: true,
    rfpAgent: false,
    operations: false
  });
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [pdfError, setPdfError] = useState<string | null>(null);
  const [pdfLoading, setPdfLoading] = useState<boolean>(false);

  // Fetch documents from the API on component mount
  useEffect(() => {
    fetchDocuments();
  }, []);

  // Fetch ALL documents from the API
  const fetchDocuments = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/knowledge-library');
      const data = await response.json();
      
      if (data.error) {
        console.error('Error fetching documents:', data.error);
        setError(data.error);
      } else {
        console.log('Fetched documents:', data.documents);
        const formattedDocuments = data.documents?.map((doc: Document) => ({
          ...doc,
          size: formatFileSize(doc.size)
        })) || [];
        
        setDocuments(formattedDocuments);
        
        // Select the first document by default if available
        if (formattedDocuments.length > 0) {
          setSelectedDocument(formattedDocuments[0]);
          // Fetch PDF URL for the first document
          fetchDocumentUrl(formattedDocuments[0].id);
        }
        
        setError(null);
      }
    } catch (error) {
      console.error('Failed to fetch documents:', error);
      setError('Failed to fetch documents');
    } finally {
      setLoading(false);
    }
  };

  // Fetches a specific document from the API for preview purposes
  const fetchDocumentUrl = async (documentId: string) => {
    setPdfLoading(true);
    setPdfUrl(null);
    setPdfError(null);
    
    try {
      console.log(`Fetching document URL for ID: ${documentId}`);
      const response = await fetch(`/api/documents/${documentId}`);
      const data = await response.json();
      
      if (!response.ok) {
        console.error('HTTP error fetching document URL:', response.status, data);
        setPdfError(`Error ${response.status}: ${data.error || 'Could not load the document'}`);
        return;
      }
      
      if (data.error) {
        console.error('API error fetching document URL:', data.error);
        setPdfError(data.error || 'Could not load the document. Please try again later.');
      } else if (data.url) {
        console.log('Document URL fetched successfully:', data.url);
        setPdfUrl(data.url);
      } else {
        console.error('No URL returned from API');
        setPdfError('Document URL not available');
      }
    } catch (error) {
      console.error('Failed to fetch document URL:', error);
      setPdfError('Failed to load document. Network issue or server error.');
    } finally {
      setPdfLoading(false);
    }
  };

  // Toggles the visibility of a section
  const toggleSection = (section: SectionKey) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Handles when a document is clicked
  const handleDocumentClick = (document: Document) => {
    setSelectedDocument(document);
    // Fetch the PDF URL when a document is selected
    fetchDocumentUrl(document.id);
  };

  // Handles when a document is deleted
  const handleDeleteDocument = async (documentId: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering document selection
    if (!confirm('Are you sure you want to delete this document?')) return;
    
    try {
      try {
        const response = await fetch('/api/documents', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ documentId }),
        });

        const data = await response.json();
        
        if (!data.success) {
          console.error('API returned error:', data.error);
          throw new Error(data.error || 'Delete failed');
        }
      } catch (apiError) {
        // If API fails, just handle UI updates locally
        console.log('API not available, handling delete locally');
      }
      
      // Update UI regardless of API result
      setDocuments(prev => prev.filter(doc => doc.id !== documentId));
      
      // If the deleted document was selected, clear selection
      if (selectedDocument && selectedDocument.id === documentId) {
        // Select next document if available
        const remainingDocs = documents.filter(doc => doc.id !== documentId);
        if (remainingDocs.length > 0) {
          setSelectedDocument(remainingDocs[0]);
          fetchDocumentUrl(remainingDocs[0].id);
        } else {
          setSelectedDocument(null);
          setPdfUrl(null);
        }
      }
    } catch (error) {
      setError('Failed to delete document');
      console.error('Delete error:', error);
    }
  };

  return (
    <div className="w-[calc(100vw-7.2rem)] ml-[-2.5rem] mt-[-12.4rem] h-[calc(100vh-4rem)]">
      <div className="flex flex-row h-full w-full">
        {/* Knowledge Library sidebar */}
        <div className="w-[30%] px-10 pt-10 border-r border-white/10 flex flex-col items-start gap-6 overflow-auto h-full">
          <div className="text-white text-2xl font-normal font-['Sora'] leading-[140%] self-stretch">
            Knowledge Library
          </div>
          <div className="self-stretch flex flex-col justify-start items-start gap-6">
            {/* Contract Agent section */}
            <div className="self-stretch p-4 bg-slate-200/5 rounded-2xl outline outline-1 outline-white/10 flex flex-col justify-center items-start gap-3">
              <div 
                className="self-stretch inline-flex justify-between items-center cursor-pointer"
                onClick={() => toggleSection('contractAgent')}
              >
                <div className="text-[#C4CADA] text-lg font-normal font-['Sora'] leading-[140%]">
                  Contract Agent
                </div>
                <Image 
                  src={expandedSections.contractAgent ? "/knowledge-library/arrow-down.svg" : "/knowledge-library/arrow-up.svg"}
                  alt={expandedSections.contractAgent ? "Collapse" : "Expand"} 
                  width={24} 
                  height={24} 
                />
              </div>
              {expandedSections.contractAgent && (
                <DocumentList
                  documents={documents}
                  category="contractAgent"
                  loading={loading}
                  selectedDocument={selectedDocument}
                  onDocumentClick={handleDocumentClick}
                  onDeleteDocument={handleDeleteDocument}
                />
              )}
            </div>
            
            {/* RFP Agent section */}
            <div className="self-stretch p-4 bg-slate-200/5 rounded-2xl outline outline-1 outline-white/10 flex flex-col justify-center items-start gap-3">
              <div 
                className="self-stretch inline-flex justify-between items-center cursor-pointer"
                onClick={() => toggleSection('rfpAgent')}
              >
                <div className="text-[#C4CADA] text-lg font-normal font-['Sora'] leading-[140%]">
                  RFP Agent
                </div>
                <Image 
                  src={expandedSections.rfpAgent ? "/knowledge-library/arrow-down.svg" : "/knowledge-library/arrow-up.svg"}
                  alt={expandedSections.rfpAgent ? "Collapse" : "Expand"} 
                  width={24} 
                  height={24} 
                />
              </div>
              {expandedSections.rfpAgent && (
                <DocumentList
                  documents={documents}
                  category="rfpAgent"
                  loading={loading}
                  selectedDocument={selectedDocument}
                  onDocumentClick={handleDocumentClick}
                  onDeleteDocument={handleDeleteDocument}
                />
              )}
            </div>
            
            {/* Operations section */}
            <div className="self-stretch p-4 bg-slate-200/5 rounded-2xl outline outline-1 outline-white/10 flex flex-col justify-center items-start gap-3">
              <div 
                className="self-stretch inline-flex justify-between items-center cursor-pointer"
                onClick={() => toggleSection('operations')}
              >
                <div className="text-[#C4CADA] text-lg font-normal font-['Sora'] leading-[140%]">
                  Operations
                </div>
                <Image 
                  src={expandedSections.operations ? "/knowledge-library/arrow-down.svg" : "/knowledge-library/arrow-up.svg"}
                  alt={expandedSections.operations ? "Collapse" : "Expand"} 
                  width={24} 
                  height={24} 
                />
              </div>
              {expandedSections.operations && (
                <DocumentList
                  documents={documents}
                  category="operations"
                  loading={loading}
                  selectedDocument={selectedDocument}
                  onDocumentClick={handleDocumentClick}
                  onDeleteDocument={handleDeleteDocument}
                />
              )}
            </div>
          </div>
        </div>
        
        {/* Document preview section */}
        <div className="flex-1 px-10 pt-10 border-r border-white/10 flex flex-col justify-start items-start gap-8 overflow-auto h-full">
          {selectedDocument ? (
            <>
              <div className="self-stretch flex flex-col justify-start items-start gap-2">
                <div className="self-stretch justify-start text-0 text-2xl font-normal font-['Sora'] leading-loose mb-[-1rem]">
                  {selectedDocument.category === 'contractAgent' ? 'Contract Agent' : 
                   selectedDocument.category === 'rfpAgent' ? 'RFP Agent' : 'Operations'}
                </div>
              </div>
              <PDFViewer
                selectedDocument={selectedDocument}
                pdfUrl={pdfUrl}
                pdfLoading={pdfLoading}
                pdfError={pdfError}
              />
            </>
          ) : (
            <div className="self-stretch flex justify-center items-center h-full">
              <div className="text-white/50 text-lg font-normal font-['Sora']">
                Select a document to view
              </div>
            </div>
          )}
        </div>
        
        {/* AI Chat section */}
        <div className="w-[30%] p-10 flex flex-col h-full overflow-auto">
          <DocumentChat selectedDocument={selectedDocument} />
        </div>
      </div>
    </div>
  );
};

export default KnowledgeLibrary;

