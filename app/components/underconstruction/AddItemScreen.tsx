import React from 'react';
import Image from 'next/image';

const AddItemScreen: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <div className="w-full inline-flex h-[960px] py-6 pb-[72px] flex-col items-start gap-16 flex-shrink-0 bg-gradient-to-bl from-gray-800/30 to-indigo-900/30 rounded-2xl shadow-[0px_4px_12px_0px_rgba(0,0,0,0.12)] outline outline-1 outline-offset-[-1px] outline-white/10">
        <div className="self-stretch px-6 inline-flex justify-between items-center">
          <div className="flex justify-start items-center gap-3">
            <Image
              src="/topbar/home.svg"
              alt="Home"
              width={20}
              height={20}
            />
            <div className="justify-start text-500 text-base font-normal font-['Sora'] leading-snug">Add Item</div>
          </div>
          <div className="flex justify-start items-center gap-2">
            <div data-color="Button light" data-icon="Only" data-size="Medium" data-state="Default" className="w-10 h-10 px-2 py-2.5 bg-gradient-to-b from-white/0 to-white/10 rounded-[900px] shadow-[0px_4px_12px_0px_rgba(0,0,0,0.12)] outline outline-1 outline-offset-[-1px] outline-white/10 flex justify-center items-center gap-1.5">
              <Image
                src="/topbar/notification-bing.svg"
                alt="Notifications"
                width={18}
                height={18}
              />
            </div>
            <div data-color="Button light" data-icon="Only" data-size="Medium" data-state="Default" className="w-10 h-10 px-2 py-2.5 bg-gradient-to-b from-white/0 to-white/10 rounded-[900px] shadow-[0px_4px_12px_0px_rgba(0,0,0,0.12)] outline outline-1 outline-offset-[-1px] outline-white/10 flex justify-center items-center gap-1.5">
              <Image
                src="/topbar/moon.svg"
                alt="Theme"
                width={18}
                height={18}
              />
            </div>
          </div>
        </div>
        <div className="w-[562px] flex flex-col justify-start items-start gap-10 px-6">
          <div className="w-20 h-20 relative">
            <div className="flex w-[59px] h-[59px] p-[16.709px] left-[19px] top-[17px] absolute rounded-[16px] border-[1.5px] border-[rgba(34,157,236,0.00)] bg-[radial-gradient(76.94%_45.95%_at_50.00%_50.00%,_rgba(255,_255,_255,_0)_0%,_rgba(255,_255,_255,_0.20)_100%),_linear-gradient(146deg,_#6CC2F9_-12.63%,_#7E74EB_116.07%)] shadow-[0px_-3px_20px_0px_rgba(58,43,132,0.30),_0px_5.57px_16.987px_0px_rgba(80,67,217,0.50)_inset] items-center gap-[11.139px] justify-center">
              <Image
                src="/sidebar/additem_bold.svg"
                alt="Add Item"
                width={30}
                height={30}
                style={{ 
                  width: '30px', 
                  height: '30px', 
                  objectFit: 'contain'
                }}
                priority
              />
            </div>
          </div>
          <div className="self-stretch flex flex-col justify-start items-start gap-2.5">
            <div className="self-stretch text-[#FFF] text-[40px] font-normal font-['Sora'] leading-[140%]">
              Add New Item
            </div>
            <div className="self-stretch text-[#C4CADA] text-base font-normal font-['Sora'] leading-[140%]">
              Create or upload new content to your workspace
            </div>
          </div>
        </div>
        
        {/* Under Construction Banner */}
        <div className="self-stretch p-6 bg-[rgba(126,116,235,0.1)] rounded-xl border border-[#7E74EB] mx-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-[rgba(126,116,235,0.2)] rounded-full flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 9V14" stroke="#7E74EB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 21.41H5.93C2.46 21.41 1.02 18.93 2.7 15.9L5.82 10.28L8.76 5.00998C10.54 1.79998 13.46 1.79998 15.24 5.00998L18.18 10.29L21.3 15.91C22.98 18.94 21.53 21.42 18.07 21.42H12V21.41Z" stroke="#7E74EB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M11.995 17H12.005" stroke="#7E74EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div>
              <div className="text-[#F9F9FC] text-lg font-medium mb-1">Under Construction</div>
              <div className="text-[#C4CADA] text-sm">This feature is currently being developed and will be available soon</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddItemScreen; 