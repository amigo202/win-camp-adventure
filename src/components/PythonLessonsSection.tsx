
import React, { useState } from "react";

const lessons = [
  {
    title: "היכרות עם פייתון",
    summary: "מה זה פייתון? למה היא שפה כל כך פופולרית? נתנסה בהדפסת טקסטים עם הפקודה print().",
    content: [
      {
        text: "פייתון היא שפת תכנות פשוטה, קלה ללמידה ופופולרית בעולם. היא נחשבת הכי קלה ללמידה עבור מתחילים וגם מומחים אוהבים להשתמש בה!",
        type: "paragraph"
      },
      {
        text: "הנה איך מדפיסים משפט בפייתון:",
        type: "paragraph"
      },
      {
        text: "print(\"שלום עולם!\")",
        type: "code"
      },
      {
        text: "נסו לשנות את הטקסט בתוך המרכאות והריצו שוב!",
        type: "paragraph"
      },
      {
        text: "אפשר להדפיס כמה דברים ברצף:",
        type: "paragraph"
      },
      {
        text: "print(\"שלום\", \"לכולם\", \"!\")",
        type: "code"
      }
    ]
  },
  {
    title: "משתנים וסוגי מידע",
    summary: "נלמד על משתנים, מספרים, מחרוזות ואיך לשמור מידע לזכרון. נתרגל עם פעולות חיבור ומניפולציה.",
    content: [
      {
        text: "משתנים עוזרים לנו לשמור מידע במהלך התוכנית. אפשר לדמיין אותם כמו קופסאות עם תוויות.",
        type: "paragraph"
      },
      {
        text: "שם = \"דניאל\"  # מחרוזת\nגיל = 10     # מספר שלם\nגובה = 1.45  # מספר עשרוני",
        type: "code"
      },
      {
        text: "אפשר לבצע פעולות על משתנים:",
        type: "paragraph"
      },
      {
        text: "# חיבור מספרים\nא = 5\nב = 3\nסכום = א + ב\nprint(\"הסכום הוא:\", סכום)  # יציג: הסכום הוא: 8",
        type: "code"
      },
      {
        text: "גם מחרוזות אפשר לחבר:",
        type: "paragraph"
      },
      {
        text: "שם_פרטי = \"יוסי\"\nשם_משפחה = \"כהן\"\nשם_מלא = שם_פרטי + \" \" + שם_משפחה\nprint(שם_מלא)  # יציג: יוסי כהן",
        type: "code"
      }
    ]
  },
  {
    title: "תנאים והחלטות",
    summary: "איך לגרום לקוד שלנו לקבל החלטות עם if ו-else. ניצור משחק של תגובה על מספרים.",
    content: [
      {
        text: "לפעמים התוכנית צריכה לקבל החלטות לפי תנאים מסוימים. לדוגמה, אם המספר גדול מ-10, הציגו הודעה מסוימת.",
        type: "paragraph"
      },
      {
        text: "מספר = 15\n\nif מספר > 10:\n    print(\"המספר גדול מעשר!\")\nelse:\n    print(\"המספר קטן או שווה לעשר.\")",
        type: "code"
      },
      {
        text: "אפשר גם לבדוק כמה תנאים ברצף:",
        type: "paragraph"
      },
      {
        text: "ציון = 85\n\nif ציון >= 90:\n    print(\"מצוין!\")\nelif ציון >= 80:\n    print(\"טוב מאוד!\")\nelif ציון >= 70:\n    print(\"טוב\")\nelse:\n    print(\"צריך להשתפר\")",
        type: "code"
      },
      {
        text: "בואו ניצור משחק קטן - נחשו את המספר:",
        type: "paragraph"
      },
      {
        text: "מספר_סודי = 7\nניחוש = int(input(\"נחשו מספר בין 1 ל-10: \"))\n\nif ניחוש == מספר_סודי:\n    print(\"כל הכבוד! ניחשתם נכון!\")\nelif ניחוש < מספר_סודי:\n    print(\"נמוך מדי...\")\nelse:\n    print(\"גבוה מדי...\")",
        type: "code"
      }
    ]
  },
  {
    title: "לולאות והפעלה חוזרת",
    summary: "נכיר את while ו-for ונבנה לולאה שסופרת או חוזרת על פעולה שוב ושוב.",
    content: [
      {
        text: "לולאות עוזרות לנו לחזור על פעולות מספר פעמים בלי לכתוב את אותו קוד שוב ושוב.",
        type: "paragraph"
      },
      {
        text: "# לולאת for שסופרת מ-1 עד 5\nfor מספר in range(1, 6):\n    print(מספר)",
        type: "code"
      },
      {
        text: "אפשר להשתמש בלולאות כדי לעבור על רשימות:",
        type: "paragraph"
      },
      {
        text: "חיות = [\"כלב\", \"חתול\", \"ארנב\", \"תוכי\"]\n\nfor חיה in חיות:\n    print(\"יש לי\", חיה, \"בבית\")",
        type: "code"
      },
      {
        text: "לולאת while ממשיכה כל עוד תנאי מסוים מתקיים:",
        type: "paragraph"
      },
      {
        text: "מונה = 1\n\nwhile מונה <= 5:\n    print(\"מספר\", מונה)\n    מונה = מונה + 1",
        type: "code"
      },
      {
        text: "דוגמה למשחק ניחושים עם לולאת while:",
        type: "paragraph"
      },
      {
        text: "import random\n\nמספר_סודי = random.randint(1, 20)\nניחוש = 0\nנסיונות = 0\n\nwhile ניחוש != מספר_סודי and נסיונות < 5:\n    ניחוש = int(input(\"נחשו מספר בין 1 ל-20: \"))\n    נסיונות = נסיונות + 1\n    \n    if ניחוש < מספר_סודי:\n        print(\"נמוך מדי!\")\n    elif ניחוש > מספר_סודי:\n        print(\"גבוה מדי!\")\n    else:\n        print(\"כל הכבוד! ניחשתם נכון ב-\", נסיונות, \"ניסיונות!\")\n\nif ניחוש != מספר_סודי:\n    print(\"המספר הסודי היה\", מספר_סודי)",
        type: "code"
      }
    ]
  }
];

