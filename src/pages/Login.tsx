
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser, isLoggedIn } from '../utils/authUtils';
import { toast } from '../components/ui/use-toast';
import StarsBackground from '../components/StarsBackground';
import { Button } from '../components/ui/button';
import { LogIn, ChevronDown, Users, BookOpen } from 'lucide-react';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showGuideInfo, setShowGuideInfo] = useState(false);
  const [showStudentInfo, setShowStudentInfo] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (isLoggedIn()) {
      navigate('/dashboard');
    }
  }, [navigate]);
  
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    setTimeout(() => {
      const user = loginUser(username, password);
      
      if (user) {
        toast({
          title: "התחברת בהצלחה!",
          description: `ברוך הבא, ${user.displayName}! מוכנים להרפתקה?`,
        });
        navigate('/dashboard');
      } else {
        toast({
          title: "התחברות נכשלה",
          description: "שם משתמש או סיסמה לא נכונים. נסו שוב!",
          variant: "destructive",
        });
      }
      
      setLoading(false);
    }, 800); // Simulate network request
  };

  const setStudentLogin = (studentId: string) => {
    setUsername('STUDENT' + studentId);
    setPassword('12345');
  };

  const setGuideLogin = (guideNumber: number) => {
    if (guideNumber === 1) {
      setUsername('WINCAMP100');
      setPassword('12345');
    } else if (guideNumber === 2) {
      setUsername('WINCAMP200');
      setPassword('12345');
    }
  };
  
  return (
    <div className="min-h-screen py-10 px-4 relative overflow-hidden bg-gradient-to-b from-indigo-600 to-indigo-800" dir="rtl">
      <StarsBackground />
      
      <div className="max-w-md mx-auto flex flex-col items-center justify-center h-full pt-10">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">ברוכים הבאים -</h1>
          <h1 className="text-7xl font-bold text-white mb-6">WIN CAMP</h1>
          <p className="text-xl text-white mb-10">עולם של תכנות, יצירה מאוכנת וכיף</p>
        </div>
        
        <div className="glass-card bg-blue-200/70 rounded-xl p-8 shadow-xl w-full max-w-md mb-6">
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-right text-xl font-medium mb-2 text-indigo-900">
                שם משתמש
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-3 rounded-lg border border-blue-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-blue-100/80 text-right"
                placeholder="STUDENT1"
                required
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-right text-xl font-medium mb-2 text-indigo-900">
                סיסמה
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 rounded-lg border border-blue-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-blue-100/80 text-right"
                placeholder="12345"
                required
              />
            </div>
            
            {/* Student login section as primary */}
            <div className="space-y-4">
              <div className="text-center text-indigo-900 font-medium">בחירת תלמיד מהירה</div>
              <div className="flex justify-center gap-2 flex-wrap">
                {[1, 2, 3, 4, 5].map(num => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setStudentLogin(num.toString())}
                    className="bg-teal-500 hover:bg-teal-600 text-white px-5 py-2 rounded-lg text-lg flex items-center gap-2"
                  >
                    <Users size={16} />
                    תלמיד {num}
                  </button>
                ))}
              </div>
            </div>
            
            <button
              type="submit"
              className="w-full bg-orange-400 hover:bg-orange-500 text-white text-xl font-bold py-3 px-4 rounded-xl transition-colors flex items-center justify-center gap-2"
              disabled={loading}
            >
              <LogIn size={20} />
              התחברות
            </button>

            {/* Guide login section at the bottom */}
            <div className="mt-6 border-t border-indigo-200 pt-4">
              <div className="text-center text-sm text-indigo-700 mb-3">כניסה למדריכים</div>
              <div className="flex gap-2 justify-center">
                <button
                  type="button"
                  onClick={() => setGuideLogin(1)}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-2 rounded-lg text-sm flex items-center gap-1"
                >
                  <BookOpen size={14} />
                  מדריך 1
                </button>
                
                <button
                  type="button"
                  onClick={() => setGuideLogin(2)}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-2 rounded-lg text-sm flex items-center gap-1"
                >
                  <BookOpen size={14} />
                  מדריך 2
                </button>
              </div>
            </div>
          </form>
          
          <div className="mt-4 text-center">
            <a href="#" className="text-indigo-700 hover:text-indigo-900 transition-colors text-sm">
              שכחת סיסמה?
            </a>
          </div>
        </div>
        
        <div className="relative">
          {/* Robot image */}
          <img 
            src="/lovable-uploads/b999c532-4bb1-4c27-8bde-3e5fed1926d5.png" 
            alt="Robot mascot" 
            className="h-40 object-contain absolute bottom-0 right-0 translate-x-20"
          />
          {/* Rocket image */}
          <div className="absolute bottom-20 left-0 -translate-x-20">
            <svg width="50" height="50" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4.5 16.5L3 20L6.5 18.5" stroke="#FF5733" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M19.5 16.5L21 20L17.5 18.5" stroke="#FF5733" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 15L12 21" stroke="#FF5733" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M4.5 12H19.5L17 3L12 7L7 3L4.5 12Z" fill="#FF7043" stroke="#FF5733" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-6 left-0 right-0 text-center text-blue-200 text-sm">
        WIN CAMP &copy; {new Date().getFullYear()} | עולם של הרפתקאות טכנולוגיות
      </div>
    </div>
  );
};

export default Login;
