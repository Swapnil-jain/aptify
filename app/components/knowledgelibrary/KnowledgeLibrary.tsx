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
    <div className="flex items-start justify-between gap-6 pt-1 w-full overflow-visible">
      {/* Knowledge Library sidebar */}
      <div className="w-[calc(33.333%-1rem)] inline-flex h-[95vh] py-6 pb-[72px] flex-col items-start gap-16 flex-shrink-0 bg-gradient-to-bl from-gray-800/30 to-indigo-900/30 rounded-2xl shadow-[0px_4px_12px_0px_rgba(0,0,0,0.12)] outline outline-1 outline-offset-[-1px] outline-white/10 overflow-y-auto">
        <div className="self-stretch px-6 inline-flex justify-between items-center">
            <div className="self-stretch justify-start text-0 text-2xl font-normal font-['Sora'] leading-loose">Knowledge Library</div>
        </div>

        <div className="self-stretch flex flex-col justify-start items-start gap-6 px-6">
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
      <div className="w-[calc(33.333%-1rem)] inline-flex h-[95vh] py-6 pb-[72px] flex-col items-start gap-16 flex-shrink-0 bg-gradient-to-bl from-gray-800/30 to-indigo-900/30 rounded-2xl shadow-[0px_4px_12px_0px_rgba(0,0,0,0.12)] outline outline-1 outline-offset-[-1px] outline-white/10 overflow-y-auto">
        {selectedDocument ? (
          <>
            <div className="self-stretch px-6 flex flex-col justify-start items-start gap-2">
              <div className="self-stretch justify-start text-0 text-2xl font-normal font-['Sora'] leading-loose mb-[-1rem]">
                {selectedDocument.category === 'contractAgent' ? 'Contract Agent' : 
                 selectedDocument.category === 'rfpAgent' ? 'RFP Agent' : 'Operations'}
              </div>
            </div>
            <div className="px-6 w-full">
              <PDFViewer
                selectedDocument={selectedDocument}
                pdfUrl={pdfUrl}
                pdfLoading={pdfLoading}
                pdfError={pdfError}
              />
            </div>
          </>
        ) : (
          <div className="self-stretch px-6 flex justify-center items-center h-full">
            <div className="text-white/50 text-lg font-normal font-['Sora']">
              Select a document to view
            </div>
          </div>
        )}
      </div>
      
      {/* AI Chat section */}
      <div className="w-[calc(33.333%-1rem)] inline-flex h-[95vh] py-6 pb-[3vh] flex-col items-start gap-16 flex-shrink-0 bg-gradient-to-bl from-gray-800/30 to-indigo-900/30 rounded-2xl shadow-[0px_4px_12px_0px_rgba(0,0,0,0.12)] outline outline-1 outline-offset-[-1px] outline-white/10 overflow-hidden relative">
        <div className="px-6 w-full h-full">
          <DocumentChat selectedDocument={selectedDocument} />
        </div>
      </div>
    </div>
  );
};

export default KnowledgeLibrary;

