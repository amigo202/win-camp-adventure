
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
    notes: '',
    parentPhone: ''
  });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const currentUser = getCurrentUser();

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

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = event.target?.result;
        console.log("Raw file data:", data);

        if (!data) {
          toast.error("לא ניתן לקרוא את הקובץ");
          return;
        }
        
        const workbook = XLSX.read(data, { type: 'binary' });
        console.log("Sheet names:", workbook.SheetNames);
        
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        console.log("Raw worksheet:", worksheet);

        // Set defval to empty string to handle missing values
        const excelData = XLSX.utils.sheet_to_json<any>(worksheet, { defval: "" });
        console.log("Excel data (full):", excelData);

        if (excelData.length === 0) {
          toast.error("הקובץ ריק או לא בפורמט המצופה");
          return;
        }

        const newStudents: Student[] = excelData.map((row, index) => {
          console.log(`Processing row ${index}:`, row);
          
          // Check all possible field names in Hebrew and English
          const name = row.name || row.Name || row.שם || row["שם"] || '';
          const grade = row.grade || row.Grade || row.כיתה || row["כיתה"] || '';
          const phone = row.phone || row.Phone || row.parentPhone || row["טלפון הורה"] || row["טלפון"] || row["טלפון"] || '';
          const notes = row.notes || row.Notes || row.הערות || row["הערות"] || '';
          
          console.log("Extracted fields:", { name, grade, phone, notes });
          
          // Generate random password if not provided
          const password = row.password || row.Password || row.סיסמה || row["סיסמה"] || 
                          Math.floor(1000 + Math.random() * 9000).toString();

          return {
            id: (Date.now() + index).toString(),
            name,
            password,
            grade,
            notes,
            parentPhone: phone,
            attendanceDays: [],
            completedTools: [],
            createdBy: currentUser?.username
          };
        });

        console.log("Transformed students:", newStudents);

        // Validate that students have at least name and either grade or phone
        const validStudents = newStudents.filter(student => 
          student.name && (student.grade || student.parentPhone)
        );
        
        if (validStudents.length === 0) {
          toast.error("לא נמצאו תלמידים חוקיים בקובץ. יש לוודא שיש עמודות שם, כיתה וטלפון.");
          return;
        }

        if (validStudents.length !== newStudents.length) {
          toast.warning(`${newStudents.length - validStudents.length} תלמידים לא יובאו בגלל חוסר פרטים חיוניים`);
        }

        const updatedStudents = [...students, ...validStudents];
        setStudents(updatedStudents);
        saveStudentsData(updatedStudents);
        toast.success(`יובאו ${validStudents.length} תלמידים בהצלחה`);
      } catch (error) {
        console.error('שגיאה בייבוא קובץ:', error);
        toast.error("שגיאה בייבוא הקובץ. יש לוודא שהקובץ בפורמט אקסל תקין.");
      }
      
      if (fileInputRef.current) fileInputRef.current.value = '';
    };
    
    reader.readAsBinaryString(file);
  };

  const handleExportToExcel = () => {
    const exportData = students.map(({ name, grade, parentPhone, notes }) => ({
      שם: name,
      כיתה: grade || '',
      'טלפון הורה': parentPhone || '',
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
