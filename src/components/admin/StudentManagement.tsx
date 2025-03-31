
import React, { useState, useRef, useEffect } from 'react';
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
  const [students, setStudents] = useState<Student[]>([]);
  const [newStudent, setNewStudent] = useState<Omit<Student, 'id' | 'attendanceDays' | 'completedTools' | 'lastActive' | 'createdBy'>>({
    name: '',
    password: '',
    grade: '',
    notes: '',
    parentPhone: ''
  });
  const fileInputRef = useRef<HTMLInputElement>(null);
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

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = event.target?.result;
        console.log("Raw file data received");

        if (!data) {
          toast.error("לא ניתן לקרוא את הקובץ");
          return;
        }
        
        const workbook = XLSX.read(data, { type: 'binary' });
        console.log("Sheet names:", workbook.SheetNames);
        
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];

        // Convert Excel data to JSON with proper header detection
        const excelData = XLSX.utils.sheet_to_json<any>(worksheet, { 
          defval: "",
          raw: false
        });
        
        console.log(`Extracted ${excelData.length} rows from Excel file`);
        
        if (excelData.length === 0) {
          toast.error("הקובץ ריק או לא בפורמט המצופה");
          return;
        }

        // Get the first row to check column names
        const firstRow = excelData[0];
        console.log("First row sample:", firstRow);

        // Find the appropriate column names (Hebrew or English)
        const findColumn = (hebrewNames: string[], englishNames: string[], row: any): string => {
          for (const name of hebrewNames) {
            if (row[name] !== undefined) return name;
          }
          for (const name of englishNames) {
            if (row[name] !== undefined) return name;
          }
          return "";
        };

        // Define possible column names
        const nameColumn = findColumn(["שם", "שם מלא"], ["name", "fullname", "full name"], firstRow);
        const gradeColumn = findColumn(["כיתה"], ["grade", "class"], firstRow);
        const phoneColumn = findColumn(["טלפון הורה", "טלפון"], ["phone", "parent phone", "parentphone", "phone number"], firstRow);
        const notesColumn = findColumn(["הערות"], ["notes", "comments"], firstRow);

        console.log("Detected columns:", { nameColumn, gradeColumn, phoneColumn, notesColumn });

        if (!nameColumn) {
          toast.error("לא נמצאה עמודת 'שם' בקובץ האקסל");
          return;
        }

        const newStudents: Student[] = [];
        
        // Process each row
        for (let i = 0; i < excelData.length; i++) {
          const row = excelData[i];
          console.log(`Processing row ${i}:`, row);
          
          // Extract fields with the identified column names
          const name = row[nameColumn] || '';
          const grade = gradeColumn ? (row[gradeColumn] || '') : '';
          const phone = phoneColumn ? (row[phoneColumn] || '') : '';
          const notes = notesColumn ? (row[notesColumn] || '') : '';
          
          // Skip rows without a name
          if (!name.trim()) {
            console.log(`Row ${i} skipped - no name found`);
            continue;
          }
          
          // Generate random 4-digit password
          const password = Math.floor(1000 + Math.random() * 9000).toString();

          const newStudent: Student = {
            id: (Date.now() + i).toString(),
            name,
            password,
            grade,
            notes,
            parentPhone: phone,
            attendanceDays: [],
            completedTools: [],
            createdBy: currentUser?.username
          };
          
          newStudents.push(newStudent);
        }

        console.log(`Created ${newStudents.length} new student records`);
        
        if (newStudents.length === 0) {
          toast.error("לא נמצאו תלמידים חוקיים בקובץ");
          return;
        }

        // Update the state and save to storage
        const updatedStudents = [...students, ...newStudents];
        console.log(`Saving ${updatedStudents.length} total students`);
        setStudents(updatedStudents);
        saveStudentsData(updatedStudents);
        
        toast.success(`יובאו ${newStudents.length} תלמידים בהצלחה`);
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
