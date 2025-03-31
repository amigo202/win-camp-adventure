
export interface Student {
  id: string;
  name: string;
  password: string;
  grade?: string;
  notes?: string;
  parentPhone?: string;
  attendanceDays?: string[];
  completedTools?: string[];
  lastActive?: string;
  createdBy?: string; // Adding the createdBy property to track which instructor created this student
}
