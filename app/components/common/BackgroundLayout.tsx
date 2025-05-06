import React, { useState, useEffect } from "react";
import Image from "next/image";

interface BackgroundLayoutProps {
  activeIcon: number;
  setActiveIcon: (icon: number) => void;
  children: React.ReactNode;
}

const BackgroundLayout: React.FC<BackgroundLayoutProps> = ({
  activeIcon,
  setActiveIcon,
  children,
}) => {
  const [showMessageProgrammingMenu, setShowMessageProgrammingMenu] =
    useState(false);

  // Show the menu when any of the related screens are active
  useEffect(() => {
    if (activeIcon === 1 || activeIcon === 6 || activeIcon === 7) {
      setShowMessageProgrammingMenu(true);
    }
  }, [activeIcon]);

  // Hide menu when clicking elsewhere
  useEffect(() => {
    const handleClickOutside = () => {
      if (
        !activeIcon ||
        (activeIcon !== 1 && activeIcon !== 6 && activeIcon !== 7)
      ) {
        setShowMessageProgrammingMenu(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [activeIcon]);

  return (
    <div className="w-full h-screen relative bg-[radial-gradient(ellipse_148.09%_220.67%_at_1.55%_-4.37%,_#1C1A38_0%,_black_100%)]">
      {/* Background gradient effect - putting this at the bottom of the stack */}
      <div className="w-[1846px] h-[1424px] left-[16px] top-[898px] absolute origin-top-left -rotate-90 bg-[radial-gradient(ellipse_50.00%_50.00%_at_50.00%_50.00%,_rgba(26.33,_24,_52,_0.80)_0%,_rgba(26.33,_24,_52,_0)_100%)] rounded-full z-0 pointer-events-none" />

      {/* Left Sidebar */}
      <div className="w-[88px] h-screen px-4 py-8 left-0 top-0 absolute flex flex-col justify-between items-center z-20">
        <div className="self-stretch flex flex-col items-center">
          <div className="w-12 h-12 relative mb-36">
            <Image
              src="/sidebar/logo.svg"
              alt="Aptify Logo"
              width={48}
              height={48}
            />
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-4">
            {/* Home Icon */}
            <div
              data-state={activeIcon === 0 ? "active" : "inactive"}
              className={`w-12 h-12 p-3 rounded-[66.67px] inline-flex justify-center items-center gap-2.5 cursor-pointer transition-all
                ${
                  activeIcon === 0
                    ? "bg-gradient-to-br from-indigo-400 to-sky-300"
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
              data-state={
                activeIcon === 1 || activeIcon === 6 || activeIcon === 7
                  ? "active"
                  : "inactive"
              }
              className={`relative w-12 h-12 p-3 rounded-[66.67px] inline-flex justify-center items-center gap-2.5 transition-all
                ${
                  activeIcon === 1 || activeIcon === 6 || activeIcon === 7
                    ? "bg-gradient-to-br from-indigo-400 to-sky-300"
                    : "hover:bg-white/10"
                }`}
              onMouseEnter={() => setShowMessageProgrammingMenu(true)}
            >
              <div className="w-5 h-5 relative">
                <Image
                  src={
                    activeIcon === 1 || activeIcon === 6 || activeIcon === 7
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
                <div
                  className="absolute left-16 top-0 z-50 p-2 flex flex-col items-start gap-1 rounded-2xl bg-[#252F4A]"
                  onMouseEnter={() => setShowMessageProgrammingMenu(true)}
                  onMouseLeave={() => setShowMessageProgrammingMenu(false)}
                >
                  {/* Contracts Item */}
                  <div
                    className={`self-stretch px-2 py-2.5 rounded-lg inline-flex justify-start items-center gap-2.5 cursor-pointer transition-colors
                      ${
                        activeIcon === 1
                          ? "bg-[rgba(126,116,235,0.2)]"
                          : "hover:bg-[rgba(126,116,235,0.2)]"
                      }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveIcon(1);
                    }}
                  >
                    <div className="w-5 self-stretch inline-flex flex-col justify-center items-center">
                      <div
                        className={`w-1 h-1 rounded-[90px] ${
                          activeIcon === 1 ? "bg-[#7E74EB]" : "bg-[#E2E4F1]"
                        }`}
                      />
                    </div>
                    <div
                      className={`justify-start text-xs font-normal font-['Sora'] leading-none ${
                        activeIcon === 1 ? "text-[#7E74EB]" : "text-[#F9F9FC]"
                      }`}
                    >
                      Contracts
                    </div>
                  </div>

                  {/* RFP Item */}
                  <div
                    className={`self-stretch px-2 py-2.5 rounded-lg inline-flex justify-start items-center gap-2.5 cursor-pointer transition-colors
                      ${
                        activeIcon === 6
                          ? "bg-[rgba(126,116,235,0.2)]"
                          : "hover:bg-[rgba(126,116,235,0.2)]"
                      }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveIcon(6);
                    }}
                  >
                    <div className="w-5 self-stretch inline-flex flex-col justify-center items-center">
                      <div
                        className={`w-1 h-1 rounded-[90px] ${
                          activeIcon === 6 ? "bg-[#7E74EB]" : "bg-[#E2E4F1]"
                        }`}
                      />
                    </div>
                    <div
                      className={`justify-start text-xs font-normal font-['Sora'] leading-none ${
                        activeIcon === 6 ? "text-[#7E74EB]" : "text-[#F9F9FC]"
                      }`}
                    >
                      RFP
                    </div>
                  </div>

                  {/* Operations Item */}
                  <div
                    className={`self-stretch px-2 py-2.5 rounded-lg inline-flex justify-start items-center gap-2.5 cursor-pointer transition-colors
                      ${
                        activeIcon === 7
                          ? "bg-[rgba(126,116,235,0.2)]"
                          : "hover:bg-[rgba(126,116,235,0.2)]"
                      }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveIcon(7);
                    }}
                  >
                    <div className="w-5 self-stretch inline-flex flex-col justify-center items-center">
                      <div
                        className={`w-1 h-1 rounded-[90px] ${
                          activeIcon === 7 ? "bg-[#7E74EB]" : "bg-[#E2E4F1]"
                        }`}
                      />
                    </div>
                    <div
                      className={`justify-start text-xs font-normal font-['Sora'] leading-none ${
                        activeIcon === 7 ? "text-[#7E74EB]" : "text-[#F9F9FC]"
                      }`}
                    >
                      Operations
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Book Icon */}
            <div
              data-state={activeIcon === 2 ? "active" : "inactive"}
              className={`w-12 h-12 px-2 py-2.5 rounded-[900px] inline-flex justify-center items-center gap-1.5 cursor-pointer transition-all
                ${
                  activeIcon === 2
                    ? "bg-gradient-to-br from-indigo-400 to-sky-300"
                    : "bg-gradient-to-b from-zinc-800/0 to-zinc-800/0 shadow-[0px_4px_13.399999618530273px_0px_rgba(0,0,0,0.12)] hover:bg-white/10"
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
                  alt="Book"
                  width={20}
                  height={20}
                />
              </div>
            </div>

            {/* Add Item Icon */}
            <div
              data-state={activeIcon === 3 ? "active" : "inactive"}
              className={`w-12 h-12 px-2 py-2.5 rounded-[900px] inline-flex justify-center items-center gap-1.5 cursor-pointer transition-all
                ${
                  activeIcon === 3
                    ? "bg-gradient-to-br from-indigo-400 to-sky-300"
                    : "bg-gradient-to-b from-zinc-800/0 to-zinc-800/0 shadow-[0px_4px_13.399999618530273px_0px_rgba(0,0,0,0.12)] hover:bg-white/10"
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
              className={`w-12 h-12 px-2 py-2.5 rounded-[900px] inline-flex justify-center items-center gap-1.5 cursor-pointer transition-all
                ${
                  activeIcon === 4
                    ? "bg-gradient-to-br from-indigo-400 to-sky-300"
                    : "bg-gradient-to-b from-zinc-800/0 to-zinc-800/0 shadow-[0px_4px_13.399999618530273px_0px_rgba(0,0,0,0.12)] hover:bg-white/10"
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
              className={`w-12 h-12 px-2 py-2.5 rounded-[900px] inline-flex justify-center items-center gap-1.5 cursor-pointer transition-all
                ${
                  activeIcon === 5
                    ? "bg-gradient-to-br from-indigo-400 to-sky-300"
                    : "bg-gradient-to-b from-zinc-800/0 to-zinc-800/0 shadow-[0px_4px_13.399999618530273px_0px_rgba(0,0,0,0.12)] hover:bg-white/10"
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
        <div data-size="small" className="w-10 h-10 relative rounded-[100px]">
          <Image
            className="rounded-[100px] border border-white/20"
            src="/topbar/pp.png"
            alt="User profile"
            width={40}
            height={40}
          />
        </div>
      </div>

      {/* Content area with higher z-index */}
      <div className="pl-[88px] relative z-10">{children}</div>
    </div>
  );
};

export default BackgroundLayout;
