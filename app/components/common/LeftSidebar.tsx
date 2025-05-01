import React, { useState } from "react";
import Image from "next/image";

interface LeftSidebarProps {
  activeIcon: number;
  setActiveIcon: (icon: number) => void;
}

const LeftSidebar: React.FC<LeftSidebarProps> = ({ activeIcon, setActiveIcon }) => {
  const [showMessageProgrammingMenu, setShowMessageProgrammingMenu] = useState(false);

  return (
    <div className="h-screen px-6 py-8 left-0 top-0 absolute border-r border-white/[0.14] inline-flex flex-col items-center justify-between flex-shrink-0">
      <div className="self-stretch flex flex-col justify-start items-center">
        <div className="w-14 h-14 relative mb-36">
          <Image
            src="/sidebar/logo.svg"
            alt="Aptify Logo"
            width={56}
            height={56}
          />
        </div>

        {/* Menu */}
        <div className="p-2 bg-[rgba(226,228,241,0.05)] rounded-[80px] border border-white/[0.14] flex flex-col justify-center items-start gap-4">
          {/* Home Icon */}
          <div
            data-state={activeIcon === 0 ? "active" : "inactive"}
            className={`w-12 h-12 p-3 rounded-[80px] inline-flex justify-center items-center gap-2.5 cursor-pointer transition-all
              ${
                activeIcon === 0
                  ? "bg-[radial-gradient(ellipse_50.00%_50.00%_at_50.00%_50.00%,_#252248_0%,_#080810_100%)] shadow-[0px_0px_14.199999809265137px_0px_rgba(126,116,235,0.80)]"
                  : "hover:bg-white/10"
              }`}
            onClick={() => setActiveIcon(0)}
          >
            <div className="w-5 h-5 relative">
              <Image
                src={
                  activeIcon === 0
                    ? "/sidebar/home_bold.svg"
                    : "/sidebar/home.svg"
                }
                alt="Home"
                width={20}
                height={20}
              />
            </div>
          </div>

          {/* Message Programming Icon */}
          <div
            data-state={activeIcon === 1 ? "active" : "inactive"}
            className={`relative w-12 h-12 p-3 rounded-[80px] inline-flex justify-center items-center gap-2.5 cursor-pointer transition-all
              ${
                activeIcon === 1
                  ? "bg-[radial-gradient(ellipse_50.00%_50.00%_at_50.00%_50.00%,_#252248_0%,_#080810_100%)] shadow-[0px_0px_14.199999809265137px_0px_rgba(126,116,235,0.80)]"
                  : "hover:bg-white/10"
              }`}
            onClick={() => setActiveIcon(1)}
            onMouseEnter={() => setShowMessageProgrammingMenu(true)}
            onMouseLeave={() => setShowMessageProgrammingMenu(false)}
          >
            <div className="w-5 h-5 relative">
              <Image
                src={
                  activeIcon === 1
                    ? "/sidebar/message-programming_bold.svg"
                    : "/sidebar/message-programming.svg"
                }
                alt="Message Programming"
                width={20}
                height={20}
              />
            </div>
            
            {/* Hover Menu */}
            {showMessageProgrammingMenu && (
              <div className="absolute left-16 top-0 z-10 p-2 flex flex-col items-start gap-1 rounded-2xl bg-[#252F4A]">
                {/* Contracts Item */}
                <div className="self-stretch px-2 py-2.5 bg-[rgba(126,116,235,0.2)] rounded-lg inline-flex justify-start items-center gap-2.5">
                  <div className="w-5 self-stretch inline-flex flex-col justify-center items-center">
                    <div className="w-1 h-1 bg-[#7E74EB] rounded-[90px]" />
                  </div>
                  <div className="justify-start text-[#7E74EB] text-xs font-normal font-['Sora'] leading-none">Contracts</div>
                </div>
                
                {/* RFP Item */}
                <div className="self-stretch px-2 py-2.5 rounded-lg inline-flex justify-start items-center gap-2.5">
                  <div className="w-5 self-stretch inline-flex flex-col justify-center items-center">
                    <div className="w-1 h-1 bg-[#E2E4F1] rounded-[90px]" />
                  </div>
                  <div className="justify-start text-[#F9F9FC] text-xs font-normal font-['Sora'] leading-none">RFP</div>
                </div>
                
                {/* Operations Item */}
                <div className="self-stretch px-2 py-2.5 rounded-lg inline-flex justify-start items-center gap-2.5">
                  <div className="w-5 self-stretch inline-flex flex-col justify-center items-center">
                    <div className="w-1 h-1 bg-[#E2E4F1] rounded-[90px]" />
                  </div>
                  <div className="justify-start text-[#F9F9FC] text-xs font-normal font-['Sora'] leading-none">Operations</div>
                </div>
              </div>
            )}
          </div>

          {/* Book Icon */}
          <div
            data-state={activeIcon === 2 ? "active" : "inactive"}
            className={`w-12 h-12 p-3 rounded-[80px] inline-flex justify-center items-center gap-2.5 cursor-pointer transition-all
              ${
                activeIcon === 2
                  ? "bg-[radial-gradient(ellipse_50.00%_50.00%_at_50.00%_50.00%,_#252248_0%,_#080810_100%)] shadow-[0px_0px_14.199999809265137px_0px_rgba(126,116,235,0.80)]"
                  : "hover:bg-white/10"
              }`}
            onClick={() => setActiveIcon(2)}
          >
            <div className="w-5 h-5 relative">
              <Image
                src={
                  activeIcon === 2
                    ? "/sidebar/book_bold.svg"
                    : "/sidebar/book.svg"
                }
                alt="Archive"
                width={20}
                height={20}
              />
            </div>
          </div>

          {/* Add Item Icon */}
          <div
            data-state={activeIcon === 3 ? "active" : "inactive"}
            className={`w-12 h-12 p-3 rounded-[80px] inline-flex justify-center items-center gap-2.5 cursor-pointer transition-all
              ${
                activeIcon === 3
                  ? "bg-[radial-gradient(ellipse_50.00%_50.00%_at_50.00%_50.00%,_#252248_0%,_#080810_100%)] shadow-[0px_0px_14.199999809265137px_0px_rgba(126,116,235,0.80)]"
                  : "hover:bg-white/10"
              }`}
            onClick={() => setActiveIcon(3)}
          >
            <div className="w-5 h-5 relative">
              <Image
                src={
                  activeIcon === 3
                    ? "/sidebar/additem_bold.svg"
                    : "/sidebar/additem.svg"
                }
                alt="Add Item"
                width={20}
                height={20}
              />
            </div>
          </div>

          {/* Programming Arrow Icon */}
          <div
            data-state={activeIcon === 4 ? "active" : "inactive"}
            className={`w-12 h-12 p-3 rounded-[80px] inline-flex justify-center items-center gap-2.5 cursor-pointer transition-all
              ${
                activeIcon === 4
                  ? "bg-[radial-gradient(ellipse_50.00%_50.00%_at_50.00%_50.00%,_#252248_0%,_#080810_100%)] shadow-[0px_0px_14.199999809265137px_0px_rgba(126,116,235,0.80)]"
                  : "hover:bg-white/10"
              }`}
            onClick={() => setActiveIcon(4)}
          >
            <div className="w-5 h-5 relative">
              <Image
                src={
                  activeIcon === 4
                    ? "/sidebar/programming-arrow_bold.svg"
                    : "/sidebar/programming-arrow.svg"
                }
                alt="Programming Arrow"
                width={20}
                height={20}
              />
            </div>
          </div>

          {/* Task Square Icon */}
          <div
            data-state={activeIcon === 5 ? "active" : "inactive"}
            className={`w-12 h-12 p-3 rounded-[80px] inline-flex justify-center items-center gap-2.5 cursor-pointer transition-all
              ${
                activeIcon === 5
                  ? "bg-[radial-gradient(ellipse_50.00%_50.00%_at_50.00%_50.00%,_#252248_0%,_#080810_100%)] shadow-[0px_0px_14.199999809265137px_0px_rgba(126,116,235,0.80)]"
                  : "hover:bg-white/10"
              }`}
            onClick={() => setActiveIcon(5)}
          >
            <div className="w-5 h-5 relative">
              <Image
                src={
                  activeIcon === 5
                    ? "/sidebar/task-square_bold.svg"
                    : "/sidebar/task-square.svg"
                }
                alt="Task Square"
                width={20}
                height={20}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftSidebar; 