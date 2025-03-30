
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser, isLoggedIn } from '../utils/authUtils';
import { toast } from '../components/ui/use-toast';
import StarsBackground from '../components/StarsBackground';
import LoginHeader from '../components/login/LoginHeader';
import LoginForm from '../components/login/LoginForm';
import LoginDecorations from '../components/login/LoginDecorations';

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
        <LoginHeader />
        
        <div className="glass-card bg-blue-200/70 rounded-xl p-8 shadow-xl w-full max-w-md mb-6">
          <LoginForm 
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
            loading={loading}
            handleLogin={handleLogin}
            setStudentLogin={setStudentLogin}
            setGuideLogin={setGuideLogin}
          />
        </div>
        
        <LoginDecorations />
      </div>
      
      <div className="absolute bottom-6 left-0 right-0 text-center text-blue-200 text-sm">
        WIN CAMP &copy; {new Date().getFullYear()} | עולם של הרפתקאות טכנולוגיות
      </div>
    </div>
  );
};

export default Login;
