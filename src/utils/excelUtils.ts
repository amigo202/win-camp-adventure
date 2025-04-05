import * as XLSX from 'xlsx';
import { Student } from '@/types/student';
import { getCurrentUser } from './authUtils';
import { toast } from "sonner";

/**
 * Process and import students from an Excel file
 */
export const importStudentsFromExcel = (file: File): Promise<Student[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (event) => {
      try {
        const data = event.target?.result;
        console.log("Raw file data received");

        if (!data) {
          toast.error("לא ניתן לקרוא את הקובץ");
          reject("Could not read file");
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
          reject("Empty file or unexpected format");
          return;
        }

        // Get the first row to check column names
        const firstRow = excelData[0];
        console.log("First row sample:", firstRow);

        // Find column names - updating this part to better identify the expected columns
        const nameColumn = findColumn(["שם", "שם מלא", "שם התלמיד"], ["name", "fullname", "full name", "student name"], firstRow);
        const gradeColumn = findColumn(["כיתה", "כתה"], ["grade", "class"], firstRow);
        const phoneColumn = findColumn(["טלפון הורה", "טלפון", "פלאפון", "נייד"], ["phone", "parent phone", "parentphone", "phone number", "mobile"], firstRow);
        const notesColumn = findColumn(["הערות"], ["notes", "comments"], firstRow);

        console.log("Detected columns:", { nameColumn, gradeColumn, phoneColumn, notesColumn });

        if (!nameColumn) {
          toast.error("לא נמצאה עמודת 'שם' בקובץ האקסל - זהו שדה חובה");
          reject("Name column not found");
          return;
        }

        const currentUser = getCurrentUser();
        const newStudents: Student[] = [];
        
        // Process each row
        for (let i = 0; i < excelData.length; i++) {
          const row = excelData[i];
          
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
          reject("No valid students found");
          return;
        }

        resolve(newStudents);
      } catch (error) {
        console.error('שגיאה בייבוא קובץ:', error);
        toast.error("שגיאה בייבוא הקובץ. יש לוודא שהקובץ בפורמט אקסל תקין.");
        reject(error);
      }
    };
    
    reader.readAsBinaryString(file);
  });
};

/**
 * Export students data to Excel file
 */
export const exportStudentsToExcel = (students: Student[]) => {
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

/**
 * Helper function to find column names in Excel data - improved to be more flexible
 */
const findColumn = (hebrewNames: string[], englishNames: string[], row: any): string => {
  // First try exact match with Hebrew names
  for (const name of hebrewNames) {
    if (row[name] !== undefined) return name;
  }
  
  // Then try exact match with English names
  for (const name of englishNames) {
    if (row[name] !== undefined) return name;
  }
  
  // If no exact matches, try case-insensitive partial matches
  const allKeys = Object.keys(row);
  
  // Try to find Hebrew partial matches first (higher priority)
  for (const key of allKeys) {
    for (const name of hebrewNames) {
      if (key.includes(name) || name.includes(key)) {
        return key;
      }
    }
  }
  
  // Then try to find English partial matches
  for (const key of allKeys) {
    const lowerKey = key.toLowerCase();
    for (const name of englishNames) {
      if (lowerKey.includes(name.toLowerCase()) || name.toLowerCase().includes(lowerKey)) {
        return key;
      }
    }
  }
  
  return "";
};
