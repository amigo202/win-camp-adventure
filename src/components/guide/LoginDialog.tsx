
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser, isGuideLoginSaved, getSavedGuideLogin } from '../../utils/authUtils';
import { toast } from '../../components/ui/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

interface LoginDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const LoginDialog: React.FC<LoginDialogProps> = ({ open, onOpenChange }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  
  // Check for saved credentials when the dialog opens
  useEffect(() => {
    if (open && isGuideLoginSaved()) {
      const savedCredentials = getSavedGuideLogin();
      if (savedCredentials) {
        setUsername(savedCredentials.username);
        setPassword(savedCredentials.password);
        // Auto login if credentials are saved
        handleGuideLogin(true);
      }
    }
  }, [open]);
  
  const handleGuideLogin = (isAutoLogin = false) => {
    if (!isAutoLogin) {
      setLoading(true);
    }
    
    // Simulate network request with a slight delay
    setTimeout(() => {
      const user = loginUser(username, password, rememberMe);
      
      if (user && (user.role === 'instructor' || user.role === 'admin')) {
        toast({
          title: "התחברת בהצלחה!",
          description: `ברוך הבא, ${user.displayName}!`,
        });
        
        // Close the dialog first
        onOpenChange(false);
        
        // תמיד להפנות למסך הניהול
        navigate('/admin');
      } else if (!isAutoLogin) {
        // Only show error if not auto-login attempt
        toast({
          title: "התחברות נכשלה",
          description: "שם משתמש או סיסמה לא נכונים. רק למדריכים ומנהלים.",
          variant: "destructive",
        });
        setLoading(false);
      } else {
        // Auto-login failed silently
        setLoading(false);
      }
    }, 800);
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md" dir="rtl">
        <DialogHeader>
          <DialogTitle className="text-right">כניסת מדריכים</DialogTitle>
          <DialogDescription className="text-right text-gray-700">
            הזן שם משתמש וסיסמה כדי להיכנס לממשק הניהול
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="username" className="text-right block text-gray-800">שם משתמש</Label>
            <Input
              id="username"
              placeholder="הכנס שם משתמש"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="text-right"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="text-right block text-gray-800">סיסמה</Label>
            <Input
              id="password"
              type="password"
              placeholder="הכנס סיסמה"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="text-right"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleGuideLogin();
                }
              }}
            />
          </div>
          <div className="flex items-center space-x-2 space-x-reverse">
            <Checkbox 
              id="remember-me" 
              checked={rememberMe} 
              onCheckedChange={(checked) => setRememberMe(checked as boolean)}
            />
            <Label htmlFor="remember-me" className="text-right cursor-pointer text-gray-800">
              זכור אותי
            </Label>
          </div>
        </div>
        <div className="flex justify-end">
          <Button 
            onClick={() => handleGuideLogin()} 
            disabled={loading} 
            className="bg-orange-500 hover:bg-orange-600 text-white border-0 rounded-xl hover:scale-105 transition-all"
          >
            {loading ? "מתחבר..." : "התחבר"}
          </Button>
        </div>
        
        <div className="mt-4 text-sm text-gray-700 text-center">
          למדריכים: שם משתמש = WINCAMP100 או WINCAMP200, סיסמה = 12345
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LoginDialog;