const PythonLessonsSection: React.FC = () => {
  const [showLessons, setShowLessons] = useState(false);
  const [expandedLesson, setExpandedLesson] = useState<number | null>(null);

  const toggleLesson = (index: number) => {
    if (expandedLesson === index) {
      setExpandedLesson(null);
    } else {
      setExpandedLesson(index);
    }
  };

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
              <div 
                className="flex justify-between items-center cursor-pointer" 
                onClick={() => toggleLesson(index)}
              >
                <h3 className="text-lg font-bold text-indigo-700">{lesson.title}</h3>
                <span className="text-indigo-700">
                  {expandedLesson === index ? "▲" : "▼"}
                </span>
              </div>
              
              <p className="text-gray-800 mt-2 leading-relaxed">{lesson.summary}</p>
              
              {expandedLesson === index && (
                <div className="mt-4 border-t pt-4 space-y-3">
                  {lesson.content.map((item, itemIndex) => (
                    <div key={itemIndex}>
                      {item.type === "paragraph" ? (
                        <p className="text-gray-800 mb-2">{item.text}</p>
                      ) : (
                        <pre className="bg-gray-100 p-3 rounded font-mono text-sm overflow-x-auto whitespace-pre-wrap">
                          {item.text}
                        </pre>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}

          <div className="bg-indigo-100 border-r-4 border-indigo-500 p-4 mt-6">
            <h4 className="font-bold text-indigo-700 mb-1">🎉 פרויקט סיום:</h4>
            <p className="mb-2">בנו תוכנית שמקבלת את שם המשתמש, שואלת שאלה ומגיבה בהתאם.</p>
            <pre className="bg-white p-3 rounded font-mono text-sm overflow-x-auto">
# פרוייקט לדוגמה - רובוט שיחה פשוט
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

print("תודה ששוחחת איתי", שם + "! להתראות!")
</pre>
          </div>
        </div>
      )}
    </div>
  );
};

export default PythonLessonsSection;
