
import React from 'react';
import { Users } from 'lucide-react';

interface StudentLoginSectionProps {
  setStudentLogin: (studentId: string) => void;
}

const StudentLoginSection: React.FC<StudentLoginSectionProps> = ({ setStudentLogin }) => {
  return (
    <div className="space-y-4">
      <div className="text-center text-indigo-900 font-medium">בחירת תלמיד מהירה</div>
      <div className="flex justify-center gap-2 flex-wrap">
        {[1, 2, 3, 4, 5].map(num => (
          <button
            key={num}
            type="button"
            onClick={() => setStudentLogin(num.toString())}
            className="bg-teal-500 hover:bg-teal-600 text-white px-5 py-2 rounded-lg text-lg flex items-center gap-2"
          >
            <Users size={16} />
            תלמיד {num}
          </button>
        ))}
      </div>
    </div>
  );
};

export default StudentLoginSection;
