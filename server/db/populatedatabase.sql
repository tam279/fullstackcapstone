-- Insert into COMPANY
INSERT INTO COMPANY (
    COMPANYNAME,
    CREATED_AT,
    ISACTIVE,
    ADDRESS,
    PHONE_NUMBER,
    WEBSITE
) VALUES (
    'Company 1',
    '2023-01-01 00:00:00',
    1,
    '123 Company St',
    '1234567890',
    'www.company1.com'
),
(
    'Company 2',
    '2023-01-01 00:00:00',
    1,
    '456 Company St',
    '0987654321',
    'www.company2.com'
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

-- Insert into USER
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
    'manager@company1.com',
    'hashed_password',
    'Manager',
    'One',
    1,
    1,
    'Tag 1',
    1,
    1,
    3,
    '1234567890',
    'Manager'
),
(
    'tech@company1.com',
    'hashed_password',
    'Technician',
    'One',
    1,
    1,
    'Tag 2',
    1,
    2,
    3,
    '1234567890',
    'Technician'
),
(
    'viewer@company1.com',
    'hashed_password',
    'Viewer',
    'One',
    1,
    1,
    'Tag 3',
    1,
    3,
    3,
    '1234567890',
    'Viewer'
);

-- Insert into PROJECT
INSERT INTO PROJECT (
    NAME,
    DESCRIPTION,
    STARTDATE,
    ENDDATE,
    STATUS,
    ISACTIVE,
    COMPANYID
) VALUES (
    'Project 1',
    'Project description',
    '2023-01-01',
    '2023-12-31',
    'In Progress',
    1,
    1
),
(
    'Project 2',
    'Project description',
    '2023-01-01',
    '2023-12-31',
    'In Progress',
    1,
    1
);

-- Insert into PROJECT_MANAGER_BRIDGE
INSERT INTO PROJECT_MANAGER_BRIDGE (
    PROJECTID,
    MANAGEREMAIL
) VALUES (
    1,
    'manager@company1.com'
),
(
    2,
    'manager@company1.com'
);

-- Insert into PROJECT_TECHNICIAN_BRIDGE
INSERT INTO PROJECT_TECHNICIAN_BRIDGE (
    PROJECTID,
    TECHNICIANEMAIL
) VALUES (
    1,
    'tech@company1.com'
),
(
    2,
    'tech@company1.com'
);

-- Insert into VIEWER_BRIDGE
INSERT INTO VIEWER_BRIDGE (
    PROJECTID,
    VIEWEREMAIL
) VALUES (
    1,
    'viewer@company1.com'
),
(
    2,
    'viewer@company1.com'
);

-- Insert into TASK
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
    TAG,
    FILTER
) VALUES (
    'Task 1',
    '2023-01-01 00:00:00',
    '2023-01-31 00:00:00',
    50,
    'Task description',
    'In Progress',
    'High',
    1,
    1,
    30,
    'Tag 1',
    'Filter 1'
),
(
    'Task 2',
    '2023-02-01 00:00:00',
    '2023-02-28 00:00:00',
    0,
    'Task description',
    'Not Started',
    'Low',
    1,
    1,
    28,
    'Tag 2',
    'Filter 2'
);

-- Insert into USER_ACTIVITY
INSERT INTO USER_ACTIVITY (
    EMAIL,
    TIMESTAMP,
    DESCRIPTION,
    PROJECTID
) VALUES (
    'manager@company1.com',
    '2023-07-01 10:00:00',
    'Manager One created Project 1',
    1
);

INSERT INTO USER_ACTIVITY (
    EMAIL,
    TIMESTAMP,
    DESCRIPTION,
    PROJECTID
) VALUES (
    'tech@company1.com',
    '2023-07-02 14:30:00',
    'Technician One updated Task 1 progress to 75%',
    1
);

-- Insert into TASK_TECHNICIAN_BRIDGE
INSERT INTO TASK_TECHNICIAN_BRIDGE (
    EMAIL,
    TASKID
) VALUES (
    'tech@company1.com',
    1
),
(
    'tech@company1.com',
    2
);

-- UPDATE `pmsdatabase`.`user` SET `PASSWORD` = 'lpB6FxNA2Lm33TVyI5pEuuQVMulZjyyrN4Yx8Mm9ySrAD374GdOtm' WHERE (`EMAIL` = 'admin@companyone.com');
-- UPDATE `pmsdatabase`.`user` SET `PASSWORD` = 'lpB6FxNA2Lm33TVyI5pEuuQVMulZjyyrN4Yx8Mm9ySrAD374GdOtm' WHERE (`EMAIL` = 'manager@companyone.com');
-- UPDATE `pmsdatabase`.`user` SET `PASSWORD` = 'lpB6FxNA2Lm33TVyI5pEuuQVMulZjyyrN4Yx8Mm9ySrAD374GdOtm' WHERE (`EMAIL` = 'technician@companytwo.com');
-- UPDATE `pmsdatabase`.`user` SET `PASSWORD` = 'lpB6FxNA2Lm33TVyI5pEuuQVMulZjyyrN4Yx8Mm9ySrAD374GdOtm' WHERE (`EMAIL` = 'viewer@companythree.com');