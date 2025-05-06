import React from "react";
import Image from "next/image";

const OperationsScreen: React.FC = () => {
  return (
    <div className="w-full h-[95vh] pt-6 pb-6 bg-gradient-to-bl from-gray-800/30 to-indigo-900/30 rounded-2xl shadow-[0px_4px_12px_0px_rgba(0,0,0,0.12)] outline outline-1 outline-offset-[-1px] outline-white/10 flex flex-col justify-start items-start gap-5 overflow-y-auto">
      <div className="self-stretch px-6 inline-flex justify-between items-center">
        <div className="flex justify-start items-center gap-3">
          <Image
            src="/topbar/message-programming.svg"
            alt="Home"
            width={20}
            height={20}
          />
          <div className="justify-start text-500 text-base font-normal font-['Sora'] leading-snug">
            Operations Agent
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

      <div className="self-stretch flex-1 flex flex-col justify-center items-center relative px-6">
        <div className="w-full max-w-[1006px] flex flex-col justify-start items-start gap-10">
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
                How can I assist with your operations today?
              </div>
              <div className="self-stretch text-[#C4CADA] text-base font-normal font-['Sora'] leading-[140%]">
                Streamlining workflows, managing resources, & monitoring
                performance.
              </div>
            </div>
          </div>
          <div className="self-stretch inline-flex justify-start items-start gap-8">
            <div className="flex-1 inline-flex flex-col justify-start items-start gap-3">
              <div className="self-stretch text-[#C4CADA] text-xl font-normal font-['Sora'] leading-[140%]">
                Process Optimization
              </div>
              <div className="self-stretch flex flex-col justify-start items-start gap-4">
                <div className="self-stretch flex p-6 flex-col justify-center items-start gap-5 rounded-2xl border-[0.5px] border-[#6CC2F9] bg-[linear-gradient(261deg,_#3D3E7D_8.83%,_#5C58AF_117.95%)] shadow-[0px_4px_24px_0px_rgba(126,116,235,0.30)] overflow-hidden">
                  <div className="self-stretch text-white/70 text-sm font-normal font-['Sora'] leading-normal">
                    Map existing processes to identify bottlenecks.
                  </div>
                </div>
                <div className="self-stretch flex p-6 flex-col justify-center items-start gap-5 rounded-2xl border-[0.5px] border-[#6CC2F9] bg-[linear-gradient(261deg,_#3D3E7D_8.83%,_#5C58AF_117.95%)] shadow-[0px_4px_24px_0px_rgba(126,116,235,0.30)] overflow-hidden">
                  <div className="self-stretch text-white/70 text-sm font-normal font-['Sora'] leading-normal">
                    Recommend automation or standardization opportunities.
                  </div>
                </div>
              </div>
            </div>
            <div className="flex-1 inline-flex flex-col justify-start items-start gap-3">
              <div className="self-stretch text-[#C4CADA] text-xl font-normal font-['Sora'] leading-[140%]">
                Performance Monitoring
              </div>
              <div className="self-stretch flex flex-col justify-start items-start gap-4">
                <div className="self-stretch flex p-6 flex-col justify-center items-start gap-5 rounded-2xl border-[0.5px] border-[#6CC2F9] bg-[linear-gradient(261deg,_#3D3E7D_8.83%,_#5C58AF_117.95%)] shadow-[0px_4px_24px_0px_rgba(126,116,235,0.30)] overflow-hidden">
                  <div className="self-stretch text-white/70 text-sm font-normal font-['Sora'] leading-normal">
                    Define key performance indicators (KPIs) for each unit.
                  </div>
                </div>
              </div>
            </div>
            <div className="flex-1 inline-flex flex-col justify-start items-start gap-3">
              <div className="self-stretch text-[#C4CADA] text-xl font-normal font-['Sora'] leading-[140%]">
                Risk Management
              </div>
              <div className="self-stretch flex flex-col justify-start items-start gap-4">
                <div className="self-stretch flex p-6 flex-col justify-center items-start gap-5 rounded-2xl border-[0.5px] border-[#6CC2F9] bg-[linear-gradient(261deg,_#3D3E7D_8.83%,_#5C58AF_117.95%)] shadow-[0px_4px_24px_0px_rgba(126,116,235,0.30)] overflow-hidden">
                  <div className="self-stretch text-white/70 text-sm font-normal font-['Sora'] leading-normal">
                    Identify operational risks and failure points.
                  </div>
                </div>
                <div className="self-stretch flex p-6 flex-col justify-center items-start gap-5 rounded-2xl border-[0.5px] border-[#6CC2F9] bg-[linear-gradient(261deg,_#3D3E7D_8.83%,_#5C58AF_117.95%)] shadow-[0px_4px_24px_0px_rgba(126,116,235,0.30)] overflow-hidden">
                  <div className="self-stretch text-white/70 text-sm font-normal font-['Sora'] leading-normal">
                    Develop mitigation plans and contingency procedures.
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="self-stretch px-4 py-3 bg-[#010101] rounded-[6px] border-[5px] border-[#6CC2F9] shadow-[0px_4px_20px_0px_rgba(126,116,235,0.10)] inline-flex justify-start items-center gap-2">
            <div className="flex justify-start items-center gap-2 w-full">
              <input
                type="text"
                placeholder="Ask me about operations..."
                className="bg-transparent outline-none text-[#99A1B7] text-base font-normal font-['Sora'] leading-[110%] w-full focus:text-white"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OperationsScreen;
