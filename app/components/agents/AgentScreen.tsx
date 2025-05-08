import React, { useState } from "react";
import Image from "next/image";

interface Message {
  text: string;
  isUser: boolean;
  timestamp: string;
}

const AgentScreen: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isAiTyping, setIsAiTyping] = useState(false);
  const [showInitialContent, setShowInitialContent] = useState(true);

  const handleChatSubmit = async (e?: React.FormEvent, predefinedQuery?: string) => {
    if (e) e.preventDefault();
    
    const query = predefinedQuery || inputValue.trim();
    if (!query) return;

    // Add user message
    const userMessage = {
      text: query,
      isUser: true,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsAiTyping(true);
    setShowInitialContent(false);

    try {
      // Call the contracts agent API endpoint
      const response = await fetch('/api/agents/contracts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
      });

      const data = await response.json();

      // Create AI response
      const aiMessage = {
        text: data.answer || "I couldn't find any relevant information about that.",
        isUser: false,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error querying contracts agent:", error);
      
      // Error message if API call fails
      const errorMessage = {
        text: "I'm sorry, I encountered an error while processing your request. Please try again.",
        isUser: false,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsAiTyping(false);
    }
  };

  const handleExampleClick = (query: string) => {
    handleChatSubmit(undefined, query);
  };

  return (
    <div className="w-full h-[95vh] pt-6 pb-6 bg-gradient-to-bl from-gray-800/30 to-indigo-900/30 rounded-2xl shadow-[0px_4px_12px_0px_rgba(0,0,0,0.12)] outline outline-1 outline-offset-[-1px] outline-white/10 flex flex-col justify-start items-start gap-3 overflow-y-auto">
      {/* Header */}
      <div className="self-stretch px-6 inline-flex justify-between items-center">
        <div className="flex justify-start items-center gap-3">
          <Image
            src="/topbar/message-programming.svg"
            alt="Home"
            width={20}
            height={20}
          />
          <div className="justify-start text-500 text-base font-normal font-['Sora'] leading-snug">
            Contracts Agent
          </div>
        </div>
        <div className="flex justify-start items-center gap-2">
          <div
            data-color="Button light"
            data-icon="Only"
            data-size="Medium"
            data-state="Default"
            className="w-10 h-10 px-2 py-2.5 bg-gradient-to-b from-white/0 to-white/10 rounded-[900px] shadow-[0px_4px_12px_0px_rgba(0,0,0,0.12)] outline outline-1 outline-offset-[-1px] outline-white/10 flex justify-center items-center gap-1.5"
          >
            <Image
              src="/topbar/notification-bing.svg"
              alt="Notifications"
              width={18}
              height={18}
            />
          </div>
          <div
            data-color="Button light"
            data-icon="Only"
            data-size="Medium"
            data-state="Default"
            className="w-10 h-10 px-2 py-2.5 bg-gradient-to-b from-white/0 to-white/10 rounded-[900px] shadow-[0px_4px_12px_0px_rgba(0,0,0,0.12)] outline outline-1 outline-offset-[-1px] outline-white/10 flex justify-center items-center gap-1.5"
          >
            <Image src="/topbar/moon.svg" alt="Theme" width={18} height={18} />
          </div>
        </div>
      </div>

      {/* Main content area */}
      <div className="self-stretch flex-1 flex flex-col px-6 overflow-hidden">
        <div className="w-full max-w-[1006px] mx-auto flex flex-col h-full">
          {/* Content area - scrollable */}
          <div className="flex-1 overflow-y-auto overflow-x-hidden mb-5 pr-1">
            {showInitialContent ? (
              <div className="flex flex-col justify-start items-start gap-10">
                <div className="w-20 h-20 relative mt-10">
                  <div className="inline-flex p-[14.16px] left-0 top-[12.92px] absolute origin-top-left rotate-[-12.652deg] rounded-[16px] border-[1.5px] border-[rgba(34,157,236,0.00)] bg-[linear-gradient(146deg,_#7E74EB_-12.63%,_#6CC2F9_116.07%)] shadow-[0px_4.72px_14.396px_0px_rgba(255,255,255,0.45)_inset] items-center gap-[9.44px]">
                    <div className="w-9 h-9 relative overflow-hidden" />
                  </div>
                  <div className="flex w-[59px] h-[59px] p-[16.709px] left-[19px] top-[17px] absolute rounded-[16px] border-[1.5px] border-[rgba(34,157,236,0.00)] bg-[radial-gradient(76.94%_45.95%_at_50.00%_50.00%,_rgba(255,_255,_255,_0)_0%,_rgba(255,_255,_255,_0.20)_100%),_linear-gradient(146deg,_#6CC2F9_-12.63%,_#7E74EB_116.07%)] shadow-[0px_-3px_20px_0px_rgba(58,43,132,0.30),_0px_5.57px_16.987px_0px_rgba(80,67,217,0.50)_inset] items-center gap-[11.139px] justify-center">
                    <Image
                      src="/frame.svg"
                      alt="Aptify Logo"
                      width={40}
                      height={40}
                      style={{
                        width: "40px",
                        height: "40px",
                        objectFit: "contain",
                        minWidth: "40px",
                        minHeight: "40px",
                      }}
                      priority
                    />
                  </div>
                </div>
                <div className="flex flex-col justify-start items-start gap-2">
                  <div className="self-stretch text-[#FFF] text-[36px] font-normal font-['Sora'] leading-[140%]">
                    How can I assist with your contracts today?
                  </div>
                  <div className="self-stretch text-[#C4CADA] text-base font-normal font-['Sora'] leading-[140%]">
                    Ask questions, compose drafts & explore the platform.
                  </div>
                </div>
                <div className="self-stretch inline-flex justify-start items-start gap-8 mt-5">
                  <div className="flex-1 inline-flex flex-col justify-start items-start gap-3">
                    <div className="self-stretch text-[#C4CADA] text-xl font-normal font-['Sora'] leading-[140%]">
                    Ask questions
                    </div>
                    <div className="self-stretch flex flex-col justify-start items-start gap-4">
                      <div 
                        className="self-stretch flex p-6 flex-col justify-center items-start gap-5 rounded-2xl border-[0.5px] border-[#6CC2F9] bg-[linear-gradient(261deg,_#3D3E7D_8.83%,_#5C58AF_117.95%)] shadow-[0px_4px_24px_0px_rgba(126,116,235,0.30)] overflow-hidden cursor-pointer hover:bg-[linear-gradient(261deg,_#3D3E7D_8.83%,_#5C58AF_100%)] transition-all"
                        onClick={() => handleExampleClick("Which of our contracts are expiring in the next 60 days?")}
                      >
                        <div className="self-stretch text-white/70 text-sm font-normal font-['Sora'] leading-normal">
                        Which of our contracts are expiring in the next 60 days?
                        </div>
                      </div>
                      <div 
                        className="self-stretch flex p-6 flex-col justify-center items-start gap-5 rounded-2xl border-[0.5px] border-[#6CC2F9] bg-[linear-gradient(261deg,_#3D3E7D_8.83%,_#5C58AF_117.95%)] shadow-[0px_4px_24px_0px_rgba(126,116,235,0.30)] overflow-hidden cursor-pointer hover:bg-[linear-gradient(261deg,_#3D3E7D_8.83%,_#5C58AF_100%)] transition-all"
                        onClick={() => handleExampleClick("Which contracts have non-standard escalation procedures?")}
                      >
                        <div className="self-stretch text-white/70 text-sm font-normal font-['Sora'] leading-normal">
                        Which contracts have non-standard escalation procedures?
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 inline-flex flex-col justify-start items-start gap-3">
                    <div className="self-stretch text-[#C4CADA] text-xl font-normal font-['Sora'] leading-[140%]">
                    Synthesize Knowledge
                    </div>
                    <div className="self-stretch flex flex-col justify-start items-start gap-4">
                      <div 
                        className="self-stretch flex p-6 flex-col justify-center items-start gap-5 rounded-2xl border-[0.5px] border-[#6CC2F9] bg-[linear-gradient(261deg,_#3D3E7D_8.83%,_#5C58AF_117.95%)] shadow-[0px_4px_24px_0px_rgba(126,116,235,0.30)] overflow-hidden cursor-pointer hover:bg-[linear-gradient(261deg,_#3D3E7D_8.83%,_#5C58AF_100%)] transition-all"
                        onClick={() => handleExampleClick("Identify patterns or anomalies across our infrastructure contracts. Are there providers with unusually strict SLAs or non-standard penalty terms?")}
                      >
                        <div className="self-stretch text-white/70 text-sm font-normal font-['Sora'] leading-normal">
                        Identify patterns or anomalies across our infrastructure contracts. Are there providers with unusually strict SLAs or non-standard penalty terms?
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 inline-flex flex-col justify-start items-start gap-3">
                    <div className="self-stretch text-[#C4CADA] text-xl font-normal font-['Sora'] leading-[140%]">
                    Discover Platform
                    </div>
                    <div className="self-stretch flex flex-col justify-start items-start gap-4">
                      <div 
                        className="self-stretch flex p-6 flex-col justify-center items-start gap-5 rounded-2xl border-[0.5px] border-[#6CC2F9] bg-[linear-gradient(261deg,_#3D3E7D_8.83%,_#5C58AF_117.95%)] shadow-[0px_4px_24px_0px_rgba(126,116,235,0.30)] overflow-hidden cursor-pointer hover:bg-[linear-gradient(261deg,_#3D3E7D_8.83%,_#5C58AF_100%)] transition-all"
                        onClick={() => handleExampleClick("Which Aptify tools can help me improve contract lifecycle visibility and automate manual tasks?")}
                      >
                        <div className="self-stretch text-white/70 text-sm font-normal font-['Sora'] leading-normal">
                        Which Aptify tools can help me improve contract lifecycle visibility and automate manual tasks?
                        </div>
                      </div>
                      <div 
                        className="self-stretch flex p-6 flex-col justify-center items-start gap-5 rounded-2xl border-[0.5px] border-[#6CC2F9] bg-[linear-gradient(261deg,_#3D3E7D_8.83%,_#5C58AF_117.95%)] shadow-[0px_4px_24px_0px_rgba(126,116,235,0.30)] overflow-hidden cursor-pointer hover:bg-[linear-gradient(261deg,_#3D3E7D_8.83%,_#5C58AF_100%)] transition-all"
                        onClick={() => handleExampleClick("Develop mitigation plans and contingency procedures.")}
                      >
                        <div className="self-stretch text-white/70 text-sm font-normal font-['Sora'] leading-normal">
                          Develop mitigation plans and contingency procedures.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-6 py-5">
                {messages.map((message, index) => (
                  <div key={index} className={`w-full flex ${message.isUser ? 'justify-end' : 'justify-start'} items-end gap-3`}>
                    {!message.isUser && (
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
                    )}
                    <div className={`flex flex-col ${message.isUser ? 'items-end' : 'items-start'} gap-2 max-w-[80%]`}>
                      <div className={`px-5 py-3 ${
                        message.isUser 
                          ? 'bg-gradient-to-bl from-slate-400/40 to-slate-400/10 rounded-tl-xl rounded-tr-xl rounded-bl-xl rounded-br-sm' 
                          : 'bg-gradient-to-bl from-indigo-900 to-slate-500 rounded-tl-sm rounded-tr-xl rounded-bl-xl rounded-br-xl'
                      } inline-flex justify-center items-center`}>
                        <div className="text-white text-sm font-normal font-['Sora'] whitespace-pre-line">
                          {message.text}
                        </div>
                      </div>
                      <div className="inline-flex items-center gap-1.5">
                        <div className="text-white/70 text-xs font-normal font-['Sora'] leading-3">
                          {message.isUser ? 'You' : 'Apti/fi'}
                        </div>
                        <div className="text-white/30 text-xs font-normal font-['Sora'] leading-3">
                          {message.timestamp}
                        </div>
                      </div>
                    </div>
                    {message.isUser && (
                      <div className="w-10 h-10 relative flex-shrink-0">
                        <Image
                          src="/topbar/pp.png"
                          alt="User"
                          width={32}
                          height={32}
                          className="w-8 h-8 left-[4px] top-[4.26px] absolute rounded-md border border-white/20"
                        />
                      </div>
                    )}
                  </div>
                ))}
                {isAiTyping && (
                  <div className="flex items-center gap-2">
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
            )}
          </div>

          {/* Input area - always at the bottom */}
          <form onSubmit={handleChatSubmit} className="w-full mb-2">
            <div className="self-stretch h-[60px] px-4 py-3 bg-[#010101] rounded-[6px] border-[2px] border-[#6CC2F9] shadow-[0px_4px_20px_0px_rgba(126,116,235,0.10)] inline-flex justify-start items-center gap-2 w-full">
              <div className="flex justify-start items-center gap-2 w-full h-full">
                <Image
                  src="/search-normal.svg"
                  alt="Search"
                  width={20}
                  height={20}
                  className="flex-shrink-0"
                />
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder={showInitialContent ? "Ask me about contracts..." : "Ask a follow up question..."}
                  className="bg-transparent outline-none text-[#99A1B7] text-base font-normal font-['Sora'] leading-[110%] w-full focus:text-white h-full"
                  disabled={isAiTyping}
                />
                {inputValue.trim() && (
                  <button
                    type="submit"
                    className="bg-[#6CC2F9] text-black rounded-md px-3 py-1 text-sm font-medium h-[36px] flex-shrink-0"
                    disabled={isAiTyping}
                  >
                    Send
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
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
      `}</style>
    </div>
  );
};

export default AgentScreen;