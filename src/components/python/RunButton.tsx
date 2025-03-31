
import React from "react";
import { Play } from "lucide-react";
import { Button } from "../ui/button";

interface RunButtonProps {
  onClick: () => void;
  isRunning: boolean;
}

const RunButton: React.FC<RunButtonProps> = ({ onClick, isRunning }) => {
  return (
    <Button
      onClick={onClick}
      disabled={isRunning}
      className="w-full bg-green-600 hover:bg-green-700 text-white transition-colors disabled:opacity-50"
    >
      <Play size={16} className="mr-2" />
      הרץ קוד ויזואלי
    </Button>
  );
};

export default RunButton;
