
import React from 'react';
import { LogIn } from 'lucide-react';
import GuideLoginSection from './GuideLoginSection';

interface LoginFormProps {
  username: string;
  setUsername: (username: string) => void;
  password: string;
  setPassword: (password: string) => void;
  loading: boolean;
  handleLogin: (e: React.FormEvent) => void;
  setStudentLogin: (studentId: string) => void;
  setGuideLogin: (guideNumber: number) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({
  username,
  setUsername,
  password,
  setPassword,
  loading,
  handleLogin,
  setGuideLogin
}) => {
  return (
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
      
      <button
        type="submit"
        className="w-full bg-orange-400 hover:bg-orange-500 text-white text-xl font-bold py-3 px-4 rounded-xl transition-colors flex items-center justify-center gap-2"
        disabled={loading}
      >
        <LogIn size={20} />
        התחברות
      </button>

      {/* Guide login section */}
      <GuideLoginSection setGuideLogin={setGuideLogin} />
      
      <div className="mt-4 text-center">
        <a href="#" className="text-indigo-700 hover:text-indigo-900 transition-colors text-sm">
          שכחת סיסמה?
        </a>
      </div>
    </form>
  );
};

export default LoginForm;
