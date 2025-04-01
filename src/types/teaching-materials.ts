
export interface Material {
  id: string;
  title: string;
  category: string;
  type: 'presentation' | 'document' | 'video' | 'link' | 'folder';
  url: string;
  description?: string;
  gradeLevel?: string;
}
