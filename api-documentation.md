API Documentation
Projects
GET /api/projects - Gets all projects.

POST /api/projects - Creates a new project. Request body must include NAME, DESCRIPTION, STARTDATE, ENDDATE, PROGRESS, STATUS, PRIORITY, and MANAGERID.

PUT /api/projects/:id - Updates an existing project with the specified ID. Request body can include NAME, DESCRIPTION, STARTDATE, ENDDATE, PROGRESS, STATUS, PRIORITY, and MANAGERID.

DELETE /api/projects/:id - Deletes an existing project with the specified ID.

Tasks
GET /api/tasks - Gets all tasks.

POST /api/tasks - Creates a new task. Request body must include NAME, STARTDATE, ENDDATE, PROGRESS, DESCRIPTION, STATUS, PRIORITY, and PROJECTID.

PUT /api/tasks/:id - Updates an existing task with the specified ID. Request body can include NAME, STARTDATE, ENDDATE, PROGRESS, DESCRIPTION, STATUS, PRIORITY, and PROJECTID.

DELETE /api/tasks/:id - Deletes an existing task with the specified ID.

Users
GET /api/users - Gets all users.

GET /api/companies - Gets all companies.

GET /api/roles - Gets all roles.

GET /api/login-methods - Gets all login methods.

POST /api/users - Creates a new user. Request body must include firstName, lastName, email, password, roleID, companyID, methodID, phoneNumber, tag, and jobTitle.

PUT /api/users/:email - Updates an existing user with the specified email. Request body can include firstName, lastName, companyId, roleId, loginMethodId, phoneNumber, and jobTitle.

DELETE /api/users/:email - Deletes an existing user with the specified email.

PUT /api/users/deactivate/:email - Deactivates an existing user with the specified email.

Companies
POST /api/companies - Creates a new company. Request body must include companyName, address, phoneNumber, and website.

PUT /api/companies/:id - Updates an existing company with the specified ID. Request body can include companyName, address, phoneNumber, and website.

DELETE /api/companies/:id - Deletes an existing company with the specified ID.