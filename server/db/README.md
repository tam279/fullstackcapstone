A user is created: When a new user is added to the system, you will need to insert a new record into the USER table with the user’s information.
A user is updated: When a user’s information changes, such as when they change their password or update their contact information, you will need to update the corresponding record in the USER table.
A user is deleted: When a user is removed from the system, you will need to delete their record from the USER table. Alternatively, you could set their ISACTIVE field to 0 to indicate that they are no longer active.


A company is created: When a new company is added to the system, you will need to insert a new record into the COMPANY table with the company’s information.
A company is updated: When a company’s information changes, such as when they change their address or phone number, you will need to update the corresponding record in the COMPANY table.
A company is deleted: When a company is removed from the system, you will need to delete their record from the COMPANY table. Alternatively, you could set their ISACTIVE field to 0 to indicate that they are no longer active.

A project is created: When a new project is added to the system, you will need to insert a new record into the PROJECT table with the project’s information.
A project is updated: When a project’s information changes, such as when its start or end date is updated, you will need to update the corresponding record in the PROJECT table.
A project is deleted: When a project is removed from the system, you will need to delete its record from the PROJECT table. Alternatively, you could set its ISACTIVE field to 0 to indicate that it is no longer active.
A task is created: When a new task is added to the system, you will need to insert a new record into the TASK table with the task’s information.
A task is updated: When a task’s information changes, such as when its progress or status is updated, you will need to update the corresponding record in the TASK table.
A task is deleted: When a task is removed from the system, you will need to delete its record from the TASK table. Alternatively, you could set its ISACTIVE field to 0 to indicate that it is no longer active.


A comment is created: When a new comment is added to the system, you will need to insert a new record into the COMMENT table with the comment’s information.
A comment is updated: When a comment’s information changes, such as when its text is edited, you will need to update the corresponding record in the COMMENT table.
A comment is deleted: When a comment is removed from the system, you will need to delete its record from the COMMENT table.
A file is uploaded: When a new file is uploaded to the system, you will need to insert a new record into the FILE table with the file’s information.
A file is updated: When a file’s information changes, such as when its name or description is updated, you will need to update the corresponding record in the FILE table.
A file is deleted: When a file is removed from the system, you will need to delete its record from the FILE table.

A tag is created: When a new tag is added to the system, you will need to insert a new record into the TAG table with the tag’s information.
A tag is updated: When a tag’s information changes, such as when its name is edited, you will need to update the corresponding record in the TAG table.
A tag is deleted: When a tag is removed from the system, you will need to delete its record from the TAG table.
A user is assigned to a project: When a user is assigned to a project, you will need to insert a new record into the VIEWER_BRIDGE table to associate the user with the project.
A user is removed from a project: When a user is removed from a project, you will need to delete the corresponding record from the VIEWER_BRIDGE table.
A user is assigned to a task: When a user is assigned to a task, you will need to insert a new record into the TASK_USER_BRIDGE or TASK_TECHNICIAN_BRIDGE table to associate the user with the task.
A user is removed from a task: When a user is removed from a task, you will need to delete the corresponding record from the TASK_USER_BRIDGE or TASK_TECHNICIAN_BRIDGE table.

Generating reports: Your application may need to generate reports based on the data stored in the database. For example, you could generate a report of all tasks assigned to a specific user, or a report of all projects managed by a specific user.
Searching for data: Your application may need to provide search functionality to allow users to find specific data in the database. For example, you could allow users to search for tasks by name, or search for projects by start date.
Exporting data: Your application may need to provide functionality for exporting data from the database. For example, you could allow users to export a list of all tasks assigned to them, or export a list of all projects managed by them.

