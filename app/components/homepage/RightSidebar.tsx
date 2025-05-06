import React, { useState, useEffect } from "react";
import Image from "next/image";

const RightSidebar: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleSidebar = () => {
    const newExpandedState = !isExpanded;
    setIsExpanded(newExpandedState);
    
    // Dispatch custom event to notify the parent component
    const event = new CustomEvent('sidebar-toggle', { 
      detail: { expanded: newExpandedState } 
    });
    window.dispatchEvent(event);
  };

  // Collapsed state
  if (!isExpanded) {
    return (
      <div className="h-[95vh] pt-6 pb-[72px] px-6 bg-gradient-to-bl from-gray-800/30 to-indigo-900/30 rounded-2xl shadow-[0px_4px_12px_0px_rgba(0,0,0,0.12)] outline outline-1 outline-offset-[-1px] outline-white/10 inline-flex flex-col justify-start items-end gap-6">
        <div className="self-stretch flex flex-col justify-start items-start gap-6">
          <div className="self-stretch inline-flex justify-between items-start">
            <div 
              data-color="Button light" 
              data-icon="Only" 
              data-size="Medium" 
              data-state="Default" 
              className="w-10 h-10 px-2 py-2.5 bg-gradient-to-b from-zinc-800/0 to-zinc-800 rounded-[900px] shadow-[0px_1px_16px_0px_rgba(126,116,235,0.12)] outline outline-1 outline-offset-[-1px] outline-slate-500/10 flex justify-center items-center gap-1.5 cursor-pointer"
              onClick={toggleSidebar}
            >
              <Image
                src="/topbar/archive-book.svg"
                alt="Toggle Sidebar"
                width={18}
                height={18}
              />
            </div>
          </div>
          <div data-color="Button light" data-icon="Right" data-size="Medium" data-state="Default" className="w-10 h-10 px-2 py-2.5 bg-gradient-to-br from-sky-300 to-indigo-400 rounded-[900px] shadow-[0px_1px_16px_0px_rgba(126,116,235,0.12)] outline outline-1 outline-offset-[-1px] outline-white/10 inline-flex justify-center items-center gap-1.5">
            <Image
              src="/topbar/magicpen.svg"
              alt="New Chat"
              width={18}
              height={18}
            />
          </div>
        </div>
      </div>
    );
  }

  // Expanded state
  return (
    <div className="w-[271px] h-[95vh] pt-6 pb-[72px] px-6 bg-gradient-to-bl from-gray-800/30 to-indigo-900/30 rounded-2xl shadow-[0px_4px_12px_0px_rgba(0,0,0,0.12)] outline outline-1 outline-offset-[-1px] outline-white/10 flex flex-col justify-start items-end gap-6">
      <div className="self-stretch inline-flex justify-between items-start gap-2">
        <div data-color="Button light" data-icon="Right" data-size="Medium" data-state="Default" className="h-10 px-4 py-2.5 bg-gradient-to-br from-sky-300 to-indigo-400 rounded-[900px] shadow-[0px_1px_16px_0px_rgba(126,116,235,0.12)] outline outline-1 outline-offset-[-1px] outline-white/10 flex justify-center items-center gap-1.5 whitespace-nowrap">
          <span className="text-0 text-sm font-normal font-['Sora']">New Chat</span>
          <Image
            src="/topbar/magicpen.svg"
            alt="New Chat"
            width={16}
            height={16}
          />
        </div>
        <div 
          data-color="Button light" 
          data-icon="Only" 
          data-size="Medium" 
          data-state="Default" 
          className="w-10 h-10 px-2 py-2.5 bg-gradient-to-b from-zinc-800/0 to-zinc-800 rounded-[900px] shadow-[0px_1px_16px_0px_rgba(126,116,235,0.12)] outline outline-1 outline-offset-[-1px] outline-slate-500/10 flex justify-center items-center gap-1.5 cursor-pointer"
          onClick={toggleSidebar}
        >
          <Image
            src="/topbar/search-status.svg"
            alt="Search"
            width={19}
            height={18}
          />
        </div>
        <div 
          data-color="Button light" 
          data-icon="Only" 
          data-size="Medium" 
          data-state="Default" 
          className="w-10 h-10 px-2 py-2.5 bg-gradient-to-b from-zinc-800/0 to-zinc-800 rounded-[900px] shadow-[0px_1px_16px_0px_rgba(126,116,235,0.12)] outline outline-1 outline-offset-[-1px] outline-slate-500/10 flex justify-center items-center gap-1.5 cursor-pointer"
          onClick={toggleSidebar}
        >
          <Image
            src="/topbar/archive-book.svg"
            alt="Toggle Sidebar"
            width={18}
            height={18}
          />
        </div>
      </div>
      <div className="self-stretch flex flex-col justify-start items-start gap-6">
        <div className="self-stretch justify-start text-[#C4CADA] text-600 text-xs font-normal font-['Sora'] leading-3">CHAT HISTORY</div>
        <div className="self-stretch flex flex-col justify-start items-start">
          <div className="w-24 px-3 py-2.5 rounded-lg inline-flex justify-start items-center gap-2.5">
            <div className="justify-start text-[#C4CADA] text-xs font-normal font-['Sora'] leading-none">Today</div>
          </div>
          <div className="self-stretch flex flex-col justify-start items-start gap-2">
            <div data-state="hover" className="self-stretch p-3 bg-Primary-Clarity-20/20 rounded-lg inline-flex justify-start items-center gap-2.5">
              <div className="justify-start text-100 text-xs font-normal font-['Sora'] leading-none">SLA Penalties</div>
            </div>
            <div data-state="Default" className="self-stretch p-3 rounded-lg inline-flex justify-start items-center gap-2.5">
              <div className="justify-start text-200 text-xs font-normal font-['Sora'] leading-none">Upcoming Expiries</div>
            </div>
            <div data-state="Default" className="self-stretch p-3 rounded-lg inline-flex justify-start items-center gap-2.5">
              <div className="justify-start text-200 text-xs font-normal font-['Sora'] leading-none">High-Risk Clauses</div>
            </div>
            <div data-state="Default" className="self-stretch p-3 rounded-lg inline-flex justify-start items-center gap-2.5">
              <div className="justify-start text-200 text-xs font-normal font-['Sora'] leading-none">Vendor Comparison</div>
            </div>
            <div data-state="Default" className="self-stretch p-3 rounded-lg inline-flex justify-start items-center gap-2.5">
              <div className="justify-start text-200 text-xs font-normal font-['Sora'] leading-none">Anomaly Detection</div>
            </div>
          </div>
        </div>
        <div className="self-stretch flex flex-col justify-start items-start">
          <div className="self-stretch px-3 py-2.5 rounded-lg inline-flex justify-start items-center gap-2.5">
            <div className="justify-start text-[#C4CADA]  text-xs font-normal font-['Sora'] leading-none">Yesterday</div>
          </div>
          <div className="flex flex-col justify-start items-start gap-2">
            <div data-state="Default" className="self-stretch p-3 rounded-lg inline-flex justify-start items-center gap-2.5">
              <div className="justify-start text-200 text-xs font-normal font-['Sora'] leading-none">Repeated Risks</div>
            </div>
            <div data-state="Default" className="self-stretch p-3 rounded-lg inline-flex justify-start items-center gap-2.5">
              <div className="justify-start text-200 text-xs font-normal font-['Sora'] leading-none">Cost Trends</div>
            </div>
            <div data-state="Default" className="self-stretch p-3 rounded-lg inline-flex justify-start items-center gap-2.5">
              <div className="justify-start text-200 text-xs font-normal font-['Sora'] leading-none">Downtime Flags</div>
            </div>
            <div data-state="Default" className="self-stretch p-3 rounded-lg inline-flex justify-start items-center gap-2.5">
              <div className="justify-start text-200 text-xs font-normal font-['Sora'] leading-none">Regulatory Flags</div>
            </div>
            <div data-state="Default" className="self-stretch p-3 rounded-lg inline-flex justify-start items-center gap-2.5">
              <div className="justify-start text-200 text-xs font-normal font-['Sora'] leading-none">Risk by Vendor</div>
            </div>
          </div>
        </div>
        <div className="self-stretch flex flex-col justify-start items-start gap-2">
          <div className="self-stretch px-3 py-2.5 rounded-lg inline-flex justify-start items-center gap-2.5">
            <div className="justify-start text-600 text-[#C4CADA] text-xs font-normal font-['Sora'] leading-none">The past 7 days</div>
          </div>
          <div className="self-stretch flex flex-col justify-start items-start gap-2">
            <div data-state="Default" className="self-stretch p-3 rounded-lg inline-flex justify-start items-center gap-2.5">
              <div className="justify-start text-200 text-xs font-normal font-['Sora'] leading-none">Repeated Risks</div>
            </div>
            <div data-state="Default" className="self-stretch p-3 rounded-lg inline-flex justify-start items-center gap-2.5">
              <div className="justify-start text-200 text-xs font-normal font-['Sora'] leading-none">Cost Trends</div>
            </div>
            <div data-state="Default" className="self-stretch p-3 rounded-lg inline-flex justify-start items-center gap-2.5">
              <div className="justify-start text-200 text-xs font-normal font-['Sora'] leading-none">Downtime Flags</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightSidebar; 