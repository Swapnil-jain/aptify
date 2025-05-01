import React from "react";
import Image from "next/image";

interface Document {
  id: string;
  file_name: string;
  created_at: string;
  category: string;
  size: string;
}

interface DocumentListProps {
  documents: Document[];
  category: string;
  loading: boolean;
  selectedDocument: Document | null;
  onDocumentClick: (document: Document) => void;
  onDeleteDocument: (documentId: string, e: React.MouseEvent) => void;
}

const DocumentList: React.FC<DocumentListProps> = ({
  documents,
  category,
  loading,
  selectedDocument,
  onDocumentClick,
  onDeleteDocument,
}) => {
  const categoryDocs = documents.filter(doc => doc.category === category);
  
  if (loading) {
    return (
      <div className="self-stretch flex justify-center items-center py-4">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
      </div>
    );
  }
  
  if (categoryDocs.length === 0) {
    return (
      <div className="text-white/50 text-sm font-normal font-['Sora'] py-4 text-center">
        No documents found in this category
      </div>
    );
  }

  return (
    <div className="self-stretch flex flex-col justify-start items-start gap-2">
      {categoryDocs.map((doc) => {
        const fileType = doc.file_name.split('.').pop()?.toUpperCase() || 'DOC';
        const isPdf = fileType === 'PDF';
        const isHighlighted = selectedDocument?.id === doc.id;
        
        return (
          <div 
            key={doc.id} 
            className={`h-[72px] p-3 ${isHighlighted ? 'bg-gradient-to-bl from-indigo-900 to-slate-500 shadow-[0px_4px_24px_0px_rgba(126,116,235,0.30)] outline-sky-300' : 'bg-gradient-to-bl from-slate-800/20 to-gray-500/20 outline-gray-500'} rounded-2xl outline outline-[0.50px] outline-offset-[-0.50px] flex items-center gap-5 w-full overflow-hidden cursor-pointer`}
            onClick={() => onDocumentClick(doc)}
          >
            <div className="w-12 h-12 min-w-[48px] px-2 py-2.5 bg-gradient-to-b from-white/0 to-white/10 rounded-lg shadow-[0px_4px_12px_0px_rgba(0,0,0,0.12)] outline outline-[0.50px] outline-offset-[-0.50px] outline-white/10 flex justify-center items-center">
              <div className="text-white text-xs font-normal font-['Sora'] leading-3">
                {fileType}
              </div>
            </div>
            <div className="flex-1 inline-flex flex-col justify-start items-start gap-1 min-w-0">
              <div className="text-[#EDEDF0] text-sm font-normal font-['Sora'] leading-normal self-stretch overflow-hidden text-ellipsis whitespace-nowrap">
                {doc.file_name}
              </div>
              <div className={`${isPdf ? 'opacity-30 text-white' : 'text-[#7E74EB]'} text-sm font-normal font-['Sora']`}>
                {doc.size}
              </div>
            </div>
            <button 
              className="flex justify-center items-center"
              onClick={(e) => onDeleteDocument(doc.id, e)}
            >
              <Image 
                src="/knowledge-library/trash.svg" 
                alt="Delete" 
                width={18} 
                height={18} 
              />
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default DocumentList; 