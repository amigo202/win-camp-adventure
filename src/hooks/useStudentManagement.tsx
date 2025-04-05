
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

  const handleDeleteStudent = (id: string | string[]) => {
    console.log(`handleDeleteStudent called with:`, id);
    
    // Handle bulk deletion (array of IDs)
    if (Array.isArray(id)) {
      if (id.length === 0) return;
      
      console.log(`Bulk deleting ${id.length} students:`, id);
      
      // Update students state once with all deletions
      setStudents(prevStudents => {
        const remainingStudents = prevStudents.filter(student => !id.includes(student.id));
        console.log(`Filtered students length after bulk deletion: ${remainingStudents.length}`);
        
        // Save remaining students to storage
        saveStudentsData(remainingStudents);
        
        // Delete each student individually from utility function
        id.forEach(studentId => {
          deleteStudentUtil(studentId);
          console.log(`Deleted student ${studentId} via utility`);
        });
        
        return remainingStudents;
      });
    } 
    // Handle single deletion (string ID)
    else {
      console.log(`Single deletion for student ID: ${id}`);
      const updatedStudents = students.filter(student => student.id !== id);
      console.log(`Filtered students length after deletion: ${updatedStudents.length}`);
      
      setStudents(updatedStudents);
      saveStudentsData(updatedStudents);
      deleteStudentUtil(id);
      console.log(`Student ${id} successfully deleted`);
    }
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
