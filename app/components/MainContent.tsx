import React from "react";
import HomeScreen from "./homepage/HomeScreen";
import MessageProgrammingScreen from "./agents/AgentScreen";
import BookScreen from "./knowledgelibrary/KnowledgeLibrary";
import AddItemScreen from "./underconstruction/AddItemScreen";
import ProgrammingArrowScreen from "./underconstruction/ProgrammingArrowScreen";
import TaskSquareScreen from "./underconstruction/TaskSquareScreen";
import RFPScreen from "./agents/RFPScreen";
import OperationsScreen from "./agents/OperationsScreen";

interface MainContentProps {
  activeIcon: number;
  setActiveIcon: (icon: number) => void;
}

const MainContent: React.FC<MainContentProps> = ({ activeIcon, setActiveIcon }) => {
  // Function to render the active screen based on the activeIcon state
  const renderActiveScreen = () => {
    switch (activeIcon) {
      case 0:
        return <HomeScreen setActiveIcon={setActiveIcon} />;
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
      case 6:
        return <RFPScreen />;
      case 7:
        return <OperationsScreen />;
      default:
        return <HomeScreen setActiveIcon={setActiveIcon} />;
    }
  };

  return (
    <div className="h-full w-full">
      {renderActiveScreen()}
    </div>
  );
};

export default MainContent; 