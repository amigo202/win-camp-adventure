
import { LessonData } from "./LessonItem";

export const lessons: LessonData[] = [
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
    ],
    sampleCode: "# בואו ננסה להדפיס משהו\nprint(\"שלום עולם!\")\n\n# נסו לשנות את הטקסט כאן:\nprint(\"אני לומד פייתון!\")"
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
    ],
    sampleCode: "# שמירת שם וגיל\nname = \"דניאל\"\nage = 10\n\n# הדפסת מידע\nprint(\"שם:\", name)\nprint(\"גיל:\", age)\n\n# נסו לשנות את השם והגיל"
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
    ],
    sampleCode: "# בדיקת גילאים\nage = 18\n\nif age >= 18:\n    print(\"אתה בגיר, מותר לך להצביע.\")\nelse:\n    print(\"אתה עדיין צעיר מכדי להצביע.\")\n\n# נסו לשנות את הגיל"
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
    ],
    sampleCode: "# הדפסת רשימת מספרים\nnumbers = [1, 2, 3, 4, 5]\n\nfor num in numbers:\n    print(num)\n\n# נסו לשנות את הרשימה"
  }
];
