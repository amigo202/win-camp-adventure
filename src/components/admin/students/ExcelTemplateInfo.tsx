
import React from 'react';
import { FileSpreadsheet } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const ExcelTemplateInfo: React.FC = () => {
  return (
    <div className="bg-indigo-700/30 p-4 rounded-lg backdrop-blur-sm border border-indigo-600/50">
      <div className="flex items-center gap-2 mb-2">
        <FileSpreadsheet size={20} className="text-white" />
        <h3 className="text-lg text-white font-bold">תבנית אקסל לייבוא</h3>
      </div>
      <p className="text-sm text-indigo-200 mb-4">וודאו שקובץ האקסל שלכם מכיל את העמודות הבאות: שם, סיסמה, כיתה (אופציונלי), טלפון הורה (אופציונלי), הערות (אופציונלי)</p>
      <div className="overflow-x-auto">
        <Table className="border border-indigo-600/50">
          <TableHeader className="bg-indigo-800/50">
            <TableRow>
              <TableHead className="text-white font-bold">שם</TableHead>
              <TableHead className="text-white font-bold">סיסמה</TableHead>
              <TableHead className="text-white font-bold">כיתה</TableHead>
              <TableHead className="text-white font-bold">טלפון הורה</TableHead>
              <TableHead className="text-white font-bold">הערות</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow className="border-b border-indigo-600/30">
              <TableCell className="text-white">ישראל ישראלי</TableCell>
              <TableCell className="text-white">1234</TableCell>
              <TableCell className="text-white">ד'2</TableCell>
              <TableCell className="text-white">050-1234567</TableCell>
              <TableCell className="text-white">אלרגיה לבוטנים</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ExcelTemplateInfo;
