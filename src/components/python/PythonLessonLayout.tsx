
import React from 'react';

interface PythonLessonLayoutProps {
  children: React.ReactNode;
}

const PythonLessonLayout: React.FC<PythonLessonLayoutProps> = ({ children }) => {
  return (
    <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 bg-gradient-to-b from-yellow-50 to-white rounded-xl shadow-md" dir="rtl">
      <div className="lg:col-span-7 space-y-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-yellow-100">
          <h2 className="text-2xl font-bold text-indigo-700 mb-6 border-b pb-3 border-yellow-100">שיעורים</h2>
          {React.Children.toArray(children)[0]}
        </div>
      </div>
      <div className="lg:col-span-5 space-y-6">
        <div className="sticky top-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-yellow-100">
            <h2 className="text-2xl font-bold text-indigo-700 mb-4 border-b pb-3 border-yellow-100">סביבת קוד</h2>
            {React.Children.toArray(children)[1]}
          </div>
          <div className="mt-6 p-4 bg-indigo-50 rounded-xl border border-indigo-100 shadow-sm">
            <h3 className="font-bold text-indigo-700 mb-2">טיפים ללמידה:</h3>
            <ul className="list-disc list-inside space-y-2 text-sm text-indigo-900">
              <li>נסו לשנות את הקוד ולראות מה קורה</li>
              <li>התנסו עם ערכים שונים במשתנים</li>
              <li>אם יש שגיאה, קראו את ההודעה ונסו להבין את הבעיה</li>
              <li>תוכלו להעתיק את הקוד בלחיצה על כפתור ההעתקה</li>
              <li>ניתן לאפס את הקוד למצב ההתחלתי בכל עת</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PythonLessonLayout;
