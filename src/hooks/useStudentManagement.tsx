
import { useState, useEffect } from 'react';
import { toast } from "sonner";
import { Student } from '@/types/student';
import { 
  getStudentsData, 
  saveStudentsData, 
  deleteStudent as deleteStudentUtil, 
  addStudent as addStudentUtil
} from '@/utils/studentUtils';
import { getCurrentUser } from '@/utils/authUtils';

export const useStudentManagement = () => {
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

    // Add to state directly
    setStudents(prevStudents => {
      const updatedStudents = [...prevStudents, student];
      
      // Save to storage from here (removed from addStudentUtil since we're already doing it)
      saveStudentsData(updatedStudents);
      
      return updatedStudents;
    });
    
    // This was causing duplicate storage saves - we'll just call it without save
    addStudentUtil(student);
    
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
    console.log(`handleDeleteStudent called for ID: ${id}`);
    
    // מחיקה רגילה (ללא אישור) כי האישור כבר נעשה במקום אחר
    const updatedStudents = students.filter(student => student.id !== id);
    console.log(`Filtered students length after deletion: ${updatedStudents.length}`);
    
    setStudents(updatedStudents);
    saveStudentsData(updatedStudents);
    deleteStudentUtil(id);
    console.log(`Student ${id} successfully deleted`);
    
    // הערה: אין צורך בהודעת toast כאן כי היא תוצג במקום שקורא לפונקציה זו
  };

  const handleStudentsImported = (importedStudents: Student[]) => {
    const updatedStudents = [...students, ...importedStudents];
    setStudents(updatedStudents);
    saveStudentsData(updatedStudents);
  };

  return {
    students,
    newStudent,
    setNewStudent,
    handleAddStudent,
    handleDeleteStudent,
    handleStudentsImported
  };
};
