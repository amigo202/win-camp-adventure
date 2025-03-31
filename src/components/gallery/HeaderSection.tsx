
import React from 'react';
import { BookOpen } from 'lucide-react';
import { Button } from "@/components/ui/button";
import Header from '../Header';

interface HeaderSectionProps {
  showGuideLogin: () => void;
}

const HeaderSection: React.FC<HeaderSectionProps> = ({ showGuideLogin }) => {
  return (
    <div className="flex justify-between items-center">
      <Header showLogout={false} />
      <Button 
        variant="outline" 
        className="bg-orange-500 hover:bg-orange-600 text-white border-0"
        onClick={showGuideLogin}
      >
        <BookOpen className="ml-2" />
        כניסת מדריכים
      </Button>
    </div>
  );
};

export default HeaderSection;
