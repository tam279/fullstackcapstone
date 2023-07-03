-- Sample data for COMPANY table
INSERT INTO COMPANY (
    COMPANYNAME,
    CREATED_AT,
    ISACTIVE,
    ADDRESS,
    PHONE_NUMBER,
    WEBSITE
) VALUES (
    'ABC Corporation',
    '2022-01-01',
    1,
    '123 Main Street',
    '123-456-7890',
    'www.abccorp.com'
),
(
    'XYZ Ltd.',
    '2022-02-01',
    1,
    '456 Oak Avenue',
    '987-654-3210',
    'www.xyzltd.com'
);

-- Sample data for ROLE table
INSERT INTO ROLE (
    ROLENAME
) VALUES (
    'Admin'
),
(
    'Manager'
),
(
    'Technician'
),
(
    'User'
);

-- Sample data for LOGIN_METHOD table
INSERT INTO LOGIN_METHOD (
    METHODNAME
) VALUES (
    'Mircosoft'
),
(
    'Google'
),
(
    'Customer password'
);

-- Sample data for USER table
-- Sample data for USER table
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
    'john.doe@example.com',
    'password123',
    'John',
    'Doe',
    1,
    1,
    'Tag1',
    1,
    1,
    1,
    '123-456-7890',
    'Manager'
),
(
    'jane.smith@example.com',
    'password456',
    'Jane',
    'Smith',
    1,
    1,
    'Tag2',
    1,
    2,
    1,
    '987-654-3210',
    'User'
),
(
    'tech.user@example.com',
    'password789',
    'Tech',
    'User',
    1,
    1,
    'Tag3',
    2,
    3,
    1,
    '555-555-5555',
    'Technician'
);

-- Sample data for USER_ACTIVITY table
INSERT INTO USER_ACTIVITY (
    EMAIL,
    TIMESTAMP,
    DESCRIPTION
) VALUES (
    'john.doe@example.com',
    '2022-01-01 09:00:00',
    'Logged in'
),
(
    'jane.smith@example.com',
    '2022-01-02 10:00:00',
    'Updated profile'
),
(
    'tech.user@example.com',
    '2022-01-03 11:00:00',
    'Viewed tasks'
);

-- Sample data for PROJECT table
INSERT INTO PROJECT (
    NAME,
    STARTDATE,
    ENDDATE,
    PROGRESS,
    MANAGEREMAIL,
    DESCRIPTION,
    COMPANYID,
    ISACTIVE
) VALUES (
    'Project A',
    '2022-01-01',
    '2022-02-01',
    50,
    'john.doe@example.com',
    'Description of Project A',
    1,
    1
),
(
    'Project B',
    '2022-02-01',
    '2022-03-01',
    25,
    'john.doe@example.com',
    'Description of Project B',
    1,
    1
),
(
    'Project C',
    '2022-03-01',
    '2022-04-01',
    75,
    'jane.smith@example.com',
    'Description of Project C',
    1,
    1
);

-- Sample data for VIEWER_BRIDGE table
INSERT INTO VIEWER_BRIDGE (
    EMAIL,
    PROJECTID
) VALUES (
    'jane.smith@example.com',
    1
),
(
    'tech.user@example.com',
    2
);

-- Sample data for TASK table
INSERT INTO TASK (
    NAME,
    STARTDATE,
    ENDDATE,
    PROGRESS,
    DESCRIPTION,
    STATUS,
    PRIORITY,
    ISACTIVE,
    PROJECTID
) VALUES (
    'Task 1',
    '2022-01-01',
    '2022-01-10',
    80,
    'Description of Task 1',
    'In Progress',
    'High',
    1,
    1
),
(
    'Task 2',
    '2022-01-05',
    '2022-01-15',
    60,
    'Description of Task 2',
    'In Progress',
    'Medium',
    1,
    1
),
(
    'Task 3',
    '2022-02-01',
    '2022-02-10',
    90,
    'Description of Task 3',
    'Completed',
    'High',
    1,
    2
),
(
    'Task 4',
    '2022-02-05',
    '2022-02-15',
    50,
    'Description of Task 4',
    'In Progress',
    'Medium',
    1,
    2
),
(
    'Task 5',
    '2022-03-01',
    '2022-03-10',
    70,
    'Description of Task 5',
    'In Progress',
    'High',
    1,
    3
);

-- Sample data for TASK_USER_BRIDGE table
INSERT INTO TASK_USER_BRIDGE (
    EMAIL,
    TASKID
) VALUES (
    'jane.smith@example.com',
    1
),
(
    'tech.user@example.com',
    2
),
(
    'tech.user@example.com',
    3
);

-- Sample data for TASK_TECHNICIAN_BRIDGE table
INSERT INTO TASK_TECHNICIAN_BRIDGE (
    EMAIL,
    TASKID
) VALUES (
    'tech.user@example.com',
    1
),
(
    'tech.user@example.com',
    2
),
(
    'tech.user@example.com',
    3
);

-- Sample data for TAG table
INSERT INTO TAG (
    TAGNAME
) VALUES (
    'Tag1'
),
(
    'Tag2'
),
(
    'Tag3'
);

-- Sample data for USERTAGBRIDGE table
INSERT INTO USERTAGBRIDGE (
    TAGID,
    EMAIL
) VALUES (
    1,
    'jane.smith@example.com'
),
(
    2,
    'jane.smith@example.com'
),
(
    3,
    'tech.user@example.com'
);

-- Sample data for PROJECTTAGBRIDGE table
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

-- Sample data for COMMENT table
INSERT INTO COMMENT (
    COMMENT,
    DATE,
    TASKID,
    EMAIL
) VALUES (
    'Comment 1',
    '2022-01-02',
    1,
    'jane.smith@example.com'
),
(
    'Comment 2',
    '2022-01-03',
    1,
    'john.doe@example.com'
),
(
    'Comment 3',
    '2022-02-05',
    3,
    'jane.smith@example.com'
);

-- Sample data for FILE table
INSERT INTO FILE (
    FILENAME,
    FILELOCATION
) VALUES (
    'File 1',
    '/path/to/file1'
),
(
    'File 2',
    '/path/to/file2'
),
(
    'File 3',
    '/path/to/file3'
);

-- Sample data for COMMENT_FILE_BRIDGE table
INSERT INTO COMMENT_FILE_BRIDGE (
    COMMENTID,
    FILEID
) VALUES (
    1,
    1
),
(
    1,
    2
),
(
    2,
    3
);

-- Sample data for TASK_FILE_BRIDGE table
INSERT INTO TASK_FILE_BRIDGE (
    FILEID,
    TASKID
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
    3
);

-- Sample data for DEPENDENCY_BRIDGE table
INSERT INTO DEPENDENCY_BRIDGE (
    TASKID,
    DEPENDSON_TASKID
) VALUES (
    2,
    1
),
(
    3,
    2
),
(
    4,
    1
);

-- Sample data for PASSWORD_RESET_TOKENS table
INSERT INTO PASSWORD_RESET_TOKENS (
    EMAIL,
    TOKEN,
    EXPIRY_DATE
) VALUES (
    'john.doe@example.com',
    'token123',
    '2022-01-01 12:00:00'
),
(
    'jane.smith@example.com',
    'token456',
    '2022-02-01 12:00:00'
);