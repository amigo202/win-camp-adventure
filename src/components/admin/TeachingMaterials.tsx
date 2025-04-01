
import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Link2, Video, Book, Download, ExternalLink, FolderOpen } from "lucide-react";
import { categories } from "@/utils/categories";

interface Material {
  id: string;
  title: string;
  category: string;
  type: 'presentation' | 'document' | 'video' | 'link' | 'folder';
  url: string;
  description?: string;
  gradeLevel?: string;
}

// דוגמה לחומרי הלימוד - יש להחליף בנתונים אמיתיים
const demoMaterials: Material[] = [
  {
    id: "prog1",
    title: "הקדמה לתכנות - סקראץ'",
    category: "programming",
    type: "presentation",
    url: "https://docs.google.com/presentation/d/1XYZ",
    description: "מצגת פתיחה לתכנות ויזואלי עם סקראץ'",
    gradeLevel: "ג'-ד'"
  },
  {
    id: "ai1",
    title: "מה זו בינה מלאכותית?",
    category: "ai",
    type: "video",
    url: "https://www.youtube.com/watch?v=abc123",
    description: "סרטון הסבר על בינה מלאכותית לילדים",
    gradeLevel: "כל הגילאים"
  },
  {
    id: "mine1",
    title: "יצירת עולם במיינקראפט",
    category: "minecraft",
    type: "document",
    url: "https://docs.google.com/document/d/xyz",
    description: "מדריך ליצירת עולם במיינקראפט חינוכי",
    gradeLevel: "ה'-ו'"
  },
  {
    id: "safety1",
    title: "מדריך למדריך - מוגנות ברשת",
    category: "safety",
    type: "document",
    url: "https://docs.google.com/document/d/1r5DQ4rnxlMe_twbtfLXGDzxZlddhyN2J",
    description: "מדריך למדריכים על שיעור מוגנות ברשת",
    gradeLevel: "כל הגילאים"
  },
  // חומרי לימוד סקראץ'
  {
    id: "scratch1",
    title: "חומר ומצגות על סקרץ'",
    category: "programming",
    type: "folder",
    url: "https://drive.google.com/drive/u/0/folders/1AjzT4fuHtD1A3j10Z2UncK3LDxTmQs_0",
    description: "תיקיית Drive עם מצגות וחומרי לימוד לסקראץ'",
    gradeLevel: "כל הגילאים"
  },
  // חומרי לימוד פיתוח משחקים
  {
    id: "gamedev1",
    title: "פיתוח משחקים",
    category: "programming",
    type: "folder",
    url: "https://drive.google.com/drive/u/0/folders/1_IGwdTIwaLXq8ysbT4dC0EFFRnDPpvff",
    description: "תיקיית Drive עם חומרי לימוד לפיתוח משחקים",
    gradeLevel: "ד'-ו'"
  },
  // חומרי לימוד מיינקראפט
  {
    id: "minecraft1",
    title: "תכנות במיינקראפט",
    category: "minecraft",
    type: "folder",
    url: "https://drive.google.com/drive/u/0/folders/10ySub9fEYt9mI1vxrUHTZ8VMX10t7gAc",
    description: "תיקיית Drive עם חומרי לימוד לתכנות במיינקראפט",
    gradeLevel: "ג'-ו'"
  },
  // חומרי לימוד פיתוח אפליקציות
  {
    id: "appdev1",
    title: "פיתוח אפליקציות",
    category: "programming",
    type: "folder",
    url: "https://drive.google.com/drive/u/0/folders/1KXI22rnaTAQ6yIADSniOFtWpqnl50guM",
    description: "תיקיית Drive עם חומרי לימוד לפיתוח אפליקציות",
    gradeLevel: "ה'-ו'"
  },
  // וידאו חדש על בינה מלאכותית
  {
    id: "ai2",
    title: "בינה מלאכותית לילדים - בינאלי",
    category: "ai",
    type: "video",
    url: "https://www.youtube.com/watch?v=koszPr68xZ4",
    description: "סרטון הסבר על בינה מלאכותית לילדים מבינאלי",
    gradeLevel: "כל הגילאים"
  },
  // וידאו נוסף על בינה מלאכותית
  {
    id: "ai3",
    title: "איך ללמד ילדים על בינה מלאכותית",
    category: "ai",
    type: "video", 
    url: "https://www.youtube.com/watch?v=I6BB1BPCHog",
    description: "סרטון על איך ללמד ילדים על בינה מלאכותית - שושע עוז",
    gradeLevel: "כל הגילאים"
  }
];

const TeachingMaterials: React.FC = () => {
  const [materials] = useState<Material[]>(demoMaterials);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  // סינון לפי קטגוריה
  const filteredMaterials = selectedCategory
    ? materials.filter(m => m.category === selectedCategory)
    : materials;
    
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

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">חומרי לימוד למדריכים</CardTitle>
          <CardDescription>
            כל חומרי הלימוד של הקייטנה מרוכזים במקום אחד למדריכים
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <div className="mb-4 font-bold">סנן לפי קטגוריה:</div>
            <div className="flex flex-wrap gap-2">
              <Button 
                variant={selectedCategory === null ? "default" : "outline"}
                onClick={() => setSelectedCategory(null)}
              >
                הכל
              </Button>
              {categories.map(category => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`${selectedCategory === category.id ? 'bg-' + category.color + '-600' : 'hover:bg-' + category.color + '-100'}`}
                >
                  {category.icon} {category.title}
                </Button>
              ))}
            </div>
          </div>
          
          {filteredMaterials.length > 0 ? (
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
                  {filteredMaterials.map(material => (
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
          ) : (
            <div className="text-center p-8 text-gray-500">
              לא נמצאו חומרי לימוד בקטגוריה זו
            </div>
          )}
          
          <div className="mt-6">
            <p className="text-sm text-gray-500">
              * ניתן להוסיף חומרי לימוד חדשים על ידי שליחת החומרים למנהל המערכת
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TeachingMaterials;
