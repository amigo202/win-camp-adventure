
import { Tool } from '../types/tools';

export const challengeTools: Tool[] = [
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
  }
];
