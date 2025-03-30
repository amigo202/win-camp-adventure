
import React, { useState } from "react";
import { Textarea } from "./ui/textarea";
import { Play } from "lucide-react";

interface PythonPlaygroundProps {
  initialCode?: string;
}

const PythonPlayground: React.FC<PythonPlaygroundProps> = ({ initialCode = "# כתבו את הקוד שלכם כאן\nprint('שלום עולם!')" }) => {
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
      <Textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        className="font-mono text-sm h-[150px] mb-2 bg-gray-50 ltr-text"
        dir="ltr"
      />
      <button
        onClick={runCode}
        disabled={isRunning}
        className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition-colors disabled:opacity-50"
      >
        <Play size={16} />
        הרץ קוד
      </button>
      {output && (
        <div className="mt-4 p-3 bg-gray-100 rounded-md">
          <div className="font-medium mb-1">תוצאה:</div>
          <div className="whitespace-pre-wrap font-mono text-sm">{output}</div>
        </div>
      )}
    </div>
  );
};

export default PythonPlayground;
