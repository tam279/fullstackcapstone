API Documentation
Project API:
GET /api/projects - Gets all projects.
POST /api/projects - Creates a new project. Request body must include NAME, DESCRIPTION, STARTDATE, ENDDATE, PROGRESS, STATUS, PRIORITY, and MANAGERID.
PUT /api/projects/:id - Updates an existing project with the specified ID. Request body can include NAME, DESCRIPTION, STARTDATE, ENDDATE, PROGRESS, STATUS, PRIORITY, and MANAGERID.
DELETE /api/projects/:id - Deletes an existing project with the specified ID.
GET /api/projects/:id - Fetches a specific project.

Tasks
GET /api/tasks - Gets all tasks.
POST /api/tasks - Creates a new task. Request body must include NAME, STARTDATE, ENDDATE, PROGRESS, DESCRIPTION, STATUS, PRIORITY, and PROJECTID.
PUT /api/tasks/:id - Updates an existing task with the specified ID. Request body can include NAME, STARTDATE, ENDDATE, PROGRESS, DESCRIPTION, STATUS, PRIORITY, and PROJECTID.
DELETE /api/tasks/:id - Deletes an existing task with the specified ID.
GET /api/tasks/:id - Fetches a specific task.

Users
GET /api/users - Gets all users.
POST /api/users - Creates a new user. Request body must include EMAIL, PASSWORD, ROLEID, COMPANYID, METHODID, FIRSTNAME, LASTNAME, PHONE_NUMBER, TAG, and JOBTITLE.
PUT /api/users/:email - Updates an existing user with the specified email. Request body can include PASSWORD, ROLEID, COMPANYID, METHODID, FIRSTNAME, LASTNAME, PHONE_NUMBER, TAG, and JOBTITLE.
DELETE /api/users/:email - Deletes an existing user with the specified email.
PATCH /api/users/:email/deactivate - Deactivates an existing user with the specified email.
GET /api/users/:email - Fetches a specific user.

Comments
GET /api/comments - Gets all comments.
POST /api/comments - Creates a new comment. Request body must include CONTENT, USERID, TASKID, and CREATEDAT.
PUT /api/comments/:id - Updates an existing comment with the specified ID. Request body can include CONTENT, USERID, TASKID, and CREATEDAT.
DELETE /api/comments/:id - Deletes an existing comment with the specified ID.
GET /api/comments/:id - Fetches a specific comment.