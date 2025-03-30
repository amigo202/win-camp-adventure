
import React from "react";

interface FinalProjectProps {
  onTryCode: (code: string) => void;
}

const finalProjectCode = `# פרוייקט לדוגמה - רובוט שיחה פשוט
שם = input("שלום! איך קוראים לך? ")
print("נעים להכיר,", שם + "!")

תחביב = input("מה אתה אוהב לעשות? ")

if "משחק" in תחביב or "משחקים" in תחביב:
    print("גם אני אוהב לשחק משחקים!")
elif "ספורט" in תחביב:
    print("ספורט זה בריא ומהנה!")
elif "קריאה" in תחביב or "לקרוא" in תחביב:
    print("ספרים פותחים לנו עולמות חדשים!")
else:
    print(תחביב, "זה באמת תחביב מעניין!")

print("תודה ששוחחת איתי", שם + "! להתראות!")`;

const FinalProject: React.FC<FinalProjectProps> = ({ onTryCode }) => {
  return (
    <div className="bg-indigo-100 border-r-4 border-indigo-500 p-4 mt-6">
      <h4 className="font-bold text-indigo-700 mb-1">🎉 פרויקט סיום:</h4>
      <p className="mb-2">בנו תוכנית שמקבלת את שם המשתמש, שואלת שאלה ומגיבה בהתאם.</p>
      <pre className="bg-white p-3 rounded font-mono text-sm overflow-x-auto">
        {finalProjectCode}
      </pre>
      <button 
        onClick={() => onTryCode(finalProjectCode)}
        className="mt-2 text-sm bg-indigo-500 hover:bg-indigo-600 text-white px-3 py-1 rounded transition-colors"
      >
        נסו את הפרויקט הזה
      </button>
    </div>
  );
};

export default FinalProject;
