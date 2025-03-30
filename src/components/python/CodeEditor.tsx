
import React from "react";
import { Textarea } from "../ui/textarea";

interface CodeEditorProps {
  code: string;
  onChange: (newCode: string) => void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ code, onChange }) => {
  return (
    <div className="relative">
      <Textarea
        value={code}
        onChange={(e) => onChange(e.target.value)}
        className="font-mono text-sm min-h-[200px] bg-gray-50 border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm ltr-text resize-y"
        dir="ltr"
        placeholder="# כתבו את הקוד שלכם כאן"
        spellCheck="false"
        aria-label="עורך קוד פייתון"
      />
    </div>
  );
};

export default CodeEditor;
