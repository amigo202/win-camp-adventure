
import React, { useState } from "react";
import { toast } from "../components/ui/use-toast";
import CodeEditor from "./python/CodeEditor";
import OutputDisplay from "./python/OutputDisplay";
import RunButton from "./python/RunButton";
import InfoMessage from "./python/InfoMessage";
import ToolbarButtons from "./python/ToolbarButtons";
import { runPythonCode } from "../services/pythonRunner";

interface PythonPlaygroundProps {
  initialCode?: string;
}

const PythonPlayground: React.FC<PythonPlaygroundProps> = ({ 
  initialCode = "# כתבו את הקוד שלכם כאן\nprint('שלום עולם!')" 
}) => {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);

  const handleRunCode = () => {
    setIsRunning(true);
    setOutput("מריץ את הקוד...");
    
    try {
      const { url, message } = runPythonCode(code);
      
      // Open in a new tab
      if (url) {
        window.open(url, "_blank");
      }
      
      // Provide a message about what happened
      setOutput(message);
    } catch (error) {
      setOutput("אירעה שגיאה בהרצת הקוד. אנא נסו שוב מאוחר יותר.");
    } finally {
      setIsRunning(false);
    }
  };

  const resetCode = () => {
    setCode(initialCode);
    toast({
      title: "הקוד אופס",
      description: "הקוד חזר למצב ההתחלתי",
      duration: 2000,
    });
  };

  return (
    <div className="border rounded-lg p-4 bg-white shadow-sm">
      <div className="text-lg font-bold mb-2 text-indigo-700">סביבת הרצת קוד פייתון</div>
      
      <div className="mb-2 relative">
        <CodeEditor code={code} onChange={setCode} />
        <ToolbarButtons code={code} onReset={resetCode} />
      </div>
      
      <div className="space-y-3">
        <RunButton onClick={handleRunCode} isRunning={isRunning} />
        <InfoMessage />
      </div>
      
      <OutputDisplay output={output} />
    </div>
  );
};

export default PythonPlayground;
