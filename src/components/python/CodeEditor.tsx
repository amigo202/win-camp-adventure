
import React from "react";
import { Textarea } from "../ui/textarea";

interface CodeEditorProps {
  code: string;
  onChange: (newCode: string) => void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ code, onChange }) => {
  return (
    <div className="mb-2">
      <Textarea
        value={code}
        onChange={(e) => onChange(e.target.value)}
        className="font-mono text-sm h-[150px] bg-gray-50 ltr-text"
        dir="ltr"
        placeholder="# כתבו את הקוד שלכם כאן"
      />
    </div>
  );
};

export default CodeEditor;
