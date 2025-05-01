import React from "react";
import Image from "next/image";

interface TopHeaderProps {
  activeIcon: number;
}

const TopHeader: React.FC<TopHeaderProps> = ({ activeIcon }) => {
  // Get the page title based on the active icon
  const getPageTitle = () => {
    switch (activeIcon) {
      case 0:
        return "Home";
      case 1:
        return "Your Agents";
      case 2:
        return "Knowledge Base";
      case 3:
        return "Add New Item";
      case 4:
        return "API Integrations";
      case 5:
        return "Task Manager";
      default:
        return "Home";
    }
  };

  // Get the icon based on the active screen
  const getIcon = () => {
    switch (activeIcon) {
      case 0:
        return "/topbar/home.svg";
      case 1:
        return "/topbar/message-programming.svg";
      case 2:
        return "/topbar/book.svg";
      case 3:
        return "/topbar/home.svg";
      case 4:
        return "/topbar/home.svg";
      case 5:
        return "/topbar/home.svg";
      default:
        return "/topbar/home.svg";
    }
  };

  return (
    <div className="w-[calc(100%-7.2rem)] px-10 py-6 left-[7.2rem] top-0 absolute border-b border-white/10 inline-flex justify-between items-center">
      <div className="flex justify-start items-center gap-3">
        <div data-property-1="linear" className="w-5 h-5 relative">
          <Image 
            src={getIcon()} 
            alt={getPageTitle()} 
            width={activeIcon === 1 ? 18 : 20} 
            height={activeIcon === 1 ? 18 : 20} 
          />
        </div>
        <div className="text-[#C4CADA] text-base font-normal font-sora leading-[140%]">
          {getPageTitle()}
        </div>
      </div>
      <div className="flex justify-start items-center gap-4">
        <div
          data-color="Button light"
          data-icon="Only"
          data-size="Medium"
          data-state="Default"
          className="w-10 h-10 px-2 py-2.5 bg-gradient-to-b from-white/0 to-white/10 rounded-[900px] shadow-[0px_4px_12px_0px_rgba(0,0,0,0.12)] outline outline-1 outline-offset-[-1px] outline-white/10 flex justify-center items-center gap-1.5"
        >
          <div
            data-property-1="outline"
            className="w-5 h-5 relative flex justify-center items-center"
          >
            <Image
              src="/topbar/notification-bing.svg"
              alt="Notifications"
              width={18}
              height={18}
            />
          </div>
        </div>
        <div className="flex justify-start items-center gap-4">
          <div
            data-size="small"
            className="w-10 h-10 relative rounded-[100px]"
          >
            <Image
              className="w-10 h-10 left-0 top-0 absolute rounded-[100px] border border-white/20"
              src="/topbar/pp.png"
              alt="User profile"
              width={40}
              height={40}
            />
          </div>
          <div className="inline-flex flex-col justify-start items-start gap-0.5">
            <div className="self-stretch text-white text-base font-normal font-['Sora'] leading-[140%]">
              John Doe
            </div>
            <div className="self-stretch text-[#C4CADA]/70 text-sm font-normal font-['Sora'] leading-[140%]">
              youremail@mail.com
            </div>
          </div>
        </div>
        <div className="self-stretch py-2 flex justify-start items-center gap-2.5">
          <div className="w-0 self-stretch outline outline-1 outline-offset-[-0.50px] outline-white/10" />
        </div>
        <div
          data-color="Button light"
          data-icon="Only"
          data-size="Medium"
          data-state="Default"
          className="w-10 h-10 px-2 py-2.5 bg-gradient-to-b from-white/0 to-white/10 rounded-[900px] shadow-[0px_4px_12px_0px_rgba(0,0,0,0.12)] outline outline-1 outline-offset-[-1px] outline-white/10 flex justify-center items-center gap-1.5"
        >
          <div
            data-property-1="linear"
            className="w-5 h-5 relative flex justify-center items-center"
          >
            <Image
              src="/topbar/archive-book.svg"
              alt="Archive"
              width={18}
              height={18}
            />
          </div>
        </div>
        <div
          data-color="Button light"
          data-icon="Only"
          data-size="Medium"
          data-state="Default"
          className="w-10 h-10 px-2 py-2.5 bg-gradient-to-b from-white/0 to-white/10 rounded-[900px] shadow-[0px_4px_12px_0px_rgba(0,0,0,0.12)] outline outline-1 outline-offset-[-1px] outline-white/10 flex justify-center items-center gap-1.5"
        >
          <div
            data-property-1="linear"
            className="w-5 h-5 relative flex justify-center items-center"
          >
            <Image
              src="/topbar/moon.svg"
              alt="Dark Mode"
              width={18}
              height={18}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopHeader; 