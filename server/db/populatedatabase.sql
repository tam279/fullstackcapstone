INSERT INTO COMPANY (
    COMPANYNAME,
    CREATED_AT,
    ISACTIVE,
    ADDRESS,
    PHONE_NUMBER,
    WEBSITE
) VALUES (
    'ABC Inc.',
    '2023-05-15 10:30:00',
    1,
    '123 Main St, City',
    '123-456-7890',
    'www.abcinc.com'
),
(
    'XYZ Corporation',
    '2023-06-01 09:45:00',
    1,
    '456 Elm St, Town',
    '987-654-3210',
    'www.xyzcorp.com'
);

INSERT INTO ROLE (
    ROLENAME
) VALUES (
    'Manager'
),
(
    'Technician'
),
(
    'Viewer'
);

INSERT INTO LOGIN_METHOD (
    METHODNAME
) VALUES (
    'Google'
),
(
    'Mircosoft'
),
(
    'Our custom password'
);

INSERT INTO USER (
    EMAIL,
    PASSWORD,
    FIRSTNAME,
    LASTNAME,
    ISACTIVE,
    IS_EMAIL_VERIFIED,
    TAG,
    COMPANYID,
    ROLEID,
    METHODID,
    PHONE_NUMBER,
    JOB_TITLE
) VALUES (
    'manager@example.com',
    'password123',
    'John',
    'Doe',
    1,
    1,
    'Manager',
    1,
    1,
    1,
    '123-456-7890',
    'Project Manager'
),
(
    'technician1@example.com',
    'password456',
    'Jane',
    'Smith',
    1,
    1,
    'Technician',
    1,
    2,
    1,
    '987-654-3210',
    'Field Technician'
),
(
    'technician2@example.com',
    'password789',
    'Mike',
    'Johnson',
    1,
    1,
    'Technician',
    1,
    2,
    1,
    '555-123-4567',
    'Service Technician'
),
(
    'viewer@example.com',
    'password123',
    'Emily',
    'Davis',
    1,
    1,
    'Viewer',
    1,
    3,
    1,
    '111-222-3333',
    'Viewer'
);

INSERT INTO PROJECT (
    NAME,
    MANAGEREMAIL,
    TECHNICIANS,
    VIEWERS,
    DESCRIPTION,
    STARTDATE,
    ENDDATE,
    STATUS,
    TOTAL_TASKS,
    COMPLETED_TASKS,
    PROGRESS,
    ISACTIVE,
    COMPANYID
) VALUES (
    'Project 1',
    'manager@example.com',
    'technician1@example.com,technician2@example.com',
    'viewer@example.com',
    'Sample project A',
    '2023-07-01',
    '2023-07-31',
    'In Progress',
    5,
    2,
    40,
    1,
    1
),
(
    'Project B',
    'manager@example.com',
    'technician2@example.com',
    'viewer@example.com',
    'Sample project B',
    '2023-08-01',
    '2023-08-31',
    'Not Started',
    3,
    0,
    0,
    1,
    1
);

INSERT INTO USER_ACTIVITY (
    EMAIL,
    DESCRIPTION,
    PROJECTID
) VALUES (
    'manager@example.com',
    'Created Project A',
    1
),
(
    'manager@example.com',
    'Assigned technicians to Project A',
    1
),
(
    'manager@example.com',
    'Created Project B',
    2
),
(
    'manager@example.com',
    'Assigned technician to Project B',
    2
);

