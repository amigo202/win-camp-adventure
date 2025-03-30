
import React, { useState } from "react";
import { Play } from "lucide-react";
import CodeEditor from "./python/CodeEditor";
import OutputDisplay from "./python/OutputDisplay";

interface PythonPlaygroundProps {
  initialCode?: string;
}

const PythonPlayground: React.FC<PythonPlaygroundProps> = ({ 
  initialCode = "# כתבו את הקוד שלכם כאן\nprint('שלום עולם!')" 
}) => {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);

  const runCode = () => {
    setIsRunning(true);
    setOutput("מריץ את הקוד...");
    
    // Since we can't run real Python in the browser, we'll redirect to an online Python sandbox
    // with the code pre-populated
    const encodedCode = encodeURIComponent(code);
    const pythonTutorUrl = `https://pythontutor.com/visualize.html#code=${encodedCode}&cumulative=false&curInstr=0&heapPrimitives=nevernest&mode=display&origin=opt-frontend.js&py=3&rawInputLstJSON=%5B%5D&textReferences=false`;
    
    // Open in a new tab
    window.open(pythonTutorUrl, "_blank");
    
    // Provide a message about what happened
    setOutput("הקוד נפתח במערכת חיצונית בחלון חדש. אם החלון לא נפתח, בדקו אם דפדפן חסם אותו.");
    setIsRunning(false);
  };

  return (
    <div className="border rounded-lg p-4 bg-white shadow-sm">
      <div className="text-lg font-medium mb-2">סביבת הרצת קוד פייתון</div>
      
      <CodeEditor code={code} onChange={setCode} />
      
      <button
        onClick={runCode}
        disabled={isRunning}
        className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition-colors disabled:opacity-50"
      >
        <Play size={16} />
        הרץ קוד
      </button>
      
      <OutputDisplay output={output} />
    </div>
  );
};

export default PythonPlayground;
