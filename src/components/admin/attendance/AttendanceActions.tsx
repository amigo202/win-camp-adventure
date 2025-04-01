
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
    <div className="flex justify-between items-center mb-4 bg-white/80 p-3 rounded-lg shadow-sm" dir="rtl">
      <div className="flex gap-2">
        <Button 
          variant="outline" 
          onClick={markAllPresent}
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white border-none shadow-md"
        >
          <Check size={16} className="text-white" />
          סמן הכל כנוכחים
        </Button>
        <Button 
          variant="outline" 
          onClick={markAllAbsent}
          className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white border-none shadow-md"
        >
          <X size={16} className="text-white" />
          סמן הכל כנעדרים
        </Button>
      </div>
      
      <Button 
        onClick={saveAttendance}
        className={`flex items-center gap-2 ${unsavedChanges 
          ? 'bg-indigo-600 hover:bg-indigo-700' 
          : 'bg-gray-400'} text-white rounded-lg shadow-md`}
        disabled={!unsavedChanges}
      >
        <Save size={16} className="text-white" />
        שמור נוכחות
      </Button>
    </div>
  );
};

export default AttendanceActions;
