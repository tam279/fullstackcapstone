// Interface.ts . Path: C:\Users\nguye\OneDrive\Desktop\project-managment-website\fullstackcapstone\client\src\problemdomain\Interface\Interface.ts
export interface Company {
  id: string;
  name: string;
  address: string;
  phoneNumber: string;
  website: string;
  users: User[];
  projects: Project[];
  deleted: boolean;
}

export interface User {
  id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: Role;
  company: Company;
  companyId: string;
  phoneNumber: string;
  jobTitle: string;
  tags: Tag[];
  tasks: Task[];
  comments: Comment[];
  activity: Activity[];
  projectsAsTechnician: Project[];
  projectsAsViewer: Project[];
  projectsAsManager: Project[];
  deleted: boolean;
}

export enum Role {
  USER = "USER",
  ADMIN = "ADMIN",
}

export interface Tag {
  id: string;
  name: string;
  users: User[];
  projects: Project[];
  deleted: boolean;
}

export interface Project {
  id: string;
  name: string;
  company: Company;
  companyId: string;
  description: string;
  startDate: Date;
  endDate: Date;
  tag: Tag[];
  technicians: User[];
  viewers: User[];
  manager: User;
  managerId: string;
  tasks: Task[];
  activity: Activity[];
  deleted: boolean;
}

export interface Task {
  id: string;
  name: string;
  project: Project | null;
  projectId: string | null;
  description: string;
  status: Status;
  priorityLevel: number;
  startDate: Date;
  endDate: Date;
  technicians: User[];
  comments: Comment[];
  files: File[];
  dependencies: string[];
  dependentTasks: Task[];
  deleted: boolean;
  label?: string;
}


export enum Status {
  NOT_STARTED = "NOT_STARTED",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
}

export interface Comment {
  User: any;
  id: string;
  comment: string;
  timeStamp: Date;
  files: File[];
  task: Task;
  taskId: string;
  user: User | null;
  userId: string | null;
  deleted: boolean;
}

export interface File {
  id: string;
  name: string;
  task: Task;
  taskId: string;
  comment: Comment | null;
  commentId: string | null;
  deleted: boolean;
}

export interface Activity {
  id: string;
  user: User;
  project: Project;
  activity: string;
  timestamp: Date | null;
  userId: string;
  projectId: string;
}
