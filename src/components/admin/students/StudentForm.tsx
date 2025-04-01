
import React from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus } from 'lucide-react';
import { toast } from "sonner";
import { Student } from '@/types/student';

interface StudentFormProps {
  newStudent: Omit<Student, 'id' | 'attendanceDays' | 'completedTools' | 'lastActive'>;
  setNewStudent: React.Dispatch<React.SetStateAction<Omit<Student, 'id' | 'attendanceDays' | 'completedTools' | 'lastActive'>>>;
  handleAddStudent: () => void;
}

const StudentForm: React.FC<StudentFormProps> = ({ newStudent, setNewStudent, handleAddStudent }) => {
  return (
    <div className="bg-indigo-700/30 p-4 rounded-lg backdrop-blur-sm border border-indigo-600/50">
      <h3 className="text-xl mb-4 text-white font-bold text-right">הוספת תלמיד</h3>
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
        <div className="md:col-span-2">
          <Input 
            placeholder="שם התלמיד" 
            value={newStudent.name} 
            onChange={(e) => setNewStudent({...newStudent, name: e.target.value})}
            className="bg-indigo-600/30 text-white placeholder:text-indigo-300 border-indigo-500/50 focus-visible:ring-offset-indigo-800 text-right"
          />
        </div>
        <div>
          <Input 
            placeholder="סיסמה" 
            value={newStudent.password} 
            onChange={(e) => setNewStudent({...newStudent, password: e.target.value})}
            className="bg-indigo-600/30 text-white placeholder:text-indigo-300 border-indigo-500/50 focus-visible:ring-offset-indigo-800 text-right"
          />
        </div>
        <div>
          <Input 
            placeholder="כיתה (אופציונלי)" 
            value={newStudent.grade || ''} 
            onChange={(e) => setNewStudent({...newStudent, grade: e.target.value})}
            className="bg-indigo-600/30 text-white placeholder:text-indigo-300 border-indigo-500/50 focus-visible:ring-offset-indigo-800 text-right"
          />
        </div>
        <div>
          <Input 
            placeholder="טלפון הורה (אופציונלי)" 
            value={newStudent.parentPhone || ''} 
            onChange={(e) => setNewStudent({...newStudent, parentPhone: e.target.value})}
            className="bg-indigo-600/30 text-white placeholder:text-indigo-300 border-indigo-500/50 focus-visible:ring-offset-indigo-800 text-right"
          />
        </div>
        <div>
          <Button 
            onClick={handleAddStudent} 
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-md"
          >
            <Plus size={16} className="ml-2" />
            הוסף תלמיד
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StudentForm;
