
import React from 'react';
import { Button } from "@/components/ui/button";

interface UnsavedChangesAlertProps {
  saveAttendance: () => void;
  show: boolean;
}

const UnsavedChangesAlert: React.FC<UnsavedChangesAlertProps> = ({ saveAttendance, show }) => {
  if (!show) return null;
  
  return (
    <div className="fixed bottom-4 left-4 right-4 bg-yellow-500 text-black p-4 rounded-md shadow-lg max-w-xl mx-auto flex justify-between items-center">
      <Button 
        onClick={saveAttendance}
        variant="secondary"
        className="bg-black text-white hover:bg-gray-800"
      >
        שמור עכשיו
      </Button>
      <p>יש לך שינויים שלא נשמרו!</p>
    </div>
  );
};

export default UnsavedChangesAlert;
