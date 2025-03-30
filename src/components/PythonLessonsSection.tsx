
import React, { useState } from "react";

const lessons = [
  {
    title: "היכרות עם פייתון",
    content: "מה זה פייתון? למה היא שפה כל כך פופולרית? נתנסה בהדפסת טקסטים עם הפקודה print()."
  },
  {
    title: "משתנים וסוגי מידע",
    content: "נלמד על משתנים, מספרים, מחרוזות ואיך לשמור מידע לזכרון. נתרגל עם פעולות חיבור ומניפולציה."
  },
  {
    title: "תנאים והחלטות",
    content: "איך לגרום לקוד שלנו לקבל החלטות עם if ו-else. ניצור משחק של תגובה על מספרים."
  },
  {
    title: "לולאות והפעלה חוזרת",
    content: "נכיר את while ו-for ונבנה לולאה שסופרת או חוזרת על פעולה שוב ושוב."
  }
];

const PythonLessonsSection: React.FC = () => {
  const [showLessons, setShowLessons] = useState(false);

  return (
    <div className="bg-yellow-50 rounded-xl p-6 shadow-md" dir="rtl">
      <button
        onClick={() => setShowLessons(!showLessons)}
        className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
      >
        {showLessons ? "סגור שיעורי פייתון" : "💻 שיעור פייתון - לחץ להתחלה"}
      </button>

      {showLessons && (
        <div className="mt-6 space-y-4">
          {lessons.map((lesson, index) => (
            <div key={index} className="bg-white p-4 rounded shadow">
              <h3 className="text-lg font-bold text-indigo-700 mb-2">{lesson.title}</h3>
              <p className="text-gray-800 leading-relaxed">{lesson.content}</p>
            </div>
          ))}

          <div className="bg-indigo-100 border-l-4 border-indigo-500 p-4 mt-6">
            <h4 className="font-bold text-indigo-700 mb-1">🎉 פרויקט סיום:</h4>
            <p>בנו תוכנית שמקבלת את שם המשתמש, שואלת שאלה ומגיבה בהתאם. לדוגמה: אם הילד כותב "אני אוהב פיצה" – התוכנית תענה "גם אני!" 🍕</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PythonLessonsSection;