INSERT INTO TASK (
    NAME,
    STARTDATE,
    ENDDATE,
    PROGRESS,
    DESCRIPTION,
    STATUS,
    PRIORITY,
    ISACTIVE,
    PROJECTID,
    DURATION,
    TECHNICIAN,
    TAG,
    FILTER
) VALUES (
    'Task 1',
    '2023-07-01 10:00:00',
    '2023-07-03 15:00:00',
    100,
    'Sample task 1',
    'Completed',
    'High',
    1,
    1,
    2,
    'technician1@example.com',
    'Tag 1',
    'Filter 1'
),
(
    'Task 2',
    '2023-07-02 09:00:00',
    '2023-07-05 12:00:00',
    50,
    'Sample task 2',
    'In Progress',
    'Medium',
    1,
    1,
    3,
    'technician1@example.com',
    'Tag 2',
    'Filter 1'
),
(
    'Task 3',
    '2023-07-03 11:00:00',
    '2023-07-06 14:00:00',
    25,
    'Sample task 3',
    'Not Started',
    'Low',
    1,
    1,
    4,
    'technician2@example.com',
    'Tag 1',
    'Filter 2'
),
(
    'Task 4',
    '2023-07-04 12:00:00',
    '2023-07-04 16:00:00',
    15,
    'Sample task 4',
    'Not Started',
    'Low',
    1,
    1,
    4,
    'technician2@example.com',
    'Tag 3',
    'Filter 2'
),
(
    'Task 5',
    '2023-07-05 12:00:00',
    '2023-07-04 17:00:00',
    0,
    'Sample task 5',
    'Not Started',
    'Low',
    1,
    1,
    4,
    'technician2@example.com',
    'Tag 5',
    'Filter 2'
);

INSERT INTO TAG (
    TAGNAME
) VALUES (
    'Tag 1'
),
(
    'Tag 2'
),
(
    'Tag 3'
);

INSERT INTO VIEWER_BRIDGE (
    EMAIL,
    PROJECTID
) VALUES (
    'viewer@example.com',
    1
),
(
    'viewer@example.com',
    2
);

INSERT INTO TASK_USER_BRIDGE (
    EMAIL,
    TASKID
) VALUES (
    'technician1@example.com',
    1
),
(
    'technician1@example.com',
    2
),
(
    'technician2@example.com',
    1
),
(
    'technician2@example.com',
    3
);

INSERT INTO TASK_TECHNICIAN_BRIDGE (
    EMAIL,
    TASKID
) VALUES (
    'technician1@example.com',
    1
),
(
    'technician1@example.com',
    2
),
(
    'technician2@example.com',
    3
);

INSERT INTO USERTAGBRIDGE (
    TAGID,
    EMAIL
) VALUES (
    1,
    'manager@example.com'
),
(
    2,
    'technician1@example.com'
),
(
    2,
    'technician2@example.com'
),
(
    3,
    'viewer@example.com'
);

INSERT INTO PROJECTTAGBRIDGE (
    TAGID,
    PROJECTID
) VALUES (
    1,
    1
),
(
    2,
    1
),
(
    3,
    2
);

INSERT INTO COMMENT (
    COMMENT,
    DATE,
    TASKID,
    EMAIL
) VALUES (
    'This is a comment.',
    '2023-07-01',
    1,
    'manager@example.com'
),
(
    'Another comment.',
    '2023-07-02',
    1,
    'technician1@example.com'
);

INSERT INTO FILE (
    FILENAME,
    FILELOCATION
) VALUES (
    'File 1',
    '/path/to/file1.pdf'
),
(
    'File 2',
    '/path/to/file2.pdf'
);

INSERT INTO COMMENT_FILE_BRIDGE (
    COMMENTID,
    FILEID
) VALUES (
    1,
    1
),
(
    2,
    2
);

INSERT INTO TASK_FILE_BRIDGE (
    FILEID,
    TASKID
) VALUES (
    1,
    1
),
(
    2,
    2
);

INSERT INTO DEPENDENCY_BRIDGE (
    TASKID,
    DEPENDSON_TASKID
) VALUES (
    2,
    1
),
(
    3,
    1
),
(
    3,
    2
);

INSERT INTO PASSWORD_RESET_TOKENS (
    EMAIL,
    TOKEN,
    EXPIRY_DATE
) VALUES (
    'manager@example.com',
    'token123',
    '2023-07-31 23:59:59'
);