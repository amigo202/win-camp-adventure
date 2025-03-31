
import React, { useState, useRef } from 'react';
import { toast } from "sonner";
import * as XLSX from 'xlsx';
import { saveStudentsData, getStudentsData, deleteStudent, addStudent } from '../../utils/studentUtils';
import { Student } from '@/types/student';
import { getCurrentUser } from '../../utils/authUtils';
import StudentForm from './students/StudentForm';
import ExcelTemplateInfo from './students/ExcelTemplateInfo';
import StudentsTable from './students/StudentsTable';
import StudentActions from './students/StudentActions';

const StudentManagement: React.FC = () => {
  const [students, setStudents] = useState<Student[]>(() => getStudentsData());
  const [newStudent, setNewStudent] = useState<Omit<Student, 'id' | 'attendanceDays' | 'completedTools' | 'lastActive' | 'createdBy'>>({
    name: '',
    password: '',
    grade: '',
    notes: ''
  });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const currentUser = getCurrentUser();

  // הוספת תלמיד בודד
  const handleAddStudent = () => {
    if (!newStudent.name || !newStudent.password) {
      toast.error("יש להזין שם ותעודת זהות");
      return;
    }

    const id = Date.now().toString();
    const student: Student = {
      id,
      ...newStudent,
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
      notes: ''
    });
    
    toast.success("התלמיד נוסף בהצלחה");
  };

  // מחיקת תלמיד
  const handleDeleteStudent = (id: string) => {
    if (window.confirm("האם אתה בטוח שברצונך למחוק את התלמיד?")) {
      const updatedStudents = students.filter(student => student.id !== id);
      setStudents(updatedStudents);
      saveStudentsData(updatedStudents);
      deleteStudent(id);
      toast.success("התלמיד נמחק בהצלחה");
    }
  };

  // העלאת קובץ אקסל
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = event.target?.result;
        const workbook = XLSX.read(data, { type: 'binary' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const excelData = XLSX.utils.sheet_to_json<any>(worksheet);

        // המרת המידע למבנה תלמידים
        const newStudents: Student[] = excelData.map((row, index) => ({
          id: (Date.now() + index).toString(),
          name: row.name || row.Name || row.שם || '',
          password: row.password || row.Password || row.סיסמה || '',
          grade: row.grade || row.Grade || row.כיתה || '',
          notes: row.notes || row.Notes || row.הערות || '',
          attendanceDays: [],
          completedTools: []
        }));

        // וידוא שכל התלמידים יש להם שם וסיסמה
        const validStudents = newStudents.filter(student => student.name && student.password);
        
        if (validStudents.length === 0) {
          toast.error("לא נמצאו תלמידים חוקיים בקובץ");
          return;
        }

        if (validStudents.length !== newStudents.length) {
          toast.warning(`${newStudents.length - validStudents.length} תלמידים לא יובאו בגלל חוסר פרטים`);
        }

        // הגדרת הרשימה החדשה או הוספה לקיימת
        const updatedStudents = [...students, ...validStudents];
        setStudents(updatedStudents);
        saveStudentsData(updatedStudents);
        toast.success(`יובאו ${validStudents.length} תלמידים בהצלחה`);
      } catch (error) {
        console.error('שגיאה בייבוא קובץ:', error);
        toast.error("שגיאה בייבוא הקובץ");
      }
      
      // איפוס שדה הקובץ
      if (fileInputRef.current) fileInputRef.current.value = '';
    };
    
    reader.readAsBinaryString(file);
  };

  // ייצוא לאקסל
  const handleExportToExcel = () => {
    const exportData = students.map(({ name, password, grade, notes }) => ({
      שם: name,
      סיסמה: password,
      כיתה: grade || '',
      הערות: notes || ''
    }));

    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "תלמידים");
    XLSX.writeFile(wb, "תלמידי_קייטנת_WinCamp.xlsx");
    toast.success("הקובץ יוצא בהצלחה");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">ניהול תלמידים</h2>
        <StudentActions 
          fileInputRef={fileInputRef} 
          handleExportToExcel={handleExportToExcel}
          studentsExist={students.length > 0}
        />
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileUpload}
          accept=".xlsx,.xls"
          className="hidden"
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

export default StudentManagement;
