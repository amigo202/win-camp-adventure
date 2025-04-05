
import React, { useState, useMemo } from 'react';
import StudentForm from './StudentForm';
import ExcelTemplateInfo from './ExcelTemplateInfo';
import StudentsTable from './StudentsTable';
import FileImportHandler from './FileImportHandler';
import SearchFilter from './SearchFilter';
import { useStudentManagement } from '@/hooks/useStudentManagement';

const StudentManager: React.FC = () => {
  const {
    students,
    newStudent,
    setNewStudent,
    handleAddStudent,
    handleDeleteStudent,
    handleStudentsImported
  } = useStudentManagement();

  const [searchTerm, setSearchTerm] = useState('');
  const [filterGrade, setFilterGrade] = useState('all');

  // Extract unique grades from students for the filter dropdown
  const availableGrades = useMemo(() => {
    const grades = students
      .map(student => student.grade)
      .filter((grade): grade is string => !!grade);
    
    return Array.from(new Set(grades)).sort();
  }, [students]);

  // Apply filtering and searching to students
  const filteredStudents = useMemo(() => {
    return students.filter(student => {
      const matchesSearch = searchTerm === '' || 
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (student.notes && student.notes.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesGrade = filterGrade === 'all' || student.grade === filterGrade;
      
      return matchesSearch && matchesGrade;
    });
  }, [students, searchTerm, filterGrade]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">ניהול תלמידים</h2>
        <FileImportHandler 
          students={students}
          onStudentsImported={handleStudentsImported} 
        />
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-1/2">
          <StudentForm 
            newStudent={newStudent} 
            setNewStudent={setNewStudent} 
            handleAddStudent={handleAddStudent} 
          />
        </div>
        <div className="md:w-1/2">
          <ExcelTemplateInfo />
        </div>
      </div>
      
      <SearchFilter
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filterGrade={filterGrade}
        setFilterGrade={setFilterGrade}
        availableGrades={availableGrades}
      />
      
      <StudentsTable 
        students={students} 
        filteredStudents={filteredStudents}
        handleDeleteStudent={handleDeleteStudent} 
      />
    </div>
  );
};

export default StudentManager;
