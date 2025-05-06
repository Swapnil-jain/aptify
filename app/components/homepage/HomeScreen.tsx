"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { WelcomeModal } from "./WelcomeModal";

interface HomeScreenProps {
  setActiveIcon?: (icon: number) => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ setActiveIcon }) => {
  const [showWelcomeModal, setShowWelcomeModal] = useState(true);
  const [showSidebarHint, setShowSidebarHint] = useState(false);

  useEffect(() => {
    // Show the sidebar hint animation after a short delay when the welcome modal is closed
    if (!showWelcomeModal) {
      const timer = setTimeout(() => {
        setShowSidebarHint(true);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [showWelcomeModal]);

  // Calculate the position for the hint
  useEffect(() => {
    if (showSidebarHint && typeof window !== 'undefined') {
      // Get sidebar elements by class or position instead of id
      // This is a dynamic approach to find the second icon
      setTimeout(() => {
        try {
          // Try to find the icon by its data attribute
          const icon = document.querySelector('.absolute.top-1\\/2 > div:nth-child(2)');
          const hint = document.getElementById('sidebar-hint');
          
          if (icon && hint) {
            // Get the icon's position
            const rect = icon.getBoundingClientRect();
            // Set the hint's position to match, with adjustments for down and left
            hint.style.top = `${rect.top + 7}px`; // Move down
            hint.style.left = '60px'; // Move to the left
          }
        } catch (e) {
          console.log('Could not position hint dynamically');
        }
      }, 100);
    }
  }, [showSidebarHint]);

  const handleCloseModal = () => {
    setShowWelcomeModal(false);
  };

  const handleSidebarHintClick = () => {
    // Set the active icon to Message Programming (1)
    if (setActiveIcon) {
      setActiveIcon(1);
    }
    setShowSidebarHint(false);
  };

  return (
    <>
      <WelcomeModal isOpen={showWelcomeModal} onClose={handleCloseModal} />
      
      {/* Sidebar hint animation overlay */}
      {showSidebarHint && (
        <div 
          id="sidebar-hint"
          className="fixed left-[80px] top-1/2 z-50 cursor-pointer" 
          style={{ animation: "sidebar-hint 4s ease-in-out" }}
          onClick={handleSidebarHintClick}
        >
          <div className="relative">
            <div className="absolute left-[-36px] top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-gradient-to-br from-indigo-400/30 to-sky-300/30 animate-pulse" />
            <div className="bg-white/90 text-gray-800 px-4 py-2 rounded-lg shadow-lg whitespace-nowrap">
              <p className="text-sm font-medium">Explore our AI agents</p>
              <div className="absolute left-0 top-1/2 -translate-x-full -translate-y-1/2 border-t-8 border-b-8 border-r-8 border-t-transparent border-b-transparent border-r-white/90"></div>
            </div>
          </div>
        </div>
      )}
      
      <div className="w-full h-[95vh] pt-6 pb-[72px] bg-gradient-to-bl from-gray-800/30 to-indigo-900/30 rounded-2xl shadow-[0px_4px_12px_0px_rgba(0,0,0,0.12)] outline outline-1 outline-offset-[-1px] outline-white/10 flex flex-col justify-end items-start gap-16 overflow-hidden">
        <div className="self-stretch px-6 inline-flex justify-between items-center">
          <div className="flex justify-start items-center gap-3 relative z-10">
            <Image
              src="/topbar/home.svg"
              alt="Home"
              width={20}
              height={20}
            />
            <div className="justify-start text-500 text-base font-normal font-['Sora'] leading-snug">Home</div>
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
        <div className="self-stretch flex-1 flex flex-col justify-center items-center relative">
          {/* Decorative pattern - Only show when welcome modal is closed */}
          {!showWelcomeModal && (
            <div className="absolute top-[13vh] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-[880px] h-[510px] overflow-hidden">
              <div style={{width: 602.88, height: 602.88, left: 122.46, top: -221.16, position: 'absolute', background: 'radial-gradient(ellipse 49.51% 50.01% at 50.00% 50.00%, rgba(123, 128, 237, 0.02) 70%, rgba(123, 128, 237, 0.10) 100%)', borderRadius: 9999, backdropFilter: 'blur(4.36px)'}} />
              <div style={{width: 392.70, height: 392.70, left: 226.81, top: -116.07, position: 'absolute', background: 'radial-gradient(ellipse 49.51% 50.01% at 50.00% 50.00%, rgba(123, 128, 237, 0) 5%, rgba(123, 128, 237, 0.19) 100%)', borderRadius: 9999}} />
              <div style={{width: 805.33, height: 805.33, left: 21.24, top: -323.12, position: 'absolute', background: 'radial-gradient(ellipse 49.51% 50.01% at 50.00% 50.00%, rgba(123, 128, 237, 0) 79%, rgba(123, 128, 237, 0.04) 100%)', borderRadius: 9999, backdropFilter: 'blur(3.81px)'}} />
              <div style={{width: 224.54, height: 224.54, left: 310.88, top: -32.73, position: 'absolute'}}>
                <div style={{width: 224.54, height: 224.54, left: 0, top: 0, position: 'absolute', background: 'linear-gradient(119deg, #7E74EB 0%, #6CC2F9 100%)', boxShadow: '-7.659417629241943px -15.318835258483887px 57.68036651611328px #1B265F inset', borderRadius: 9999}} />
                <Image
                  src="/frame.svg"
                  alt="Aptify Logo"
                  width={120}
                  height={120}
                  style={{
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                    zIndex: 1
                  }}
                  priority
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Add keyframe animation styles */}
      <style jsx global>{`
        @keyframes sidebar-hint {
          0% { opacity: 0; transform: translateX(-10px); }
          10% { opacity: 1; transform: translateX(0); }
          85% { opacity: 1; transform: translateX(0); }
          100% { opacity: 0; transform: translateX(-10px); }
        }
      `}</style>
    </>
  );
};

export default HomeScreen;