
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser, isLoggedIn, isAdmin, isGuide } from '../utils/authUtils';
import { toast } from '../components/ui/use-toast';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import StarsBackground from '../components/StarsBackground';
import Header from '../components/Header';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    setTimeout(() => {
      const user = loginUser(username, password);
      
      if (user) {
        toast({
          title: "התחברת בהצלחה!",
          description: `ברוך הבא, ${user.displayName}!`,
        });
        
        // Redirect based on user role - always send instructors to admin panel, not Python course
        if (user.role === 'admin' || user.role === 'instructor') {
          navigate('/admin');
        } else {
          navigate('/');
        }
      } else {
        toast({
          title: "התחברות נכשלה",
          description: "שם משתמש או סיסמה לא נכונים",
          variant: "destructive",
        });
        setLoading(false);
      }
    }, 800);
  };
  
  return (
    <div className="min-h-screen py-6 px-4 md:px-8 relative bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50" dir="rtl">
      <StarsBackground />
      
      <div className="max-w-md mx-auto p-6 md:p-10 space-y-6">
        <Header showLogout={false} />
        
        <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg p-8 mb-8 animate-slide-in-bottom">
          <h1 className="text-3xl font-bold mb-6 text-center">כניסה ל-WIN CAMP</h1>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-right block">שם משתמש</Label>
              <Input
                id="username"
                placeholder="הזן שם משתמש"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="text-right"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password" className="text-right block">סיסמה</Label>
              <Input
                id="password"
                type="password"
                placeholder="הזן סיסמה"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="text-right"
              />
            </div>
            
            <Button 
              type="submit" 
              disabled={loading} 
              className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl shadow-md transition-all hover:scale-105"
            >
              {loading ? "מתחבר..." : "התחבר"}
            </Button>
          </form>
          
          <div className="mt-6 text-sm text-gray-500 space-y-2">
            <p>משתמשים לדוגמה:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>מנהל: WINCAMP / 12345</li>
              <li>מדריכים: WINCAMP100 או WINCAMP200 / 12345</li>
              <li>תלמיד: STUDENT1 / 12345</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
