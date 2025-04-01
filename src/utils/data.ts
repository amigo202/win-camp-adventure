
export interface Tool {
  id: string;
  title: string;
  category: string;
  icon: string;
  link: string;
  description: string;
}

export interface Category {
  id: string;
  title: string;
  icon: string;
  color: string;
}

export const categories: Category[] = [
  {
    id: "programming",
    title: "תכנות וחשיבה מחשובית",
    icon: "💻",
    color: "blue"
  },
  {
    id: "ai",
    title: "בינה מלאכותית",
    icon: "🤖",
    color: "purple"
  },
  {
    id: "minecraft",
    title: "מיינקראפט",
    icon: "🎮",
    color: "green"
  },
  {
    id: "design",
    title: "עיצוב ויצירה",
    icon: "🎨",
    color: "pink"
  },
  {
    id: "challenge",
    title: "אתגר יומי",
    icon: "🧠",
    color: "orange"
  }
];

export const tools: Tool[] = [
  // Programming
  {
    id: "scratch",
    title: "תכנות בסקרץ'",
    category: "programming",
    icon: "🧩",
    link: "https://scratch.mit.edu",
    description: "סביבת תכנות חזותית המאפשרת ליצור משחקים ואנימציות באמצעות בלוקים צבעוניים"
  },
  {
    id: "scratchjr",
    title: "תכנות ב-Scratch Junior",
    category: "programming",
    icon: "🐱",
    link: "https://www.scratchjr.org/",
    description: "גרסה מותאמת לילדים צעירים יותר של סקרץ', מאפשרת ליצור סיפורים ומשחקים בממשק פשוט"
  },
  {
    id: "gamedev",
    title: "פיתוח משחקים",
    category: "programming",
    icon: "🎲",
    link: "https://arcade.makecode.com/",
    description: "יצירת משחקים דיגיטליים מגניבים בסביבה ידידותית לילדים"
  },
  {
    id: "webdev",
    title: "פיתוח אתרים",
    category: "programming",
    icon: "🌐",
    link: "https://code.org/",
    description: "למדו לבנות אתרי אינטרנט בצורה פשוטה וידידותית"
  },
  {
    id: "pythonturtle",
    title: "תכנות ב-python turtle",
    category: "programming",
    icon: "🐢",
    link: "https://www.pythonturtle.org/",
    description: "שרטוט וציור באמצעות תכנות בפייתון"
  },
  {
    id: "codestudio",
    title: "סטודיו קוד",
    category: "programming",
    icon: "📝",
    link: "https://code.org/studio",
    description: "סביבת לימוד תכנות לילדים עם משחקים מוכרים ודמויות אהובות"
  },
  {
    id: "blockly",
    title: "blockly code",
    category: "programming",
    icon: "🧱",
    link: "https://blockly.games",
    description: "סביבת תכנות חזותית מבוססת בלוקים"
  },
  
  // AI
  {
    id: "dalle",
    title: "יצירת תמונות עם בינה מלאכותית",
    category: "ai",
    icon: "🖼️",
    link: "https://www.bing.com/create",
    description: "צרו תמונות מדהימות באמצעות בינה מלאכותית"
  },
  {
    id: "aistories",
    title: "יצירת סיפורים עם AI",
    category: "ai",
    icon: "📚",
    link: "https://www.storyai.com/",
    description: "חברו סיפורים ייחודיים בעזרת בינה מלאכותית"
  },
  {
    id: "chatgpt",
    title: "שאלות תשובות עם רובוט",
    category: "ai",
    icon: "💬",
    link: "https://chat.openai.com/",
    description: "שוחחו עם בינה מלאכותית וקבלו תשובות לשאלות שלכם"
  },
  
  // Minecraft
  {
    id: "minecraftcode",
    title: "תכנות במיינקראפט",
    category: "minecraft",
    icon: "⛏️",
    link: "https://education.minecraft.net/",
    description: "למדו לתכנת בתוך עולם המיינקראפט"
  },
  {
    id: "minecraftenglish",
    title: "אנגלית עם מיינקראפט",
    category: "minecraft",
    icon: "🔤",
    link: "https://education.minecraft.net/",
    description: "למדו אנגלית דרך משחק המיינקראפט"
  },
  {
    id: "minecraftworlds",
    title: "בניית עולמות מיינקראפט",
    category: "minecraft",
    icon: "🏝️",
    link: "https://www.minecraft.net/",
    description: "צרו עולמות מדהימים במיינקראפט"
  },
  
  // Design
  {
    id: "canva",
    title: "עיצוב בקנבה",
    category: "design",
    icon: "🎭",
    link: "https://www.canva.com/",
    description: "כלי עיצוב גרפי פשוט לשימוש"
  },
  {
    id: "greetingcard",
    title: "עיצוב כרטיס ברכה",
    category: "design",
    icon: "🎁",
    link: "https://www.canva.com/cards/greeting-cards/",
    description: "צרו כרטיסי ברכה אישיים וצבעוניים"
  },
  {
    id: "logo",
    title: "בניית לוגו אישי",
    category: "design",
    icon: "🏷️",
    link: "https://www.canva.com/create/logos/",
    description: "עצבו לוגו אישי ייחודי"
  },
  {
    id: "aidrawing",
    title: "בינה מלאכותית ציורית",
    category: "design",
    icon: "🖌️",
    link: "https://www.autodraw.com/",
    description: "ציירו בעזרת בינה מלאכותית שמשפרת את הציורים שלכם"
  },
  {
    id: "escaperoom",
    title: "חדר בריחה ויזואלי",
    category: "design",
    icon: "🚪",
    link: "https://www.genial.ly/",
    description: "צרו חדרי בריחה דיגיטליים מגניבים"
  },
  {
    id: "uidesign",
    title: "עיצוב ממשקי משתמש",
    category: "design",
    icon: "📱",
    link: "https://www.figma.com/",
    description: "למדו לעצב ממשקים למשתמשים"
  },
  
  // Daily Challenge
  {
    id: "quiz",
    title: "חידון יומי",
    category: "challenge",
    icon: "❓",
    link: "https://quizizz.com/",
    description: "השתתפו בחידון יומי ובדקו את הידע שלכם"
  },
  {
    id: "puzzle",
    title: "משחקון קל",
    category: "challenge",
    icon: "🧩",
    link: "https://www.jigsawplanet.com/",
    description: "פתרו פאזלים ומשחקים קלים"
  },
  {
    id: "surprise",
    title: "הפתעה יומית",
    category: "challenge",
    icon: "🎉",
    link: "#",
    description: "גלו את ההפתעה היומית - בדיחה, טיפ או פרס מיוחד"
  },
  
  // Adding Hour of Code tool
  {
    id: "hourofcode",
    title: "שעת קוד",
    category: "programming",
    icon: "🧊",
    link: "https://www.hourofcode.co.il/activities",
    description: "פעילות מרגשת ללימוד תכנות ויצירתיות - שעת קוד"
  },
];

export const getToolsByCategory = (categoryId: string): Tool[] => {
  return tools.filter(tool => tool.category === categoryId);
};

export const getAllTools = (): Tool[] => {
  return tools;
};

export const getToolById = (id: string): Tool | undefined => {
  return tools.find(tool => tool.id === id);
};
