import React from "react";
import HomeScreen from "./homepage/HomeScreen";
import MessageProgrammingScreen from "./agents/AgentScreen";
import BookScreen from "./knowledgelibrary/KnowledgeLibrary";
import AddItemScreen from "./underconstruction/AddItemScreen";
import ProgrammingArrowScreen from "./underconstruction/ProgrammingArrowScreen";
import TaskSquareScreen from "./underconstruction/TaskSquareScreen";

interface MainContentProps {
  activeIcon: number;
}

const MainContent: React.FC<MainContentProps> = ({ activeIcon }) => {
  // Function to render the active screen based on the activeIcon state
  const renderActiveScreen = () => {
    switch (activeIcon) {
      case 0:
        return <HomeScreen />;
      case 1:
        return <MessageProgrammingScreen />;
      case 2:
        return <BookScreen />;
      case 3:
        return <AddItemScreen />;
      case 4:
        return <ProgrammingArrowScreen />;
      case 5:
        return <TaskSquareScreen />;
      default:
        return <HomeScreen />;
    }
  };

  return (
    <div className={`px-[72px] absolute inline-flex flex-col items-start gap-14 ${activeIcon === 0 ? 'w-[1088px] left-[112px]' : 'w-[1200px] left-[80px]'} top-[290px]`}>
      {renderActiveScreen()}
    </div>
  );
};

export default MainContent; 