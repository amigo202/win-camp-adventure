
import React from 'react';
import { FileSpreadsheet } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const ExcelTemplateInfo: React.FC = () => {
  return (
    <div className="bg-white/70 backdrop-blur-md shadow-xl rounded-lg p-4 border border-slate-200">
      <div className="flex items-center gap-2 mb-2 justify-end">
        <h3 className="text-lg text-gray-800 font-bold">תבנית אקסל לייבוא</h3>
        <FileSpreadsheet size={20} className="text-green-600" />
      </div>
      <p className="text-sm text-gray-600 mb-4 text-right">וודאו שקובץ האקסל שלכם מכיל את העמודות הבאות:</p>
      
      <div className="overflow-x-auto">
        <Table className="border border-slate-200">
          <TableHeader className="bg-slate-100">
            <TableRow>
              <TableHead className="text-gray-800 font-bold">שם</TableHead>
              <TableHead className="text-gray-800 font-bold">כיתה</TableHead>
              <TableHead className="text-gray-800 font-bold">טלפון הורה</TableHead>
              <TableHead className="text-gray-800 font-bold">הערות</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow className="border-b border-slate-200">
              <TableCell className="text-gray-800 font-medium">ישראל ישראלי</TableCell>
              <TableCell className="text-gray-800">ד'2</TableCell>
              <TableCell className="text-gray-800">050-1234567</TableCell>
              <TableCell className="text-gray-800">אלרגיה לבוטנים</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
      
      <div className="mt-4 text-sm text-gray-600 space-y-2 text-right">
        <p className="font-medium text-emerald-700">הנחיות:</p>
        <ul className="list-disc list-inside pr-4 space-y-1">
          <li>עמודת <span className="font-medium">שם</span> היא חובה</li>
          <li>עמודות כיתה, טלפון והערות הן אופציונליות</li>
          <li>סיסמאות יווצרו אוטומטית לכל תלמיד</li>
          <li>ניתן להוריד קובץ אקסל לדוגמה על ידי לחיצה על "ייצוא לאקסל"</li>
        </ul>
      </div>
    </div>
  );
};

export default ExcelTemplateInfo;
