
export interface Project {
  _id: string;
  projectName: string;
  description: string;
  startDate: string;
  status: string;
  teamMember: string;
  progressNote: string;
}

// MongoDB generates the ID for new projects
export type ProjectInput = Omit<Project, '_id'>;
