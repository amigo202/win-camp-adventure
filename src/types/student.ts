
export interface Student {
  id: string;
  name: string;
  password: string;
  grade?: string;
  notes?: string;
  attendanceDays?: string[];
  completedTools?: string[];
  lastActive?: string;
}
