
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
    
    setTimeout(() => {
      const user = loginUser(username, password);
      
      if (user && (user.role === 'instructor' || user.role === 'admin')) {
        toast({
          title: "התחברת בהצלחה!",
          description: `ברוך הבא, ${user.displayName}!`,
        });
        
        if (user.role === 'admin') {
          navigate('/admin');
        }
      } else {
        toast({
          title: "התחברות נכשלה",
          description: "שם משתמש או סיסמה לא נכונים",
          variant: "destructive",
        });
      }
      
      setLoading(false);
    }, 800); // Simulate network request
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md" dir="rtl">
        <DialogHeader>
          <DialogTitle className="text-right">כניסת מדריכים</DialogTitle>
          <DialogDescription className="text-right">
            הזן שם משתמש וסיסמה כדי להיכנס לממשק המדריך
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="username" className="text-right block">שם משתמש</Label>
            <Input
              id="username"
              placeholder="WINCAMP100"
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
              placeholder="12345"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="text-right"
            />
          </div>
        </div>
        <div className="flex justify-end">
          <Button 
            onClick={handleGuideLogin} 
            disabled={loading} 
            className="bg-orange-500 hover:bg-orange-600 text-white border-0"
          >
            {loading ? "מתחבר..." : "התחבר"}
          </Button>
        </div>
        
        <div className="mt-4 text-sm text-gray-500 text-center">
          למדריכים: שם משתמש = WINCAMP100 או WINCAMP200, סיסמה = 12345
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LoginDialog;
