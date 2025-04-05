
import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Trash2, CheckSquare, Edit2, Save, X } from 'lucide-react';
import { Student } from '@/types/student';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { toast } from "sonner";

interface StudentsTableProps {
  students: Student[];
  handleDeleteStudent: (id: string | string[]) => void;
  filteredStudents?: Student[];
  handleUpdateStudent?: (id: string, data: Partial<Student>) => void;
}

const StudentsTable: React.FC<StudentsTableProps> = ({ 
  students, 
  handleDeleteStudent,
  filteredStudents,
  handleUpdateStudent 
}) => {
  const displayStudents = filteredStudents || students;
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
  const [editingStudent, setEditingStudent] = useState<string | null>(null);
  const [editedValues, setEditedValues] = useState<Partial<Student>>({});

  if (students.length === 0) {
    return (
      <div className="bg-white/80 backdrop-blur-md shadow-xl rounded-lg p-8 text-center">
        <p className="text-gray-900">לא נמצאו תלמידים. הוסיפו תלמידים או יבאו מקובץ אקסל.</p>
      </div>
    );
  }

  if (displayStudents.length === 0) {
    return (
      <div className="bg-white/80 backdrop-blur-md shadow-xl rounded-lg p-8 text-center">
        <p className="text-gray-900">לא נמצאו תלמידים התואמים את החיפוש או הסינון.</p>
      </div>
    );
  }

  const onDeleteClick = (id: string) => {
    if (window.confirm("האם אתה בטוח שברצונך למחוק את התלמיד?")) {
      handleDeleteStudent(id);
      toast.success("התלמיד נמחק בהצלחה");
    }
  };

  const toggleStudentSelection = (studentId: string) => {
    setSelectedStudents(prev => {
      if (prev.includes(studentId)) {
        return prev.filter(id => id !== studentId);
      } else {
        return [...prev, studentId];
      }
    });
  };

  const handleBulkDelete = () => {
    if (selectedStudents.length === 0) {
      toast.error("לא נבחרו תלמידים למחיקה");
      return;
    }
    
    const countToDelete = selectedStudents.length;
    
    if (window.confirm(`האם אתה בטוח שברצונך למחוק ${countToDelete} תלמידים?`)) {
      // Make a copy of the selected students array
      const studentsToDelete = [...selectedStudents];
      
      // Clear selection before deletion to prevent UI issues
      setSelectedStudents([]);
      
      // Pass the array directly to the handler for bulk deletion
      handleDeleteStudent(studentsToDelete);
      
      toast.success(`${countToDelete} תלמידים נמחקו בהצלחה`);
    }
  };

  const selectAll = () => {
    if (selectedStudents.length === displayStudents.length) {
      setSelectedStudents([]);
    } else {
      setSelectedStudents(displayStudents.map(student => student.id));
    }
  };

  const startEditing = (student: Student) => {
    setEditingStudent(student.id);
    setEditedValues({
      name: student.name,
      password: student.password,
      grade: student.grade || '',
      parentPhone: student.parentPhone || '',
      notes: student.notes || ''
    });
  };

  const cancelEditing = () => {
    setEditingStudent(null);
    setEditedValues({});
  };

  const saveEditing = (id: string) => {
    if (!handleUpdateStudent) return;
    
    // Remove any empty string values to avoid overwriting with empty strings
    const cleanedValues = Object.fromEntries(
      Object.entries(editedValues).filter(([_, value]) => value !== '')
    );
    
    handleUpdateStudent(id, cleanedValues);
    setEditingStudent(null);
    setEditedValues({});
    toast.success("פרטי התלמיד עודכנו בהצלחה");
  };

  const handleInputChange = (field: keyof Student, value: string) => {
    setEditedValues(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="bg-white/80 backdrop-blur-md shadow-xl rounded-lg p-4 overflow-hidden border border-slate-200" dir="rtl">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl text-gray-900 font-bold">תלמידים ({displayStudents.length} מתוך {students.length})</h3>
        {selectedStudents.length > 0 && (
          <Button 
            variant="destructive"
            className="flex items-center gap-2"
            onClick={handleBulkDelete}
          >
            <Trash2 size={16} />
            מחק {selectedStudents.length} תלמידים
          </Button>
        )}
      </div>

      <ScrollArea className="h-[450px]">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-indigo-200/80 sticky top-0 z-10">
              <TableRow>
                <TableHead className="w-12 text-center">
                  <Checkbox 
                    checked={displayStudents.length > 0 && selectedStudents.length === displayStudents.length}
                    onCheckedChange={selectAll}
                    aria-label="בחר הכל"
                  />
                </TableHead>
                <TableHead className="text-gray-900 font-bold">שם</TableHead>
                <TableHead className="text-gray-900 font-bold">סיסמה</TableHead>
                <TableHead className="text-gray-900 font-bold">כיתה</TableHead>
                <TableHead className="text-gray-900 font-bold">טלפון הורה</TableHead>
                <TableHead className="text-gray-900 font-bold">הערות</TableHead>
                <TableHead className="text-gray-900 font-bold">פעולות</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {displayStudents.map((student) => (
                <TableRow key={student.id} className="border-b border-slate-200 hover:bg-slate-100/60">
                  <TableCell className="text-center">
                    <Checkbox 
                      checked={selectedStudents.includes(student.id)}
                      onCheckedChange={() => toggleStudentSelection(student.id)}
                      aria-label={`בחר תלמיד ${student.name}`}
                    />
                  </TableCell>
                  
                  {editingStudent === student.id ? (
                    // Editing mode - show input fields
                    <>
                      <TableCell>
                        <Input 
                          value={editedValues.name || ''}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          className="bg-white text-right"
                        />
                      </TableCell>
                      <TableCell>
                        <Input 
                          value={editedValues.password || ''}
                          onChange={(e) => handleInputChange('password', e.target.value)}
                          className="bg-white text-right"
                        />
                      </TableCell>
                      <TableCell>
                        <Input 
                          value={editedValues.grade || ''}
                          onChange={(e) => handleInputChange('grade', e.target.value)}
                          className="bg-white text-right"
                          placeholder="הזן כיתה"
                        />
                      </TableCell>
                      <TableCell>
                        <Input 
                          value={editedValues.parentPhone || ''}
                          onChange={(e) => handleInputChange('parentPhone', e.target.value)}
                          className="bg-white text-right"
                          placeholder="הזן טלפון"
                        />
                      </TableCell>
                      <TableCell>
                        <Input 
                          value={editedValues.notes || ''}
                          onChange={(e) => handleInputChange('notes', e.target.value)}
                          className="bg-white text-right"
                          placeholder="הזן הערות"
                        />
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => saveEditing(student.id)}
                            className="text-green-600 hover:text-green-700 hover:bg-green-100"
                          >
                            <Save size={16} />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={cancelEditing}
                            className="text-gray-600 hover:text-gray-700 hover:bg-gray-100"
                          >
                            <X size={16} />
                          </Button>
                        </div>
                      </TableCell>
                    </>
                  ) : (
                    // Regular display mode
                    <>
                      <TableCell className="font-medium text-gray-900">{student.name}</TableCell>
                      <TableCell className="text-gray-900">{student.password}</TableCell>
                      <TableCell className="text-gray-900">{student.grade || '-'}</TableCell>
                      <TableCell className="text-gray-900">{student.parentPhone || '-'}</TableCell>
                      <TableCell className="text-gray-900">{student.notes || '-'}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          {handleUpdateStudent && (
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => startEditing(student)}
                              className="text-blue-600 hover:text-blue-700 hover:bg-blue-100"
                            >
                              <Edit2 size={16} />
                            </Button>
                          )}
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => onDeleteClick(student.id)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-100"
                          >
                            <Trash2 size={16} />
                          </Button>
                        </div>
                      </TableCell>
                    </>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </ScrollArea>
    </div>
  );
};

export default StudentsTable;
