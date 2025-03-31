
import { Student } from '../types/student';
import { getCurrentUser } from './authUtils';

// מפתח localStorage לשמירת נתוני תלמידים
const STUDENTS_STORAGE_KEY = 'wincamp_students';

// קבלת כל התלמידים מה-localStorage
export const getStudentsData = (): Student[] => {
  const storedData = localStorage.getItem(STUDENTS_STORAGE_KEY);
  const currentUser = getCurrentUser();
  
  if (storedData) {
    const allStudents = JSON.parse(storedData) as Student[];
    
    // אם המשתמש הוא מנהל, החזר את כל התלמידים
    if (currentUser?.role === 'admin') {
      return allStudents;
    }
    
    // אחרת החזר רק את התלמידים של המדריך הנוכחי
    return allStudents.filter(student => student.createdBy === currentUser?.username);
  }
  
  return [];
};

// שמירת כל נתוני התלמידים ב-localStorage
export const saveStudentsData = (students: Student[]): void => {
  // Get existing students first to avoid overwriting data from other instructors
  const existingData = localStorage.getItem(STUDENTS_STORAGE_KEY);
  let allStudents: Student[] = [];
  
  if (existingData) {
    allStudents = JSON.parse(existingData);
  }
  
  const currentUser = getCurrentUser();
  
  if (currentUser?.role === 'admin') {
    // Admin can override all data
    localStorage.setItem(STUDENTS_STORAGE_KEY, JSON.stringify(students));
    return;
  }
  
  // For instructors, only update their own students
  const otherInstructorsStudents = allStudents.filter(
    student => student.createdBy !== currentUser?.username
  );
  
  // Combine other instructors' students with this instructor's updated students
  const updatedAllStudents = [...otherInstructorsStudents, ...students];
  localStorage.setItem(STUDENTS_STORAGE_KEY, JSON.stringify(updatedAllStudents));
};

// הוספת תלמיד חדש
export const addStudent = (student: Student): void => {
  const currentUser = getCurrentUser();
  if (!currentUser) return;
  
  // Add the createdBy property to track which instructor created this student
  const studentWithCreator = {
    ...student,
    createdBy: currentUser.username
  };
  
  const students = getStudentsData();
  students.push(studentWithCreator);
  saveStudentsData(students);
};

// מחיקת תלמיד לפי מזהה
export const deleteStudent = (id: string): void => {
  const currentUser = getCurrentUser();
  const students = getStudentsData();
  
  // Make sure the instructor can only delete their own students
  const updatedStudents = students.filter(student => {
    // If admin, can delete any student
    if (currentUser?.role === 'admin') {
      return student.id !== id;
    }
    
    // For instructors, only delete their own students
    return student.id !== id || student.createdBy !== currentUser?.username;
  });
  
  saveStudentsData(updatedStudents);
};

// עדכון פרטי תלמיד
export const updateStudent = (id: string, updatedData: Partial<Student>): void => {
  const currentUser = getCurrentUser();
  const students = getStudentsData();
  
  const updatedStudents = students.map(student => {
    // Only update if the student belongs to this instructor or if admin
    if (student.id === id && (currentUser?.role === 'admin' || student.createdBy === currentUser?.username)) {
      return { ...student, ...updatedData };
    }
    return student;
  });
  
  saveStudentsData(updatedStudents);
};

// בדיקת התחברות תלמיד
export const authenticateStudent = (password: string): Student | null => {
  const students = getStudentsData();
  const student = students.find(s => s.password === password);
  
  if (student) {
    // עדכון זמן פעילות אחרון
    updateStudentActivity(student.id);
    return student;
  }
  
  return null;
};

// עדכון זמן פעילות אחרון של תלמיד
export const updateStudentActivity = (id: string): void => {
  updateStudent(id, { lastActive: new Date().toISOString() });
};

// הוספת כלי שהושלם לתלמיד
export const addCompletedTool = (studentId: string, toolId: string): void => {
  const students = getStudentsData();
  const student = students.find(s => s.id === studentId);
  
  if (student) {
    const completedTools = [...(student.completedTools || [])];
    if (!completedTools.includes(toolId)) {
      completedTools.push(toolId);
      updateStudent(studentId, { completedTools });
    }
  }
};

// הסרת כלי שהושלם מתלמיד
export const removeCompletedTool = (studentId: string, toolId: string): void => {
  const students = getStudentsData();
  const student = students.find(s => s.id === studentId);
  
  if (student && student.completedTools) {
    const completedTools = student.completedTools.filter(id => id !== toolId);
    updateStudent(studentId, { completedTools });
  }
};

// קבלת מספר הכלים שהושלמו על ידי תלמיד
export const getStudentCompletedToolsCount = (studentId: string): number => {
  const students = getStudentsData();
  const student = students.find(s => s.id === studentId);
  
  return student?.completedTools?.length || 0;
};

// קבלת רשימת תלמידים שהם פעילים היום
export const getActiveStudentsToday = (): Student[] => {
  const students = getStudentsData();
  const today = new Date().toISOString().split('T')[0];
  
  return students.filter(student => 
    student.lastActive && student.lastActive.startsWith(today)
  );
};
