/* The code provided is defining a set of TypeScript interfaces that represent the data structure of a
project management system. These interfaces define the shape and properties of various entities such
as companies, users, projects, tasks, comments, and files. Each interface specifies the required
fields and their types, allowing for type checking and enforcing a specific structure for the data
used in the project management system. Additionally, there are enums defined for user roles and task
statuses to provide a set of predefined values for these fields. */

export interface Company {
  id: string;
  name: string;
  address: string;
  phoneNumber: string;
  website: string;
  users: User[];
  projects: Project[];
  deleted: boolean;
    // Allow dynamic keys
    [key: string]: any;
}

// User interface with all necessary fields
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
  tags: string; 
  tasks: Task[];
  comments: Comment[];
  projectsAsTechnician: Project[];
  projectsAsViewer: Project[];
  projectsAsManager: Project[];
  deleted: boolean;
    // Allow dynamic keys
    [key: string]: any;
}

// Enum for user roles
export enum Role {
  USER = "USER",
  ADMIN = "ADMIN",
}

// Project interface with all necessary fields
export interface Project {
  id: string;
  name: string;
  company: Company;
  companyId: string;
  description: string;
  startDate: Date;
  endDate: Date;
 // tag: Tag[];
  technicians: User[];
  viewers: User[];
  manager: User;
  managerId: string;
  tasks: Task[];
  deleted: boolean;
}

// Task interface with all necessary fields
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
  dependencies?: string;
  deleted: boolean;
  label?: string;
}

// Enum for task statuses
export enum Status {
  NOT_STARTED = "NOT_STARTED",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
}

// Comment interface with all necessary fields
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
// File interface with all necessary fields
export interface File {
  id: string;
  name: string;
  task: Task;
  taskId: string;
  comment: Comment | null;
  commentId: string | null;
  deleted: boolean;
}

