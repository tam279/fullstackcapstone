# Project Management APIs

## GET /api/projects
- **Description:** Retrieves a list of all projects from the database.
- **Parameters:** None
- **Responses:**
    - `200`: Successfully retrieved all projects.
    - `500`: An error occurred while retrieving projects.

## POST /api/projects
- **Description:** Creates a new project in the database.
- **Body parameters:**
    - `name`: Project name.
    - `description`: Project description.
    - `startDate`: Project start date.
    - `endDate`: Project end date.
    - `managerId`: Manager's unique identifier.
    - `companyId`: Company's unique identifier.
- **Responses:**
    - `201`: Successfully created a new project.
    - `500`: An error occurred while creating the project.

## PUT /api/project/:id
- **Description:** Updates a specific project in the database.
- **Path parameters:**
    - `id`: Project's unique identifier.
- **Body parameters:** Same as POST /api/projects
- **Responses:**
    - `200`: Successfully updated the project.
    - `500`: An error occurred while updating the project.

## DELETE /api/project/:id
- **Description:** Deletes a specific project from the database.
- **Path parameters:**
    - `id`: Project's unique identifier.
- **Responses:**
    - `200`: Successfully deleted the project.
    - `500`: An error occurred while deleting the project.

## GET /api/project/:id
- **Description:** Retrieves a specific project by ID from the database.
- **Path parameters:**
    - `id`: Project's unique identifier.
- **Responses:**
    - `200`: Successfully retrieved the project.
    - `404`: Project not found.
    - `500`: An error occurred while retrieving the project.

# Task Management APIs

## GET /api/project/:projectId/tasks
- **Description:** Retrieves all tasks for a specific project from the database.
- **Path parameters:**
    - `projectId`: Project's unique identifier.
- **Responses:**
    - `200`: Successfully retrieved all tasks.
    - `500`: An error occurred while retrieving tasks.

## POST /api/project/:projectId/tasks
- **Description:** Creates a new task for a specific project in the database.
- **Path parameters:**
    - `projectId`: Project's unique identifier.
- **Body parameters:**
    - `name`: Task name.
    - `description`: Task description.
    - `status`: Task status.
    - `startDate`: Task start date.
    - `endDate`: Task end date.
- **Responses:**
    - `201`: Successfully created a new task.
    - `500`: An error occurred while creating the task.

## PUT /api/project/:projectId/task/:taskId
- **Description:** Updates a specific task for a project in the database.
- **Path parameters:**
    - `projectId`: Project's unique identifier.
    - `taskId`: Task's unique identifier.
- **Body parameters:** Same as POST /api/project/:projectId/tasks
- **Responses:**
    - `200`: Successfully updated the task.
    - `500`: An error occurred while updating the task.

## DELETE /api/project/:projectId/task/:taskId
- **Description:** Deletes a specific task from the database.
- **Path parameters:**
    - `projectId`: Project's unique identifier.
    - `taskId`: Task's unique identifier.
- **Responses:**
    - `200`: Successfully deleted the task.
    - `500`: An error occurred while deleting the task.

## GET /api/project/:projectId/task/:taskId
- **Description:** Retrieves a specific task for a project from the database.
- **Path parameters:**
    - `projectId`: Project's unique identifier.
    - `taskId`: Task's unique identifier.
- **Responses:**
    - `200`: Successfully retrieved the task.
    - `404`: Task not found.
    - `500`: An error occurred while retrieving the task.

# Comment Management APIs

## GET /api/tasks/:taskId/comments
- **Description:** Retrieves all comments for a specific task from the database.
- **Path parameters:**
    - `taskId`: Task's unique identifier.
- **Responses:**
    - `200`: Successfully retrieved all comments.
    - `500`: An error occurred while retrieving comments.

## POST /api/tasks/:taskId/comments
- **Description:** Creates a new comment for a specific task in the database.
- **Path parameters:**
    - `taskId`: Task's unique identifier.
- **Body parameters:**
    - `userId`: User's unique identifier making the comment.
    - `comment`: The comment text.
- **Responses:**
    - `201`: Successfully created a new comment.
    - `500`: An error occurred while creating the comment.

## DELETE /api/tasks/:taskId/comments/:commentId
- **Description:** Deletes a specific comment from the database.
- **Path parameters:**
    - `taskId`: Task's unique identifier.
    - `commentId`: Comment's unique identifier.
- **Responses:**
    - `200`: Successfully deleted the comment.
    - `500`: An error occurred while deleting the comment.

# User Activity Management APIs

## GET /api/userActivity/:projectId
- **Description:** Retrieves user activities for a specific project from the database.
- **Path parameters:**
    - `projectId`: Project's unique identifier.
- **Responses:**
    - `200`: Successfully retrieved the user activities.
    - `500`: An error occurred while retrieving user activities.
