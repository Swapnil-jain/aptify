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
    <div className="w-full h-full flex flex-col relative">
      <div className="self-stretch justify-start text-0 text-2xl font-normal font-['Sora'] leading-loose mb-8">
        AI Chat
      </div>

      {/* Chat messages - scrollable area */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden pb-20 pr-2 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent">
        {messages.length === 0 ? (
          <div className="flex flex-col justify-center items-center h-full">
            <div className="text-white/40 text-sm text-center">
              {selectedDocument 
                ? `Ask me anything about ${selectedDocument.file_name}`
                : "Select a document first..."}
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-6 pb-6">
            {messages.map((message, index) => (
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
            ))}
          </div>
        )}
        
        {/* AI typing indicator */}
        {isAiTyping && (
          <div className="flex items-center gap-2 mb-4">
            <div className="w-10 h-10 relative flex-shrink-0">
              <div className="w-8 h-8 left-[4px] top-[4.26px] absolute flex items-center justify-center overflow-hidden">
                <Image
                  src="/sidebar/logo.svg"
                  alt="AI"
                  width={32}
                  height={32}
                />
              </div>
            </div>
            <div className="px-5 py-3 bg-[linear-gradient(205deg,_#3D3E7D_0%,_#5C58AF_100%)] rounded-tl-xl rounded-tr-xl rounded-br-xl rounded-bl-[2px] flex items-center">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-[linear-gradient(324deg,_#7E74EB_0%,_#5C58AF_100%)] animate-pulse"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-[linear-gradient(324deg,_#7E74EB_0%,_#5C58AF_100%)] animate-pulse delay-100"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-[linear-gradient(324deg,_#7E74EB_0%,_#5C58AF_100%)] animate-pulse delay-200"></div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Chat input - fixed at bottom */}
      <div className="absolute bottom-0 left-0 right-0 bg-[rgba(15,15,25,0.8)] pt-2 pb-0 backdrop-blur-sm z-10">
        <form onSubmit={handleChatSubmit}>
          <div className="w-full h-[60px] px-4 bg-[rgba(255,255,255,0.02)] rounded-md border border-[#6CC2F9] flex items-center">
            <div className="w-[20px] h-[20px] relative flex justify-center items-center aspect-square flex-shrink-0">
              <Image
                src="/search-normal.svg"
                alt="Search"
                width={20}
                height={20}
              />
            </div>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={selectedDocument ? "Ask about this document..." : "Select a document first..."}
              className="bg-transparent outline-none w-full mx-2 h-[40px]"
              disabled={!selectedDocument || isAiTyping}
              style={{
                color: inputValue ? "#FFFFFF" : "#5C657F",
                fontFamily: "Sora",
                fontSize: "16px",
                fontStyle: "normal",
                fontWeight: "400",
                lineHeight: "110%"
              }}
            />
            {inputValue.trim() && selectedDocument && (
              <button 
                type="submit"
                className="bg-[#6CC2F9] text-black rounded-md px-3 py-1 text-sm font-medium h-[36px] flex-shrink-0"
                disabled={!inputValue.trim() || !selectedDocument || isAiTyping}
              >
                Send
              </button>
            )}
          </div>
        </form>
      </div>
      
      <style jsx>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
        
        .animate-pulse {
          animation: pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        
        .delay-100 {
          animation-delay: 0.3s;
        }
        
        .delay-200 {
          animation-delay: 0.6s;
        }
        
        /* Custom scrollbar styles */
        .scrollbar-thin::-webkit-scrollbar {
          width: 6px;
        }
        
        .scrollbar-thin::-webkit-scrollbar-track {
          background: transparent;
        }
        
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background-color: rgba(156, 163, 175, 0.3);
          border-radius: 3px;
        }
        
        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background-color: rgba(156, 163, 175, 0.5);
        }
      `}</style>
    </div>
  );
};

export default DocumentChat; 