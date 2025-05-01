import React from "react";
import Image from "next/image";

const AgentScreen: React.FC = () => {
  return (
    <div className="w-[1006px] left-[163px] top-[-155px] absolute inline-flex flex-col justify-start items-start gap-12">
      <div className="flex flex-col justify-start items-start gap-10">
        <div className="w-20 h-20 relative">
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
                width: '40px', 
                height: '40px', 
                objectFit: 'contain',
                minWidth: '40px',
                minHeight: '40px'
              }}
              priority
            />
          </div>
        </div>
        <div className="w-[562px] flex flex-col justify-start items-start gap-2.5">
          <div className="self-stretch text-[#FFF] text-[40px] font-normal font-['Sora'] leading-[140%]">
            How can I help you today?
          </div>
          <div className="self-stretch text-[#C4CADA] text-base font-normal font-['Sora'] leading-[140%]">
            Ask questions, compose drafts & explore the platform
          </div>
        </div>
      </div>
      <div className="self-stretch inline-flex justify-start items-start gap-8">
        <div className="flex-1 inline-flex flex-col justify-start items-start gap-6">
          <div className="self-stretch text-[#C4CADA] text-xl font-normal font-['Sora'] leading-[140%]">Ask questions</div>
          <div className="self-stretch flex flex-col justify-start items-start gap-4">
            <div className="self-stretch flex p-6 flex-col justify-center items-start gap-5 rounded-2xl border-[0.5px] border-[#6CC2F9] bg-[linear-gradient(261deg,_#3D3E7D_8.83%,_#5C58AF_117.95%)] shadow-[0px_4px_24px_0px_rgba(126,116,235,0.30)] overflow-hidden">
              <div className="self-stretch text-white/70 text-sm font-normal font-['Sora'] leading-normal">Which of our contracts are expiring in the next 60 days?</div>
            </div>
            <div className="self-stretch flex p-6 flex-col justify-center items-start gap-5 rounded-2xl border-[0.5px] border-[#6CC2F9] bg-[linear-gradient(261deg,_#3D3E7D_8.83%,_#5C58AF_117.95%)] shadow-[0px_4px_24px_0px_rgba(126,116,235,0.30)] overflow-hidden">
              <div className="self-stretch text-white/70 text-sm font-normal font-['Sora'] leading-normal">Which contracts have non-standard escalation procedures?</div>
            </div>
          </div>
        </div>
        <div className="flex-1 inline-flex flex-col justify-start items-start gap-6">
          <div className="self-stretch text-[#C4CADA] text-xl font-normal font-['Sora'] leading-[140%]">Synthesize Knowledge</div>
          <div className="self-stretch flex flex-col justify-start items-start gap-4">
            <div className="self-stretch flex p-6 flex-col justify-center items-start gap-5 rounded-2xl border-[0.5px] border-[#6CC2F9] bg-[linear-gradient(261deg,_#3D3E7D_8.83%,_#5C58AF_117.95%)] shadow-[0px_4px_24px_0px_rgba(126,116,235,0.30)] overflow-hidden">
              <div className="self-stretch text-white/70 text-sm font-normal font-['Sora'] leading-normal">Identify patterns or anomalies across our infrastructure contracts. Are there providers with unusually strict SLAs or non-standard penalty terms?</div>
            </div>
          </div>
        </div>
        <div className="flex-1 inline-flex flex-col justify-start items-start gap-6">
          <div className="self-stretch text-[#C4CADA] text-xl font-normal font-['Sora'] leading-[140%]">Discover Platform</div>
          <div className="self-stretch flex flex-col justify-start items-start gap-4">
            <div className="self-stretch flex p-6 flex-col justify-center items-start gap-5 rounded-2xl border-[0.5px] border-[#6CC2F9] bg-[linear-gradient(261deg,_#3D3E7D_8.83%,_#5C58AF_117.95%)] shadow-[0px_4px_24px_0px_rgba(126,116,235,0.30)] overflow-hidden">
              <div className="self-stretch text-white/70 text-sm font-normal font-['Sora'] leading-normal">Which Aptify tools can help me improve contract lifecycle visibility and automate manual tasks?</div>
            </div>
            <div className="self-stretch flex p-6 flex-col justify-center items-start gap-5 rounded-2xl border-[0.5px] border-[#6CC2F9] bg-[linear-gradient(261deg,_#3D3E7D_8.83%,_#5C58AF_117.95%)] shadow-[0px_4px_24px_0px_rgba(126,116,235,0.30)] overflow-hidden">
              <div className="self-stretch text-white/70 text-sm font-normal font-['Sora'] leading-normal">How does Aptify use AI to assist with decision-making in datacenter operations?</div>
            </div>
          </div>
        </div>
      </div>
      <div className="self-stretch px-4 py-4 bg-[rgba(255,255,255,0.02)] rounded-md border border-[#6CC2F9] inline-flex justify-start items-center gap-2">
        <div className="flex justify-start items-center gap-2 w-full">
          <div className="w-[20px] h-[20px] relative flex justify-center items-center aspect-square">
            <Image
              src="/search-normal.svg"
              alt="Search"
              width={20}
              height={20}
            />
          </div>
          <input
            type="text"
            placeholder="Ask me anything..."
            className="bg-transparent outline-none text-[#99A1B7] text-base font-normal font-['Sora'] leading-[110%] w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default AgentScreen; 