
import React, { useState } from "react";
import { Play, Copy, RefreshCw } from "lucide-react";
import CodeEditor from "./python/CodeEditor";
import OutputDisplay from "./python/OutputDisplay";
import { toast } from "../components/ui/use-toast";
import { Button } from "./ui/button";

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
    try {
      const encodedCode = encodeURIComponent(code);
      const pythonTutorUrl = `https://pythontutor.com/visualize.html#code=${encodedCode}&cumulative=false&curInstr=0&heapPrimitives=nevernest&mode=display&origin=opt-frontend.js&py=3&rawInputLstJSON=%5B%5D&textReferences=false`;
      
      // Open in a new tab
      window.open(pythonTutorUrl, "_blank");
      
      // Provide a message about what happened
      setOutput("הקוד נפתח במערכת חיצונית בחלון חדש. המערכת מאפשרת לראות בצורה ויזואלית איך הקוד רץ, צעד אחר צעד.");
    } catch (error) {
      setOutput("אירעה שגיאה בהרצת הקוד. אנא נסו שוב מאוחר יותר.");
    } finally {
      setIsRunning(false);
    }
  };

  const copyCode = () => {
    navigator.clipboard.writeText(code);
    toast({
      title: "הועתק!",
      description: "הקוד הועתק ללוח",
      duration: 2000,
    });
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
            onClick={resetCode}
            className="p-1.5 bg-white rounded-md hover:bg-gray-100 transition-colors border border-gray-200"
            aria-label="אפס קוד"
            title="אפס קוד"
          >
            <RefreshCw size={16} />
          </button>
        </div>
      </div>
      
      <div className="space-y-3">
        <Button
          onClick={runCode}
          disabled={isRunning}
          className="w-full bg-green-600 hover:bg-green-700 text-white transition-colors disabled:opacity-50"
        >
          <Play size={16} className="mr-2" />
          הרץ קוד ויזואלי
        </Button>
        
        <div className="text-xs text-gray-600 bg-yellow-50 p-2 rounded-md">
          לחיצה על "הרץ קוד" תפתח את הקוד במערכת Python Tutor, שמאפשרת לראות בצורה ויזואלית איך הקוד רץ, צעד אחר צעד.
        </div>
      </div>
      
      <OutputDisplay output={output} />
    </div>
  );
};

export default PythonPlayground;
