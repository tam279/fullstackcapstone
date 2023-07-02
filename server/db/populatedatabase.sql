-- Sample data for COMPANY
INSERT INTO COMPANY (
    COMPANYNAME,
    CREATED_AT,
    ISACTIVE
) VALUES (
    'CompanyA',
    NOW(),
    1
),
(
    'CompanyB',
    NOW(),
    1
);

-- Sample data for ROLE
INSERT INTO ROLE (
    ROLENAME
) VALUES (
    'Manager'
),
(
    'Employee'
),
(
    'Technician'
);

-- Sample data for LOGIN_METHOD
INSERT INTO LOGIN_METHOD (
    METHODNAME
) VALUES (
    'Email'
),
(
    'Google'
),
(
    'Facebook'
);

-- Sample data for USER
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
    METHODID
) VALUES (
    'john.doe@example.com',
    'password123',
    'John',
    'Doe',
    1,
    1,
    'tag1',
    1,
    1,
    1
),
(
    'jane.doe@example.com',
    'password456',
    'Jane',
    'Doe',
    1,
    1,
    'tag2',
    1,
    2,
    2
),
(
    'tech@example.com',
    'password789',
    'Tech',
    'User',
    1,
    1,
    'tag3',
    1,
    3,
    1
);

-- Sample data for PROJECT
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
    'Project1',
    '2023-01-01',
    '2023-12-31',
    50,
    'john.doe@example.com',
    'First project description',
    1,
    1
),
(
    'Project2',
    '2023-01-01',
    '2023-12-31',
    20,
    'john.doe@example.com',
    'Second project description',
    1,
    1
);

-- Sample data for TASK
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
    'Task1',
    '2023-01-01',
    '2023-01-31',
    100,
    'First task description',
    'Complete',
    'High',
    1,
    1
),
(
    'Task2',
    '2023-02-01',
    '2023-02-28',
    50,
    'Second task description',
    'InProgress',
    'Medium',
    1,
    1
);

-- Sample data for VIEWER_BRIDGE
INSERT INTO VIEWER_BRIDGE (
    EMAIL,
    PROJECTID
) VALUES (
    'john.doe@example.com',
    1
),
(
    'jane.doe@example.com',
    1
),
(
    'jane.doe@example.com',
    2
);

-- Sample data for TASK_USER_BRIDGE
INSERT INTO TASK_USER_BRIDGE (
    EMAIL,
    TASKID
) VALUES (
    'john.doe@example.com',
    1
),
(
    'jane.doe@example.com',
    2
);

-- Sample data for TASK_TECHNICIAN_BRIDGE
INSERT INTO TASK_TECHNICIAN_BRIDGE (
    EMAIL,
    TASKID
) VALUES (
    'tech@example.com',
    1
),
(
    'tech@example.com',
    2
);

-- Sample data for TAG
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

-- Sample data for USERTAGBRIDGE
INSERT INTO USERTAGBRIDGE (
    TAGID,
    EMAIL
) VALUES (
    1,
    'john.doe@example.com'
),
(
    2,
    'jane.doe@example.com'
),
(
    3,
    'tech@example.com'
);

-- Sample data for PROJECTTAGBRIDGE
INSERT INTO PROJECTTAGBRIDGE (
    TAGID,
    PROJECTID
) VALUES (
    1,
    1
),
(
    2,
    2
);

-- Sample data for COMMENT
INSERT INTO COMMENT (
    COMMENT,
    DATE,
    TASKID,
    EMAIL
) VALUES (
    'This task is complete',
    '2023-01-31',
    1,
    'john.doe@example.com'
),
(
    'This task is halfway done',
    '2023-02-14',
    2,
    'jane.doe@example.com'
);

-- Sample data for FILE
INSERT INTO FILE (
    FILENAME,
    FILELOCATION
) VALUES (
    'file1.txt',
    '/path/to/file1.txt'
),
(
    'file2.txt',
    '/path/to/file2.txt'
);

-- Sample data for COMMENT_FILE_BRIDGE
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

-- Sample data for TASK_FILE_BRIDGE
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

-- Sample data for DEPENDENCY_BRIDGE
INSERT INTO DEPENDENCY_BRIDGE (
    TASKID,
    DEPENDSON_TASKID
) VALUES (
    2,
    1
);

-- Sample data for PASSWORD_RESET_TOKENS
INSERT INTO PASSWORD_RESET_TOKENS (
    EMAIL,
    TOKEN,
    EXPIRY_DATE
) VALUES (
    'john.doe@example.com',
    'reset123',
    DATE_ADD(NOW(), INTERVAL 1 DAY)
);