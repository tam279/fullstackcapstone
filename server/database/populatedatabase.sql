-- Insert sample data

-- Insert sample data into COMPANY table
INSERT INTO COMPANY (COMPANYNAME, CREATED_AT) VALUES
    ('Company A', '2022-01-01'),
    ('Company B', '2022-02-01');

-- Insert sample data into ROLE table
INSERT INTO ROLE (ROLENAME) VALUES
    ('Admin'),
    ('Manager'),
    ('Employee');

-- Insert sample data into LOGIN_METHOD table
INSERT INTO LOGIN_METHOD (METHODNAME) VALUES
    ('Google'),
    ('Microsoft'),
    ('Custom Password');

-- Insert sample data into USER table
INSERT INTO USER (EMAIL, PASSWORD, FIRSTNAME, LASTNAME, COMPANYID, ROLEID, METHODID, TAG) VALUES
    ('user1@example.com', 'password1', 'John', 'Doe', 1, 3, 3, 'Tag1'),
    ('user2@example.com', 'password2', 'Jane', 'Smith', 1, 2, 3, 'Tag2'),
    ('user3@example.com', 'password3', 'Mike', 'Johnson', 2, 2, 1, 'Tag3');

-- Insert sample data into PROJECT table
INSERT INTO PROJECT (NAME, STARTDATE, ENDDATE, MANAGEREMAIL, COMPANYID, ISACTIVE) VALUES
    ('Project A', '2022-01-01', '2022-02-01', 'user1@example.com', 1, 1),
    ('Project B', '2022-02-01', '2022-03-01', 'user2@example.com', 1, 1),
    ('Project C', '2022-03-01', '2022-04-01', 'user1@example.com', 2, 1);

-- Insert sample data into VIEWER_BRIDGE table
INSERT INTO VIEWER_BRIDGE (EMAIL, PROJECTID) VALUES
    ('user2@example.com', 1),
    ('user3@example.com', 2);

-- Insert sample data into TASK table
INSERT INTO TASK (NAME, STARTDATE, ENDDATE, PROJECTID) VALUES
    ('Task 1', '2022-01-01', '2022-01-05', 1),
    ('Task 2', '2022-01-05', '2022-01-10', 1),
    ('Task 3', '2022-02-01', '2022-02-05', 2);

-- Insert sample data into TASK_USER_BRIDGE table
INSERT INTO TASK_USER_BRIDGE (EMAIL, TASKID) VALUES
    ('user1@example.com', 1),
    ('user2@example.com', 1),
    ('user2@example.com', 2);

-- Insert sample data into TAG table
INSERT INTO TAG (TAGNAME) VALUES
    ('Tag A'),
    ('Tag B'),
    ('Tag C');

-- Insert sample data into USERTAGBRIDGE table
INSERT INTO USERTAGBRIDGE (TAGID, EMAIL) VALUES
    (1, 'user1@example.com'),
    (2, 'user2@example.com'),
    (3, 'user3@example.com');

-- Insert sample data into PROJECTTAGBRIDGE table
INSERT INTO PROJECTTAGBRIDGE (TAGID, PROJECTID) VALUES
    (1, 1),
    (2, 1),
    (3, 2);

-- Insert sample data into COMMENT table
INSERT INTO COMMENT (COMMENT, DATE, TASKID, EMAIL) VALUES
    ('Comment 1', '2022-01-01', 1, 'user1@example.com'),
    ('Comment 2', '2022-01-05', 2, 'user2@example.com');

-- Insert sample data into FILE table
INSERT INTO FILE (FILENAME, FILELOCATION) VALUES
    ('File 1', 'path/to/file1'),
    ('File 2', 'path/to/file2');

-- Insert sample data into COMMENT_FILE_BRIDGE table
INSERT INTO COMMENT_FILE_BRIDGE (COMMENTID, FILEID) VALUES
    (1, 1),
    (2, 2);

-- Insert sample data into TASK_FILE_BRIDGE table
INSERT INTO TASK_FILE_BRIDGE (FILEID, TASKID) VALUES
    (1, 1),
    (2, 2);

-- Insert sample data into DEPENDENCY_BRIDGE table
INSERT INTO DEPENDENCY_BRIDGE (TASKID, DEPENDSON_TASKID) VALUES
    (2, 1);
