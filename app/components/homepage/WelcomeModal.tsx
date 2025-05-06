"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import Image from "next/image";

interface WelcomeModalProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export function WelcomeModal({ isOpen = true, onClose }: WelcomeModalProps) {
  const [isVisible, setIsVisible] = useState(isOpen);

  useEffect(() => {
    setIsVisible(isOpen);
  }, [isOpen]);

  const handleClose = () => {
    setIsVisible(false);
    if (onClose) onClose();
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-md z-50 p-4">
      <div className="p-[1px] rounded-xl max-w-[580px] w-full relative">
        {/* Gradient border */}
        <div className="absolute inset-0 rounded-xl" style={{
          background: "linear-gradient(225deg, #6BC4FA 0%, #7D73EA 100%)",
          opacity: 0.8,
        }} />
        
        <div
          className="bg-[#191a2a] rounded-xl shadow-xl w-full h-full relative overflow-hidden"
          style={{
            boxShadow: "0 10px 25px rgba(0, 0, 0, 0.3)",
          }}
        >
          {/* Decorative rectangle with dots - more random appearance with faded left edge */}
          <div 
            className="absolute z-[0]" 
            style={{
              width: "1124px",
              height: "674.4px",
              right: "-528px",
              bottom: "-67.4px",
              opacity: 0.2,
              backgroundImage: `
                radial-gradient(circle, rgba(123, 128, 237, 0.6) 0.8px, transparent 0.8px),
                radial-gradient(circle, rgba(123, 128, 237, 0.5) 1.5px, transparent 1.5px),
                radial-gradient(circle, rgba(123, 128, 237, 0.4) 2.2px, transparent 2.2px),
                radial-gradient(circle, rgba(123, 128, 237, 0.3) 0.8px, transparent 0.8px),
                radial-gradient(circle, rgba(123, 128, 237, 0.2) 1.2px, transparent 1.2px)
              `,
              backgroundSize: `
                23px 23px,
                31px 31px,
                41px 41px,
                17px 17px,
                47px 47px
              `,
              backgroundPosition: `
                0 0,
                11px 13px,
                17px 19px,
                7px 7px,
                23px 29px
              `,
              pointerEvents: "none",
              maskImage: "linear-gradient(135deg, transparent, transparent 20%, rgba(0,0,0,0.3) 30%, rgba(0,0,0,0.6) 40%, rgba(0,0,0,1) 50%)",
              WebkitMaskImage: "linear-gradient(135deg, transparent, transparent 20%, rgba(0,0,0,0.3) 30%, rgba(0,0,0,0.6) 40%, rgba(0,0,0,1) 50%)"
            }}
          />
          
          {/* Outer eclipse */}
          <div className="absolute w-[698px] h-[658px] left-[-55px] top-[-299.5px] bg-[radial-gradient(ellipse_49.51%_50.01%_at_50.00%_50.00%,_rgba(123,_128,_237,_0.01)_82%,_rgba(123,_128,_237,_0.02)_100%)] rounded-full backdrop-blur-[6.73px]" />
          
          {/* Inner rings and logo */}
          <div className="absolute left-1/2 transform -translate-x-1/2 top-0">
            <div className="w-[486px] h-[300px] relative overflow-visible">
              <div className="w-[487.76px] h-[487.76px] left-[-0.88px] top-[-193.35px] absolute bg-[radial-gradient(ellipse_49.51%_50.01%_at_50.00%_50.00%,_rgba(123,_128,_237,_0.01)_82%,_rgba(123,_128,_237,_0.04)_100%)] rounded-full backdrop-blur-[6.73px]" />
              <div className="w-72 h-72 left-[93.06px] top-[-98.97px] absolute bg-[radial-gradient(ellipse_49.51%_50.01%_at_50.00%_50.00%,_rgba(123,_128,_237,_0.02)_70%,_rgba(123,_128,_237,_0.12)_100%)] rounded-full" />
              <div className="w-36 h-36 left-[169.59px] top-[-21.98px] absolute flex items-center justify-center">
                <div className="w-36 h-36 left-0 top-0 absolute bg-gradient-to-br from-indigo-400 to-sky-300 rounded-full shadow-[inset_-5.037913799285889px_-10.075827598571777px_37.93874740600586px_0px_rgba(27,38,95,1.00)] border-[0.44px] border-indigo-900" />
                <Image
                  src="/frame.svg"
                  alt="Aptify Logo"
                  width={40}
                  height={40}
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "contain",
                    minWidth: "100px",
                    minHeight: "100px",
                    position: "relative",
                    zIndex: 1
                  }}
                  priority
                />
              </div>
            </div>
          </div>
  
          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors z-10"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
  
          {/* Content */}
          <div className="flex flex-col items-center gap-8 self-stretch px-8 py-12 pt-[300px] text-center relative z-[1]">
            {/* Title */}
            <div className="self-stretch inline-flex flex-col justify-start items-center gap-2">
              <div className="inline-flex justify-center items-center gap-2.5">
                <div className="text-center text-white text-4xl font-normal font-['Sora'] leading-[56px]">Welcome to</div>
                <Image 
                  src="/aptify_modal.svg" 
                  alt="aptify" 
                  width={137} 
                  height={48}
                  priority
                />
              </div>
              
              {/* Description */}
              <p className="w-[500px] text-center text-[#C4CADA] text-sm font-normal font-['Sora'] leading-[140%] mt-2">
                Step into the future of data infrastructure. Aptify is your
                intelligent teammate, built to help ambitious datacenter operators
                streamline operations, boost efficiency, and scale with confidence.
              </p>
            </div>
  
            {/* Button */}
            <button
              className="flex h-12 px-5 py-2.5 justify-center items-center gap-1.5 rounded-lg bg-[#7E74EB] hover:bg-[#6A62DC] text-white transition-colors"
              onClick={handleClose}
            >
              Let's get started
              <Image 
                src="/magic-star.svg" 
                alt="Star" 
                width={24} 
                height={24}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
