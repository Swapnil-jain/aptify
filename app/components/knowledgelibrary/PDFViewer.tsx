import React from "react";

interface Document {
  id: string;
  file_name: string;
  created_at: string;
  category: string;
  size: string;
}

interface PDFViewerProps {
  selectedDocument: Document | null;
  pdfUrl: string | null;
  pdfLoading: boolean;
  pdfError: string | null;
}

const PDFViewer: React.FC<PDFViewerProps> = ({
  selectedDocument,
  pdfUrl,
  pdfLoading,
  pdfError,
}) => {
  if (!selectedDocument) return null;
  
  const isPdf = selectedDocument.file_name.toLowerCase().endsWith('.pdf');
  const fileType = selectedDocument.file_name.split('.').pop()?.toUpperCase() || 'DOC';
  
  return (
    <div className="w-full flex flex-col gap-[2rem]">
      <div className="text-[#C4CADA] text-sm font-normal font-['Sora']">
        {selectedDocument.file_name}
      </div>
      
      {/* PDF Content */}
      <div className="relative w-full h-[calc(75vh-6rem)] bg-gradient-to-br from-neutral-900/80 to-neutral-800/50 rounded-lg overflow-hidden border border-white/10">
        {isPdf ? (
          <>
            {/* PDF Viewer */}
            <div className="h-full w-full">
              {pdfLoading ? (
                <div className="flex items-center justify-center h-full">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
                </div>
              ) : pdfError ? (
                <div className="flex flex-col items-center justify-center h-full">
                  <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 9V11M12 15H12.01M5.07183 19H18.9282C20.4678 19 21.4301 17.3333 20.6603 16L13.7321 4C12.9623 2.66667 11.0378 2.66667 10.268 4L3.33978 16C2.56998 17.3333 3.53223 19 5.07183 19Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <div className="text-white/80 mt-4 text-center max-w-md">
                    {pdfError}
                  </div>
                  {pdfUrl && (
                    <div className="mt-4">
                      <a
                        href={pdfUrl}
                        download={selectedDocument?.file_name}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-primary hover:bg-primary/80 text-white rounded-md flex items-center gap-2"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 3V16M12 16L16 12M12 16L8 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M3 20H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        Download PDF Instead
                      </a>
                    </div>
                  )}
                </div>
              ) : pdfUrl ? (
                // Use object tag with embed fallback for better PDF rendering
                <object
                  data={pdfUrl}
                  type="application/pdf"
                  className="w-full h-full"
                >
                  <embed
                    src={pdfUrl}
                    type="application/pdf"
                    className="w-full h-full"
                  />
                  <div className="flex flex-col items-center justify-center h-full bg-neutral-900/90 p-6">
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 9V11M12 15H12.01M5.07183 19H18.9282C20.4678 19 21.4301 17.3333 20.6603 16L13.7321 4C12.9623 2.66667 11.0378 2.66667 10.268 4L3.33978 16C2.56998 17.3333 3.53223 19 5.07183 19Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <div className="text-white mt-4 text-center max-w-md">
                      Your browser cannot display this PDF directly.
                    </div>
                    <div className="mt-4">
                      <a
                        href={pdfUrl}
                        download={selectedDocument?.file_name}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-primary hover:bg-primary/80 text-white rounded-md flex items-center gap-2"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 3V16M12 16L16 12M12 16L8 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M3 20H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        Download PDF Instead
                      </a>
                    </div>
                  </div>
                </object>
              ) : (
                <div className="flex flex-col items-center justify-center h-full">
                  <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 7V9M12 13V15M6 20H18C19.1046 20 20 19.1046 20 18V6C20 4.89543 19.1046 4 18 4H6C4.89543 4 4 4.89543 4 6V18C4 19.1046 4.89543 20 6 20Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <div className="text-center mt-4">
                    <div className="text-white/80 font-medium">No Preview Available</div>
                    <div className="text-sm mt-2">Unable to retrieve document</div>
                  </div>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-white/60">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 7V9M12 13V15M6 20H18C19.1046 20 20 19.1046 20 18V6C20 4.89543 19.1046 4 18 4H6C4.89543 4 4 4.89543 4 6V18C4 19.1046 4.89543 20 6 20Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <div className="text-center mt-4">
              <div className="text-white/80 font-medium">{fileType} Preview Not Available</div>
              <div className="text-sm mt-2">This document format cannot be previewed</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PDFViewer; 