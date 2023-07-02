# Project Description

This README.md file provides a quick description of our system and its functionality.

## Landing Page

Our platform begins with a landing page that features a navigation bar and a footer.

### Navigation Bar

The navigation bar includes the following options:
- Vitra Icon (redirects to Landing Page)
- Services
- Contact
- About
- Log In

### Footer

The footer contains the following information:
- Vitra Services © 2022 - 2023
- Privacy
- Terms

## User Management

Our system focuses on user management to prevent unauthorized access and control account creation.

### Access Request

Admins handle access requests based on a user list from the client. New users are required to sign a privacy policy to acknowledge our system's policies.

### User Information

We collect the following user information:
- EMAIL (Primary Key)
- FIRSTNAME
- LASTNAME
- LOGIN METHOD (Google, Microsoft, Custom Passwords)
- COMPANY NAME
- TAGS

### Login Method

Users can log in using Google, Microsoft, or custom passwords. Those opting for custom passwords receive a temporary password via email, which they can change through the 'Settings' sidebar.

## Project Management

Upon logging in, admins gain access to the "Project List," while other roles can only view their assigned projects. The project list displays a table with columns for Name, Status, Progress, Deadline, Company, Manager, and options for filtering/sorting. Only admins can click "+ New Project," but managers can edit projects.

Clicking a project name directs users to its task list under "Task Management."

## Task Management

The task list is divided into four tabs.

### Task Tab

The "Task" tab provides information on tasks, including Name, Priority, Technician, Duration, Tag, and filter options. Managers and IT Technicians can edit tasks, while admins, project managers, or IT technicians can delete tasks, moving them to a backup database.

### Task Details and Comments

Clicking a task name opens the task details and comments section. Users with task access can comment and upload files, which are deletable but stored in a backup database.

### Task Priority

Tasks can be assigned priority levels such as High, Medium, or Low. A "Start Task" button allows users to change the task status to Not Started, Start Task, or Complete.

### Gantt Tab

The "Gantt" tab displays the task list alongside a Gantt chart, providing a visual representation of tasks with their respective dates and durations.

### Details Tab

The "Details" tab contains additional project information, including Project, Manager, Description, Start Date, End Date, Technicians, Viewers, Status, Total Tasks, and Completed Tasks.

### User Activity Tab

The "User Activity" tab tracks user activities, listing the Date, Time, User, and Detail. This tab is accessible only to admins.

---

This README.md file serves as a quick reference for understanding the system's functionality, including user management, project management, and task management. It provides an overview of the user roles, their capabilities, and the features they can utilize.

For more detailed information and implementation instructions, please refer to the relevant documentation and codebase.
