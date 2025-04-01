
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
    <div className="flex justify-between items-center mb-4">
      <Button 
        onClick={saveAttendance}
        className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700"
        disabled={!unsavedChanges}
      >
        <Save size={16} className="ml-2" />
        שמור נוכחות
      </Button>
      
      <div className="space-x-2 flex gap-2">
        <Button 
          variant="outline" 
          onClick={markAllAbsent}
          className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white border-none"
        >
          <X size={16} className="ml-2" />
          סמן הכל כנעדרים
        </Button>
        <Button 
          variant="outline" 
          onClick={markAllPresent}
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white border-none"
        >
          <Check size={16} className="ml-2" />
          סמן הכל כנוכחים
        </Button>
      </div>
    </div>
  );
};

export default AttendanceActions;
