
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import CategoryFilter from './teaching-materials/CategoryFilter';
import MaterialsTable from './teaching-materials/MaterialsTable';
import { Material } from '@/types/teaching-materials';
import { demoMaterials } from '@/data/teaching-materials';

const TeachingMaterials: React.FC = () => {
  const [materials] = useState<Material[]>(demoMaterials);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  // סינון לפי קטגוריה
  const filteredMaterials = selectedCategory
    ? materials.filter(m => m.category === selectedCategory)
    : materials;

  return (
    <div className="space-y-4" dir="rtl">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">חומרי לימוד למדריכים</CardTitle>
          <CardDescription>
            כל חומרי הלימוד של הקייטנה מרוכזים במקום אחד למדריכים
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CategoryFilter 
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
          
          <MaterialsTable materials={filteredMaterials} />
          
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
