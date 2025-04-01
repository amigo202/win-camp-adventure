
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Sparkles, BookOpenCheck, Clock, Shield, Megaphone, GraduationCap, Heart } from 'lucide-react';

const InstructorGuidelines: React.FC = () => {
  return (
    <div className="space-y-6 py-2" dir="rtl">
      <div className="flex items-center gap-3 mb-6 bg-gradient-to-r from-indigo-100 to-indigo-200 p-4 rounded-xl shadow-sm">
        <BookOpenCheck className="text-wincamp-orange" size={30} />
        <h2 className="text-2xl font-bold text-indigo-900">מדריכים יקרים</h2>
      </div>

      <p className="text-gray-800 mb-6 bg-white/90 p-4 rounded-lg shadow-sm leading-relaxed border border-indigo-100">
        כדי להבטיח קייטנה מקצועית, מהנה ומעשירה – חשוב להקפיד על הכללים הבאים לאורך כל התקופה:
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <GuidelineCard 
          icon={<Clock className="h-6 w-6 text-wincamp-turquoise" />} 
          title="נוכחות והתארגנות"
          items={[
            "הגעה בזמן – להגיע לפחות 15 דקות לפני תחילת הפעילות.",
            "בדיקת נוכחות – לוודא שכל הילדים במקום ובקבוצה הנכונה."
          ]}
        />
        
        <GuidelineCard 
          icon={<Shield className="h-6 w-6 text-wincamp-green" />} 
          title="בטיחות ואחריות"
          items={[
            "בטיחות – להסביר נהלי בטיחות ברורים.",
            "השגחה בהפסקות – להיות תמיד בקרבת הילדים ולעודד פעילות גופנית.",
            "תחזוקת ציוד – לבדוק שהציוד תקין ולדווח על בעיות.",
            "ניקיון – לשמור על כיתה מסודרת ולעודד את הילדים לנקות אחריהם."
          ]}
        />
        
        <GuidelineCard 
          icon={<Megaphone className="h-6 w-6 text-wincamp-pink" />} 
          title="תקשורת והתנהלות"
          items={[
            "שפה ברורה – להסביר בצורה מותאמת לילדים ולעודד שאלות.",
            "כבוד והכלה – להשרות אווירה נעימה, מעודדת ושיתופית.",
            "תקשורת עם ההורים – לשתף בעדכונים וחוויות בסיום כל יום.",
            "ניהול זמן – לפעול לפי הלו\"ז ולהשאיר זמן לתרגול."
          ]}
        />
        
        <GuidelineCard 
          icon={<GraduationCap className="h-6 w-6 text-wincamp-purple" />} 
          title="למידה והדרכה"
          items={[
            "הדרכה מקצועית – להכיר את הכלים ולהתכונן מראש.",
            "למידה מבוססת פרויקטים – כל פעילות צריכה להוביל ליצירה ממשית.",
            "משוב אישי – לתת חיזוקים ומשוב בונה.",
            "תשומת לב אישית – לזהות צרכים ולהתאים לכל ילד.",
            "למידה מתמשכת – לשאוף לצמיחה והתמקצעות."
          ]}
        />
        
        <GuidelineCard 
          icon={<Heart className="h-6 w-6 text-red-500" />} 
          title="אווירה וערכים"
          items={[
            "חיזוק חיובי – לפרגן, לעודד ולהתלהב יחד עם הילדים.",
            "יצירתיות ופתרון בעיות – להוביל תהליכים שמעודדים חשיבה יצירתית.",
            "עבודת צוות – לעודד שיתוף פעולה בין הילדים.",
            "כיף ומעורבות – ליצור חוויה עם אתגרים מרתקים ופעילויות מגוונות.",
            "יוזמה והגדלת ראש – לשאול, להתייעץ, ליזום ולהיות מעורבים."
          ]}
        />
      </div>
      
      <div className="text-center mt-8 bg-gradient-to-r from-indigo-100 to-indigo-200 p-6 rounded-xl shadow-sm border border-indigo-200">
        <p className="text-wincamp-orange font-bold text-lg flex items-center justify-center gap-2">
          <Sparkles className="h-5 w-5" />
          בואו ניצור יחד קייטנה בלתי נשכחת!
        </p>
        <p className="text-gray-800 mt-2">
          תודה רבה על המחויבות והעשייה,<br />
          <span className="font-bold text-indigo-800">אמיתי</span> 🙌
        </p>
      </div>
    </div>
  );
};

interface GuidelineCardProps {
  icon: React.ReactNode;
  title: string;
  items: string[];
}

const GuidelineCard: React.FC<GuidelineCardProps> = ({ icon, title, items }) => {
  return (
    <Card className="bg-white/90 backdrop-blur-sm border-slate-200 shadow-md overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1">
      <CardHeader className="pb-2 bg-gradient-to-r from-indigo-50 to-indigo-100 border-b border-indigo-100">
        <CardTitle className="flex items-center gap-2 text-indigo-900">
          {icon}
          <span className="text-lg">{title}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-3">
        <ul className="list-disc pr-5 space-y-1 text-gray-800">
          {items.map((item, index) => (
            <li key={index} className="leading-relaxed">{item}</li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default InstructorGuidelines;
