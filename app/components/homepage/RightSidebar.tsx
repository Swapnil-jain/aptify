import React from "react";

const RightSidebar: React.FC = () => {
  return (
    <div className="w-60 pt-24 right-0 top-0 absolute inline-flex justify-start items-center gap-2.5">
      <div className="self-stretch h-[1024px] px-6 py-8 border-l border-white/10 inline-flex flex-col justify-start items-start gap-52">
        <div className="self-stretch flex flex-col items-start gap-2">
          <div className="self-stretch flex flex-col items-start gap-2">
            <div className="w-[99px] px-2 py-2.5 rounded-lg inline-flex items-center gap-2.5">
              <div className="justify-start text-[#99A1B7] text-xs font-normal font-['Sora'] leading-none">
                Today
              </div>
            </div>
            <div className="self-stretch flex flex-col items-start gap-2">
              <div
                data-state="Default"
                className="self-stretch px-2 py-2.5 rounded-lg inline-flex items-center gap-2.5"
              >
                <div className="text-[#F9F9FC] text-[13px] font-normal font-['Sora'] leading-[14px]">
                  SLA Penalties
                </div>
              </div>
              <div
                data-state="Default"
                className="self-stretch px-2 py-2.5 rounded-lg inline-flex items-center gap-2.5"
              >
                <div className="text-[#F9F9FC] text-[13px] font-normal font-['Sora'] leading-[14px]">
                  Upcoming Expiries
                </div>
              </div>
              <div
                data-state="Default"
                className="self-stretch px-2 py-2.5 rounded-lg inline-flex items-center gap-2.5"
              >
                <div className="text-[#F9F9FC] text-[13px] font-normal font-['Sora'] leading-[14px]">
                  High-Risk Clauses
                </div>
              </div>
              <div
                data-state="Default"
                className="self-stretch px-2 py-2.5 rounded-lg inline-flex items-center gap-2.5"
              >
                <div className="text-[#F9F9FC] text-[13px] font-normal font-['Sora'] leading-[14px]">
                  Vendor Comparison
                </div>
              </div>
              <div
                data-state="Default"
                className="self-stretch px-2 py-2.5 rounded-lg inline-flex items-center gap-2.5"
              >
                <div className="text-[#F9F9FC] text-[13px] font-normal font-['Sora'] leading-[14px]">
                  Anomaly Detection
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-start gap-2">
            <div className="w-[99px] px-2 py-2.5 rounded-lg inline-flex items-center gap-2.5">
              <div className="justify-start text-[#99A1B7] text-xs font-normal font-['Sora'] leading-none">
                Yesterday
              </div>
            </div>
            <div className="flex flex-col items-start gap-2">
              <div
                data-state="Default"
                className="self-stretch px-2 py-2.5 rounded-lg inline-flex items-center gap-2.5"
              >
                <div className="text-[#F9F9FC] text-[13px] font-normal font-['Sora'] leading-[14px]">
                  Repeated Risks
                </div>
              </div>
              <div
                data-state="Default"
                className="self-stretch px-2 py-2.5 rounded-lg inline-flex items-center gap-2.5"
              >
                <div className="text-[#F9F9FC] text-[13px] font-normal font-['Sora'] leading-[14px]">
                  Cost Trends
                </div>
              </div>
              <div
                data-state="Default"
                className="self-stretch px-2 py-2.5 rounded-lg inline-flex items-center gap-2.5"
              >
                <div className="text-[#F9F9FC] text-[13px] font-normal font-['Sora'] leading-[14px]">
                  Downtime Flags
                </div>
              </div>
              <div
                data-state="Default"
                className="self-stretch px-2 py-2.5 rounded-lg inline-flex items-center gap-2.5"
              >
                <div className="text-[#F9F9FC] text-[13px] font-normal font-['Sora'] leading-[14px]">
                  Regulatory Flags
                </div>
              </div>
              <div
                data-state="Default"
                className="self-stretch px-2 py-2.5 rounded-lg inline-flex items-center gap-2.5"
              >
                <div className="text-[#F9F9FC] text-[13px] font-normal font-['Sora'] leading-[14px]">
                  Risk by Vendor
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightSidebar; 