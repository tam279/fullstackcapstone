Project Management Web App
Overview
This User Management Web App is a full-stack application that serves as a platform for managing users within an organization, and managing tasks assigned to them. This project was developed using Typescript and ReactJS for the frontend, and Prisma, Node.js, and Express.js in the backend.

Frontend
The frontend of the app is located in the client folder. It contains several components and pages which collectively make up the User Interface of the application.

Here is a brief description of the primary directories:

components: This directory contains the reusable components that make up the different parts of the web pages. It includes Footer, Navigation, PrivateRoute, SidebarProject.

modals: This directory contains the modal components that are used across the application. They include ChangePasswordModal, CreateNewCompanyModal, CreateNewProjectModal, CreateNewTaskModal, CreateNewUserModal, EditCompanyModal, EditProjectModal, EditTaskModal, EditUserModal, LogoutModal, ProfileModal, TaskDetailModal.

pages: This directory includes the code for the web pages. Each subdirectory corresponds to a different page in the application, such as AboutPage, ContactPage, LandingPage, LoginPage, ProjectDetailPage, ProjectListPage, ServicesPage, UserManagementPage.

To run the frontend locally, navigate to the client directory and run npm install followed by npm start.

Backend
The backend of the app is located in the server folder. It contains several controllers for handling different types of requests, as well as the database schema for Prisma.

Here is a brief description of the primary directories:

auth: This directory contains the Passport.js configurations and the auth-related API routes.

controllers: This directory contains the controller functions that handle the various HTTP requests related to activities, comments, companies, projects, tasks, and users.

db/prisma: This directory contains the Prisma client setup file and the Prisma schema.

service: This directory contains services that provide features such as file handling and email sending.

To run the backend locally, navigate to the server directory and run npm install followed by npm start.

Documentation
Please refer to api-documentation.md for a detailed description of the API endpoints and their responses.

Contributing
When contributing to this repository, please discuss the change you wish to make via issue, email, or any other method with the owners of this repository before making a change.

License
This project is licensed under the MIT License - see the LICENSE.md file for details.
