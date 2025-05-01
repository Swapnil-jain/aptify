import React, { useState } from "react";
import Image from "next/image";

interface Document {
  id: string;
  file_name: string;
  created_at: string;
  category: string;
  size: string;
}

interface DocumentChatProps {
  selectedDocument: Document | null;
}

interface Message {
  text: string;
  isUser: boolean;
  timestamp: string;
}

const DocumentChat: React.FC<DocumentChatProps> = ({ 
  selectedDocument 
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isAiTyping, setIsAiTyping] = useState(false);

  const handleChatSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || !selectedDocument) return;

    // Add user message
    const userMessage = {
      text: inputValue.trim(),
      isUser: true,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages([...messages, userMessage]);
    setInputValue('');
    setIsAiTyping(true);

    try {
      // Call the document-specific query endpoint
      const response = await fetch('/api/document-query', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: userMessage.text,
          documentId: selectedDocument.id
        }),
      });

      const data = await response.json();

      // Create AI response
      const aiMessage = {
        text: data.answer || "I couldn't find any relevant information in this document.",
        isUser: false,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prevMessages => [...prevMessages, aiMessage]);
    } catch (error) {
      console.error("Error querying document:", error);
      
      // Error message if API call fails
      const errorMessage = {
        text: "I'm sorry, I encountered an error while processing your request. Please try again.",
        isUser: false,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      setMessages(prevMessages => [...prevMessages, errorMessage]);
    } finally {
      setIsAiTyping(false);
    }
  };

  return (
    <div className="w-full flex flex-col justify-between h-full">
      <div className="self-stretch justify-start text-0 text-2xl font-normal font-['Sora'] leading-loose mb-8">
        AI Chat
      </div>

      {/* Chat messages */}
      <div className="flex-1 overflow-auto mb-6">
        <div className="flex flex-col gap-6">
          {messages.length > 0 ? (
            messages.map((message, index) => (
              <div key={index} className="self-stretch inline-flex justify-start items-end gap-3">
                {message.isUser ? (
                  <>
                    <div className="flex-1 inline-flex flex-col justify-center items-end gap-2">
                      <div className="self-stretch px-5 py-3 bg-gradient-to-bl from-slate-400/40 to-slate-400/10 rounded-tl-xl rounded-tr-xl rounded-bl-xl rounded-br-sm inline-flex justify-center items-center gap-1">
                        <div className="flex-1 justify-start text-white text-sm font-normal font-['Sora'] whitespace-pre-line">
                          {message.text}
                        </div>
                      </div>
                      <div className="inline-flex justify-start items-center gap-1.5">
                        <div className="justify-start text-white/70 text-xs font-normal font-['Sora'] leading-3">
                          You
                        </div>
                        <div className="justify-start text-white/30 text-xs font-normal font-['Sora'] leading-3">
                          {message.timestamp}
                        </div>
                      </div>
                    </div>
                    <div className="w-10 h-10 relative">
                      <Image
                        src="/topbar/pp.png"
                        alt="User"
                        width={32}
                        height={32}
                        className="w-8 h-8 left-[4px] top-[4.26px] absolute rounded-md border border-white/20"
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="w-10 h-10 relative">
                      <div className="w-8 h-8 left-[4px] top-[4.26px] absolute flex items-center justify-center overflow-hidden">
                        <Image
                          src="/sidebar/logo.svg"
                          alt="AI"
                          width={32}
                          height={32}
                        />
                      </div>
                    </div>
                    <div className="flex-1 inline-flex flex-col justify-center items-start gap-2">
                      <div className="self-stretch px-5 py-3 bg-gradient-to-bl from-indigo-900 to-slate-500 rounded-tl-xl rounded-tr-xl rounded-bl-sm rounded-br-xl inline-flex justify-center items-center gap-1">
                        <div className="flex-1 justify-start text-white text-sm font-normal font-['Sora'] whitespace-pre-line">
                          {message.text}
                        </div>
                      </div>
                      <div className="inline-flex justify-start items-center gap-1.5">
                        <div className="justify-start text-white/70 text-xs font-normal font-['Sora'] leading-3">
                          Apti/fi
                        </div>
                        <div className="justify-start text-white/30 text-xs font-normal font-['Sora'] leading-3">
                          {message.timestamp}
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ))
          ) : (
            <div className="text-white/40 text-sm text-center py-8">
              {selectedDocument 
                ? `Ask me anything about "${selectedDocument.file_name}"`
                : "Select a document to start chatting"}
            </div>
          )}
        </div>
      </div>

      {/* Chat input */}
      <div className="self-stretch mt-auto">
        {isAiTyping && (
          <div className="flex justify-center items-center mb-4">
            <div className="inline-flex justify-center items-center">
              <div className="w-3.5 h-3.5 relative overflow-hidden">
                <div className="w-2 h-2 left-[11.81px] top-[12.43px] absolute origin-top-left rotate-180 rounded-full border border-gray-900" />
              </div>
              <div className="justify-center text-white/70 text-[10px] font-light font-['Sora'] leading-3">
                Analyzing document content...
              </div>
            </div>
          </div>
        )}
        
        <form onSubmit={handleChatSubmit} className="w-full">
          <div className="w-full px-4 py-4 bg-[rgba(255,255,255,0.02)] rounded-md border border-[#6CC2F9] inline-flex justify-start items-center gap-2">
            <div className="flex justify-start items-center gap-2 w-full">
              <div className="w-[20px] h-[20px] relative flex justify-center items-center aspect-square">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z" stroke="white" strokeOpacity="0.6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M22 22L20 20" stroke="white" strokeOpacity="0.6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={selectedDocument ? "Ask about this document..." : "Select a document first..."}
                className="bg-transparent outline-none text-[#99A1B7] text-base font-normal font-['Sora'] leading-[110%] w-full"
                disabled={!selectedDocument || isAiTyping}
              />
              <button 
                type="submit"
                className={`${inputValue.trim() && selectedDocument ? 'opacity-100' : 'opacity-50'} transition-opacity`}
                disabled={!inputValue.trim() || !selectedDocument || isAiTyping}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22 2L11 13M22 2L15 22L11 13M11 13L2 9L22 2" stroke="#6CC2F9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DocumentChat; 