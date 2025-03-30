
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
    <div className="bg-white/5 p-4 rounded-lg">
      <h3 className="text-xl mb-4">הוספת תלמיד</h3>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="md:col-span-2">
          <Input 
            placeholder="שם התלמיד" 
            value={newStudent.name} 
            onChange={(e) => setNewStudent({...newStudent, name: e.target.value})}
            className="bg-white/10 text-white placeholder:text-gray-300 border-white/30"
          />
        </div>
        <div>
          <Input 
            placeholder="סיסמה" 
            value={newStudent.password} 
            onChange={(e) => setNewStudent({...newStudent, password: e.target.value})}
            className="bg-white/10 text-white placeholder:text-gray-300 border-white/30"
          />
        </div>
        <div>
          <Input 
            placeholder="כיתה (אופציונלי)" 
            value={newStudent.grade || ''} 
            onChange={(e) => setNewStudent({...newStudent, grade: e.target.value})}
            className="bg-white/10 text-white placeholder:text-gray-300 border-white/30"
          />
        </div>
        <div>
          <Button 
            onClick={handleAddStudent} 
            className="w-full flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700"
          >
            <Plus size={16} />
            הוסף תלמיד
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StudentForm;
