
import React from "react";
import { Copy, RefreshCw } from "lucide-react";
import { toast } from "../../components/ui/use-toast";

interface ToolbarButtonsProps {
  code: string;
  onReset: () => void;
}

const ToolbarButtons: React.FC<ToolbarButtonsProps> = ({ code, onReset }) => {
  const copyCode = () => {
    navigator.clipboard.writeText(code);
    toast({
      title: "הועתק!",
      description: "הקוד הועתק ללוח",
      duration: 2000,
    });
  };

  return (
    <div className="absolute top-2 right-2 flex space-x-2">
      <button
        onClick={copyCode}
        className="p-1.5 bg-white rounded-md hover:bg-gray-100 transition-colors border border-gray-200"
        aria-label="העתק קוד"
        title="העתק קוד"
      >
        <Copy size={16} />
      </button>
      <button
        onClick={onReset}
        className="p-1.5 bg-white rounded-md hover:bg-gray-100 transition-colors border border-gray-200"
        aria-label="אפס קוד"
        title="אפס קוד"
      >
        <RefreshCw size={16} />
      </button>
    </div>
  );
};

export default ToolbarButtons;
