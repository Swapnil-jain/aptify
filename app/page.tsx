"use client";
import React, { useState } from "react";
import LeftSidebar from "./components/common/LeftSidebar";
import TopHeader from "./components/common/TopHeader";
import RightSidebar from "./components/homepage/RightSidebar";
import MainContent from "./components/MainContent";

export default function Home() {
  const [activeIcon, setActiveIcon] = useState(0);

  return (
    <div className="w-full h-screen relative bg-[radial-gradient(ellipse_97.02%_97.02%_at_50.00%_2.98%,_#121023_0%,_black_100%)] overflow-hidden">
      <div className="w-full h-full left-[300px] top-[708px] absolute origin-top-left -rotate-90 bg-[radial-gradient(ellipse_50.00%_50.00%_at_50.00%_50.00%,_rgba(26.33,_24,_52,_0.80)_0%,_rgba(26.33,_24,_52,_0)_100%)] rounded-full" />

      {/* Left Sidebar */}
      <LeftSidebar activeIcon={activeIcon} setActiveIcon={setActiveIcon} />

      {/* Right Sidebar - Only show on homepage */}
      {activeIcon === 0 && <RightSidebar />}

      {/* Top Header */}
      <TopHeader activeIcon={activeIcon} />

      {/* Main Content */}
      <MainContent activeIcon={activeIcon} />
    </div>
  );
}
