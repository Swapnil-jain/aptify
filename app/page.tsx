"use client";
import React, { useState } from "react";
import BackgroundLayout from "./components/common/BackgroundLayout";
import RightSidebar from "./components/homepage/RightSidebar";
import MainContent from "./components/MainContent";

export default function Home() {
  const [activeIcon, setActiveIcon] = useState(0);

  return (
    <div className="overflow-hidden h-screen">
      <BackgroundLayout activeIcon={activeIcon} setActiveIcon={setActiveIcon}>
        <div className="flex items-start justify-center gap-6 pt-6 px-6">
          {/* Main Content */}
          <MainContent activeIcon={activeIcon} setActiveIcon={setActiveIcon} />
          
          {/* Right Sidebar - Show for both home and agent screens */}
          {(activeIcon === 0 || activeIcon === 1 || activeIcon === 6 || activeIcon === 7) && <RightSidebar />}
        </div>
      </BackgroundLayout>
    </div>
  );
}
