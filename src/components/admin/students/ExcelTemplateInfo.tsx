
import React from 'react';
import { FileSpreadsheet } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const ExcelTemplateInfo: React.FC = () => {
  return (
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
  );
};

export default ExcelTemplateInfo;
