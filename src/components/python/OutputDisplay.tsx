
import React from "react";

interface OutputDisplayProps {
  output: string;
}

const OutputDisplay: React.FC<OutputDisplayProps> = ({ output }) => {
  if (!output) return null;
  
  return (
    <div className="mt-4 p-3 bg-gray-100 rounded-md">
      <div className="font-medium mb-1">תוצאה:</div>
      <div className="whitespace-pre-wrap font-mono text-sm">{output}</div>
    </div>
  );
};

export default OutputDisplay;
