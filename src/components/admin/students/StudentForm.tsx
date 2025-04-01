
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
    <div className="bg-white/70 backdrop-blur-md shadow-xl rounded-lg p-4 border border-slate-200">
      <h3 className="text-xl mb-4 text-gray-800 font-bold text-right">הוספת תלמיד</h3>
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
        <div className="md:col-span-2">
          <Input 
            placeholder="שם התלמיד" 
            value={newStudent.name} 
            onChange={(e) => setNewStudent({...newStudent, name: e.target.value})}
            className="bg-slate-50 text-gray-800 placeholder:text-slate-400 border-slate-200 focus-visible:ring-offset-slate-100 text-right"
          />
        </div>
        <div>
          <Input 
            placeholder="סיסמה" 
            value={newStudent.password} 
            onChange={(e) => setNewStudent({...newStudent, password: e.target.value})}
            className="bg-slate-50 text-gray-800 placeholder:text-slate-400 border-slate-200 focus-visible:ring-offset-slate-100 text-right"
          />
        </div>
        <div>
          <Input 
            placeholder="כיתה (אופציונלי)" 
            value={newStudent.grade || ''} 
            onChange={(e) => setNewStudent({...newStudent, grade: e.target.value})}
            className="bg-slate-50 text-gray-800 placeholder:text-slate-400 border-slate-200 focus-visible:ring-offset-slate-100 text-right"
          />
        </div>
        <div>
          <Input 
            placeholder="טלפון הורה (אופציונלי)" 
            value={newStudent.parentPhone || ''} 
            onChange={(e) => setNewStudent({...newStudent, parentPhone: e.target.value})}
            className="bg-slate-50 text-gray-800 placeholder:text-slate-400 border-slate-200 focus-visible:ring-offset-slate-100 text-right"
          />
        </div>
        <div>
          <Button 
            onClick={handleAddStudent} 
            className="w-full flex items-center justify-center gap-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg shadow-sm"
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
