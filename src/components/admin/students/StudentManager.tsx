
import React, { useState, useEffect } from 'react';
import { toast } from "sonner";
import { Student } from '@/types/student';
import { saveStudentsData, getStudentsData, deleteStudent, addStudent } from '../../../utils/studentUtils';
import StudentForm from './StudentForm';
import ExcelTemplateInfo from './ExcelTemplateInfo';
import StudentsTable from './StudentsTable';
import FileImportHandler from './FileImportHandler';
import { getCurrentUser } from '../../../utils/authUtils';

const StudentManager: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [newStudent, setNewStudent] = useState<Omit<Student, 'id' | 'attendanceDays' | 'completedTools' | 'lastActive' | 'createdBy'>>({
    name: '',
    password: '',
    grade: '',
    notes: '',
    parentPhone: ''
  });
  const currentUser = getCurrentUser();

  // Load students data when component mounts
  useEffect(() => {
    const loadedStudents = getStudentsData();
    console.log("Loaded students from storage:", loadedStudents);
    setStudents(loadedStudents);
  }, []);

  const handleAddStudent = () => {
    if (!newStudent.name) {
      toast.error("יש להזין שם");
      return;
    }

    const id = Date.now().toString();
    // Generate random password if not provided
    const password = newStudent.password || Math.floor(1000 + Math.random() * 9000).toString();
    
    const student: Student = {
      id,
      ...newStudent,
      password,
      attendanceDays: [],
      completedTools: [],
      createdBy: currentUser?.username
    };

    const updatedStudents = [...students, student];
    setStudents(updatedStudents);
    saveStudentsData(updatedStudents);
    addStudent(student);
    
    setNewStudent({
      name: '',
      password: '',
      grade: '',
      notes: '',
      parentPhone: ''
    });
    
    toast.success("התלמיד נוסף בהצלחה");
  };

  const handleDeleteStudent = (id: string) => {
    if (window.confirm("האם אתה בטוח שברצונך למחוק את התלמיד?")) {
      const updatedStudents = students.filter(student => student.id !== id);
      setStudents(updatedStudents);
      saveStudentsData(updatedStudents);
      deleteStudent(id);
      toast.success("התלמיד נמחק בהצלחה");
    }
  };

  const handleStudentsImported = (importedStudents: Student[]) => {
    const updatedStudents = [...students, ...importedStudents];
    setStudents(updatedStudents);
    saveStudentsData(updatedStudents);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">ניהול תלמידים</h2>
        <FileImportHandler 
          students={students} 
          setStudents={setStudents} 
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
