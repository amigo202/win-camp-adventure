
import React from 'react';
import { Button } from "@/components/ui/button";
import { Check, X, Save } from 'lucide-react';

interface AttendanceActionsProps {
  saveAttendance: () => void;
  markAllPresent: () => void;
  markAllAbsent: () => void;
  unsavedChanges: boolean;
}

const AttendanceActions: React.FC<AttendanceActionsProps> = ({
  saveAttendance,
  markAllPresent,
  markAllAbsent,
  unsavedChanges
}) => {
  return (
    <div className="flex justify-between items-center mb-4" dir="rtl">
      <div className="flex gap-2">
        <Button 
          variant="outline" 
          onClick={markAllPresent}
          className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white border-none shadow-sm"
        >
          <Check size={16} />
          סמן הכל כנוכחים
        </Button>
        <Button 
          variant="outline" 
          onClick={markAllAbsent}
          className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white border-none shadow-sm"
        >
          <X size={16} />
          סמן הכל כנעדרים
        </Button>
      </div>
      
      <Button 
        onClick={saveAttendance}
        className="flex items-center gap-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg shadow-sm"
        disabled={!unsavedChanges}
      >
        <Save size={16} />
        שמור נוכחות
      </Button>
    </div>
  );
};

export default AttendanceActions;
