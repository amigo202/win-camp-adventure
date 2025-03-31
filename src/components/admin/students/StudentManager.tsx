
import React from 'react';
import StudentForm from './StudentForm';
import ExcelTemplateInfo from './ExcelTemplateInfo';
import StudentsTable from './StudentsTable';
import FileImportHandler from './FileImportHandler';
import { useStudentManagement } from '@/hooks/useStudentManagement';

const StudentManager: React.FC = () => {
  const {
    students,
    newStudent,
    setNewStudent,
    handleAddStudent,
    handleDeleteStudent,
    handleStudentsImported
  } = useStudentManagement();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">ניהול תלמידים</h2>
        <FileImportHandler 
          students={students} 
          setStudents={() => {}} // This is now managed in the hook
          onStudentsImported={handleStudentsImported} 
        />
      </div>

      <StudentForm 
        newStudent={newStudent} 
        setNewStudent={setNewStudent} 
        handleAddStudent={handleAddStudent} 
      />
      
      <ExcelTemplateInfo />
      
      <StudentsTable 
        students={students} 
        handleDeleteStudent={handleDeleteStudent} 
      />
    </div>
  );
};

export default StudentManager;
