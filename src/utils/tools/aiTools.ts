
import { Tool } from '../types/tools';

export const aiTools: Tool[] = [
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
  }
];
