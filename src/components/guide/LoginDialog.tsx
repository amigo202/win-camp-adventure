
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../utils/authUtils';
import { toast } from '../../components/ui/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface LoginDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const LoginDialog: React.FC<LoginDialogProps> = ({ open, onOpenChange }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  
  const handleGuideLogin = () => {
    setLoading(true);
    
    // Simulate network request with a slight delay
    setTimeout(() => {
      const user = loginUser(username, password);
      
      if (user && (user.role === 'instructor' || user.role === 'admin')) {
        toast({
          title: "התחברת בהצלחה!",
          description: `ברוך הבא, ${user.displayName}!`,
        });
        
        // Close the dialog first
        onOpenChange(false);
        
        // תמיד להפנות למסך הניהול
        navigate('/admin');
      } else {
        toast({
          title: "התחברות נכשלה",
          description: "שם משתמש או סיסמה לא נכונים. רק למדריכים ומנהלים.",
          variant: "destructive",
        });
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
            הזן שם משתמש וסיסמה כדי להיכנס לממשק המדריך
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="username" className="text-right block text-gray-800">שם משתמש</Label>
            <Input
              id="username"
              placeholder="WINCAMP100"
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
              placeholder="12345"
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
        </div>
        <div className="flex justify-end">
          <Button 
            onClick={handleGuideLogin} 
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
