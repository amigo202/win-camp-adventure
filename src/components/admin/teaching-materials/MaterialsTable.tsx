
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
  const getCategoryColor = (categoryId: string) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.color : 'gray';
  };

  if (materials.length === 0) {
    return (
      <div className="text-center p-8 text-gray-500">
        לא נמצאו חומרי לימוד בקטגוריה זו
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-10">סוג</TableHead>
            <TableHead>שם החומר</TableHead>
            <TableHead>קטגוריה</TableHead>
            <TableHead>כיתות</TableHead>
            <TableHead>תיאור</TableHead>
            <TableHead className="w-24 text-left">פעולות</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {materials.map(material => (
            <TableRow key={material.id}>
              <TableCell>{getTypeIcon(material.type)}</TableCell>
              <TableCell className="font-medium">{material.title}</TableCell>
              <TableCell>
                <span className={`px-2 py-1 rounded-full text-xs bg-${getCategoryColor(material.category)}-100 text-${getCategoryColor(material.category)}-800`}>
                  {getCategoryName(material.category)}
                </span>
              </TableCell>
              <TableCell>{material.gradeLevel}</TableCell>
              <TableCell>{material.description}</TableCell>
              <TableCell className="flex space-x-2">
                <Button variant="outline" size="sm" asChild>
                  <a href={material.url} target="_blank" rel="noopener noreferrer">
                    <ExternalLink size={16} />
                    <span className="sr-only">פתח</span>
                  </a>
                </Button>
                {material.type !== 'folder' && (
                  <Button variant="outline" size="sm">
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
