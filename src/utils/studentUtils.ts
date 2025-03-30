
import { Student } from '../types/student';

// מפתח localStorage לשמירת נתוני תלמידים
const STUDENTS_STORAGE_KEY = 'wincamp_students';

// קבלת כל התלמידים מה-localStorage
export const getStudentsData = (): Student[] => {
  const storedData = localStorage.getItem(STUDENTS_STORAGE_KEY);
  if (storedData) {
    return JSON.parse(storedData);
  }
  return [];
};

// שמירת כל נתוני התלמידים ב-localStorage
export const saveStudentsData = (students: Student[]): void => {
  localStorage.setItem(STUDENTS_STORAGE_KEY, JSON.stringify(students));
};

// הוספת תלמיד חדש
export const addStudent = (student: Student): void => {
  const students = getStudentsData();
  students.push(student);
  saveStudentsData(students);
};

// מחיקת תלמיד לפי מזהה
export const deleteStudent = (id: string): void => {
  const students = getStudentsData();
  const updatedStudents = students.filter(student => student.id !== id);
  saveStudentsData(updatedStudents);
};

// עדכון פרטי תלמיד
export const updateStudent = (id: string, updatedData: Partial<Student>): void => {
  const students = getStudentsData();
  const updatedStudents = students.map(student => 
    student.id === id ? { ...student, ...updatedData } : student
  );
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
