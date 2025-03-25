
import React, { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Upload, Download, Save, Plus, Trash2, FileSpreadsheet } from 'lucide-react';
import { toast } from "sonner";
import * as XLSX from 'xlsx';
import { saveStudentsData, getStudentsData, deleteStudent, addStudent } from '../../utils/studentUtils';

// טיפוס לתלמיד
export interface Student {
  id: string;
  name: string;
  password: string;
  grade?: string;
  notes?: string;
  attendanceDays?: string[];
  completedTools?: string[];
  lastActive?: string;
}

const StudentManagement: React.FC = () => {
  const [students, setStudents] = useState<Student[]>(() => getStudentsData());
  const [newStudent, setNewStudent] = useState<Omit<Student, 'id' | 'attendanceDays' | 'completedTools' | 'lastActive'>>({
    name: '',
    password: '',
    grade: '',
    notes: ''
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

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
      completedTools: []
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
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white border-none"
          >
            <Upload size={16} />
            יבוא מאקסל
          </Button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept=".xlsx,.xls"
            className="hidden"
          />
          
          <Button 
            variant="outline" 
            onClick={handleExportToExcel}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white border-none"
            disabled={students.length === 0}
          >
            <Download size={16} />
            ייצוא לאקסל
          </Button>
        </div>
      </div>

      {/* טופס הוספת תלמיד */}
      <div className="bg-white/5 p-4 rounded-lg">
        <h3 className="text-xl mb-4">הוספת תלמיד</h3>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="md:col-span-2">
            <Input 
              placeholder="שם התלמיד" 
              value={newStudent.name} 
              onChange={(e) => setNewStudent({...newStudent, name: e.target.value})}
              className="bg-white/10 text-white placeholder:text-gray-300 border-white/30"
            />
          </div>
          <div>
            <Input 
              placeholder="סיסמה" 
              value={newStudent.password} 
              onChange={(e) => setNewStudent({...newStudent, password: e.target.value})}
              className="bg-white/10 text-white placeholder:text-gray-300 border-white/30"
            />
          </div>
          <div>
            <Input 
              placeholder="כיתה (אופציונלי)" 
              value={newStudent.grade || ''} 
              onChange={(e) => setNewStudent({...newStudent, grade: e.target.value})}
              className="bg-white/10 text-white placeholder:text-gray-300 border-white/30"
            />
          </div>
          <div>
            <Button 
              onClick={handleAddStudent} 
              className="w-full flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700"
            >
              <Plus size={16} />
              הוסף תלמיד
            </Button>
          </div>
        </div>
      </div>

      {/* תבנית לייבוא אקסל */}
      <div className="bg-white/5 p-4 rounded-lg">
        <div className="flex items-center gap-2 mb-2">
          <FileSpreadsheet size={20} />
          <h3 className="text-lg">תבנית אקסל לייבוא</h3>
        </div>
        <p className="text-sm text-gray-300 mb-4">וודאו שקובץ האקסל שלכם מכיל את העמודות הבאות: שם, סיסמה, כיתה (אופציונלי), הערות (אופציונלי)</p>
        <div className="overflow-x-auto">
          <Table className="border border-white/20">
            <TableHeader>
              <TableRow>
                <TableHead className="text-white">שם</TableHead>
                <TableHead className="text-white">סיסמה</TableHead>
                <TableHead className="text-white">כיתה</TableHead>
                <TableHead className="text-white">הערות</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="text-white/80">ישראל ישראלי</TableCell>
                <TableCell className="text-white/80">1234</TableCell>
                <TableCell className="text-white/80">ד'2</TableCell>
                <TableCell className="text-white/80">אלרגיה לבוטנים</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>

      {/* טבלת תלמידים */}
      {students.length > 0 ? (
        <div className="bg-white/5 p-4 rounded-lg overflow-hidden">
          <h3 className="text-xl mb-4">תלמידים ({students.length})</h3>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-white">שם</TableHead>
                  <TableHead className="text-white">סיסמה</TableHead>
                  <TableHead className="text-white">כיתה</TableHead>
                  <TableHead className="text-white">הערות</TableHead>
                  <TableHead className="text-white text-right">פעולות</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {students.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell className="font-medium text-white">{student.name}</TableCell>
                    <TableCell className="text-white">{student.password}</TableCell>
                    <TableCell className="text-white">{student.grade || '-'}</TableCell>
                    <TableCell className="text-white">{student.notes || '-'}</TableCell>
                    <TableCell className="text-right">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => handleDeleteStudent(student.id)}
                        className="text-red-400 hover:text-red-500 hover:bg-red-500/20"
                      >
                        <Trash2 size={16} />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      ) : (
        <div className="bg-white/5 p-8 rounded-lg text-center">
          <p className="text-gray-300">לא נמצאו תלמידים. הוסיפו תלמידים או יבאו מקובץ אקסל.</p>
        </div>
      )}
    </div>
  );
};

export default StudentManagement;
