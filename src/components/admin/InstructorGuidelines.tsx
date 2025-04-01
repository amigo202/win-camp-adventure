
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Sparkles, BookOpenCheck, Clock, Shield, Megaphone, GraduationCap, Heart } from 'lucide-react';

const InstructorGuidelines: React.FC = () => {
  return (
    <div className="space-y-6 py-2">
      <div className="flex items-center gap-3 mb-4 justify-end">
        <h2 className="text-2xl font-bold text-white">מדריכים יקרים</h2>
        <BookOpenCheck className="text-wincamp-orange" size={30} />
      </div>

      <p className="text-white/90 mb-6 text-right">
        כדי להבטיח קייטנה מקצועית, מהנה ומעשירה – חשוב להקפיד על הכללים הבאים לאורך כל התקופה:
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <GuidelineCard 
          icon={<Clock className="h-6 w-6 text-wincamp-orange" />} 
          title="נוכחות והתארגנות"
          items={[
            "הגעה בזמן – להגיע לפחות 15 דקות לפני תחילת הפעילות.",
            "בדיקת נוכחות – לוודא שכל הילדים במקום ובקבוצה הנכונה."
          ]}
        />
        
        <GuidelineCard 
          icon={<Shield className="h-6 w-6 text-wincamp-orange" />} 
          title="בטיחות ואחריות"
          items={[
            "בטיחות – להסביר נהלי בטיחות ברורים.",
            "השגחה בהפסקות – להיות תמיד בקרבת הילדים ולעודד פעילות גופנית.",
            "תחזוקת ציוד – לבדוק שהציוד תקין ולדווח על בעיות.",
            "ניקיון – לשמור על כיתה מסודרת ולעודד את הילדים לנקות אחריהם."
          ]}
        />
        
        <GuidelineCard 
          icon={<Megaphone className="h-6 w-6 text-wincamp-orange" />} 
          title="תקשורת והתנהלות"
          items={[
            "שפה ברורה – להסביר בצורה מותאמת לילדים ולעודד שאלות.",
            "כבוד והכלה – להשרות אווירה נעימה, מעודדת ושיתופית.",
            "תקשורת עם ההורים – לשתף בעדכונים וחוויות בסיום כל יום.",
            "ניהול זמן – לפעול לפי הלו\"ז ולהשאיר זמן לתרגול."
          ]}
        />
        
        <GuidelineCard 
          icon={<GraduationCap className="h-6 w-6 text-wincamp-orange" />} 
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
          icon={<Heart className="h-6 w-6 text-wincamp-orange" />} 
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
      
      <div className="text-center mt-8">
        <p className="text-wincamp-yellow font-bold text-lg flex items-center justify-center gap-2">
          <Sparkles className="h-5 w-5" />
          בואו ניצור יחד קייטנה בלתי נשכחת!
        </p>
        <p className="text-white/90 mt-2">
          תודה רבה על המחויבות והעשייה,<br />
          <span className="font-bold">אמיתי</span> 🙌
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
    <Card className="bg-indigo-600/50 border-indigo-500/50 shadow-lg overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-white justify-end">
          {title}
          {icon}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="list-disc pr-5 text-right text-white/90 space-y-1">
          {items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default InstructorGuidelines;
