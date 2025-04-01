
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { FileText, Link2, Video, Book, Download, ExternalLink, FolderOpen } from "lucide-react";
import { Material } from "@/types/teaching-materials";
import { categories } from "@/utils/categories";

interface MaterialsTableProps {
  materials: Material[];
}

const MaterialsTable: React.FC<MaterialsTableProps> = ({ materials }) => {
  // פונקציה לקבלת אייקון לפי סוג המסמך
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'presentation': return <FileText className="text-indigo-600" />;
      case 'document': return <Book className="text-blue-600" />;
      case 'video': return <Video className="text-red-600" />;
      case 'link': return <Link2 className="text-green-600" />;
      case 'folder': return <FolderOpen className="text-yellow-600" />;
      default: return <FileText />;
    }
  };
  
  // פונקציה לקבלת שם הקטגוריה בעברית
  const getCategoryName = (categoryId: string) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.title : categoryId;
  };
  
  // פונקציה לקבלת צבע לפי קטגוריה
  const getCategoryColorClass = (categoryId: string) => {
    const category = categories.find(cat => cat.id === categoryId);
    switch (category?.color) {
      case 'blue': return 'bg-blue-100 text-blue-800';
      case 'green': return 'bg-green-100 text-green-800';
      case 'red': return 'bg-red-100 text-red-800';
      case 'purple': return 'bg-purple-100 text-purple-800';
      case 'yellow': return 'bg-yellow-100 text-yellow-800';
      case 'pink': return 'bg-pink-100 text-pink-800';
      case 'indigo': return 'bg-indigo-100 text-indigo-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (materials.length === 0) {
    return (
      <div className="text-center p-8 text-gray-700 bg-white/80 rounded-lg shadow-sm">
        לא נמצאו חומרי לימוד בקטגוריה זו
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-md border bg-white/95 shadow-md" dir="rtl">
      <Table>
        <TableHeader className="bg-indigo-50">
          <TableRow>
            <TableHead className="w-10 text-indigo-900">סוג</TableHead>
            <TableHead className="text-indigo-900">שם החומר</TableHead>
            <TableHead className="text-indigo-900">קטגוריה</TableHead>
            <TableHead className="text-indigo-900">כיתות</TableHead>
            <TableHead className="text-indigo-900">תיאור</TableHead>
            <TableHead className="w-24 text-indigo-900">פעולות</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {materials.map(material => (
            <TableRow key={material.id} className="hover:bg-indigo-50/50">
              <TableCell>{getTypeIcon(material.type)}</TableCell>
              <TableCell className="font-medium text-gray-900">{material.title}</TableCell>
              <TableCell>
                <span className={`px-2 py-1 rounded-full text-xs ${getCategoryColorClass(material.category)}`}>
                  {getCategoryName(material.category)}
                </span>
              </TableCell>
              <TableCell className="text-gray-700">{material.gradeLevel}</TableCell>
              <TableCell className="text-gray-700">{material.description}</TableCell>
              <TableCell className="flex gap-2">
                <Button variant="outline" size="sm" asChild className="border-indigo-200 text-indigo-700 hover:bg-indigo-50">
                  <a href={material.url} target="_blank" rel="noopener noreferrer">
                    <ExternalLink size={16} />
                    <span className="sr-only">פתח</span>
                  </a>
                </Button>
                {material.type !== 'folder' && (
                  <Button variant="outline" size="sm" className="border-indigo-200 text-indigo-700 hover:bg-indigo-50">
                    <Download size={16} />
                    <span className="sr-only">הורד</span>
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default MaterialsTable;
