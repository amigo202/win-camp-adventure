
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser, isLoggedIn } from '../utils/authUtils';
import { toast } from '../components/ui/use-toast';
import Header from '../components/Header';
import StarsBackground from '../components/StarsBackground';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
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
  
  return (
    <div className="min-h-screen py-10 px-4 relative overflow-hidden" dir="rtl">
      <StarsBackground />
      
      <div className="max-w-md mx-auto">
        <Header showLogout={false} />
        
        <div className="glass-card rounded-xl p-8 shadow-xl animate-float">
          <h1 className="text-2xl font-bold text-center mb-6 text-wincamp-purple">
            ברוכים הבאים ל-WIN CAMP
          </h1>
          
          <p className="text-center mb-8 text-gray-600">
            עולם של תכנות, יצירה, בינה מלאכותית וכיף!
          </p>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm font-medium mb-1">
                שם משתמש
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-wincamp-purple/50"
                placeholder="WINCAMP"
                required
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-1">
                סיסמה
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-wincamp-purple/50"
                placeholder="12345"
                required
              />
            </div>
            
            <button
              type="submit"
              className="w-full btn-primary py-3 text-lg"
              disabled={loading}
            >
              {loading ? "רק רגע..." : "התחבר"}
            </button>
          </form>
          
          <div className="mt-4 text-center">
            <a href="#" className="text-sm text-wincamp-blue hover:text-wincamp-purple transition-colors">
              שכחת סיסמה?
            </a>
          </div>
          
          <div className="mt-8 text-center text-xs text-gray-500">
            רמז: נסו שם משתמש WINCAMP וסיסמה 12345
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-6 left-0 right-0 text-center text-gray-500 text-sm">
        WIN CAMP &copy; {new Date().getFullYear()} | עולם של הרפתקאות טכנולוגיות
      </div>
    </div>
  );
};

export default Login;
