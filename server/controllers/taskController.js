// taskController.js . Path: C:\Users\nguye\OneDrive\Desktop\project-managment-website\server\controllers\taskController.js
const mysql = require('mysql2/promise');
const db = require('../db/database');

exports.getTasks = async (req, res) => {
    const sql = `
        SELECT
            T.*,
            T.PROJECTID,
            GROUP_CONCAT(U.FIRSTNAME, ' ', U.LASTNAME) AS TECHNICIAN_NAMES,
            D.DEPENDSON_TASKID,
            DT.NAME AS DEPENDENCY_NAME
        FROM
            TASK AS T
        LEFT JOIN
            TASK_TECHNICIAN_BRIDGE AS TT ON T.TASKID = TT.TASKID
        LEFT JOIN
            USER AS U ON TT.EMAIL = U.EMAIL
        LEFT JOIN
            DEPENDENCY_BRIDGE AS D ON T.TASKID = D.TASKID
        LEFT JOIN
            TASK AS DT ON D.DEPENDSON_TASKID = DT.TASKID
        GROUP BY
            T.TASKID, D.DEPENDSON_TASKID, DT.NAME
    `;

    try {
        const [result, fields] = await db.query(sql);
        res.status(200).json(result);
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: 'An error occurred', error: err.message });
    }
};


exports.createTask = async (req, res) => {
    const { NAME, STARTDATE, ENDDATE, PROGRESS, DESCRIPTION, STATUS, PRIORITY, PROJECTID, TECHNICIAN_EMAIL } = req.body;

    // Calculate the duration in milliseconds
    const durationMs = new Date(ENDDATE) - new Date(STARTDATE);

    // Convert duration to total minutes
    const duration = Math.floor(durationMs / (1000 * 60));

    const sql = "INSERT INTO TASK (NAME, STARTDATE, ENDDATE, DURATION, PROGRESS, DESCRIPTION, STATUS, PRIORITY, PROJECTID) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
    const sqlBridge = "INSERT INTO TASK_TECHNICIAN_BRIDGE (EMAIL, TASKID) VALUES (?, ?)";

    try {
        const [result] = await db.query(sql, [NAME, STARTDATE, ENDDATE, duration, PROGRESS, DESCRIPTION, STATUS, PRIORITY, PROJECTID]);

        // Get the ID of the last inserted task
        const lastInsertedTaskId = result.insertId;

        if (TECHNICIAN_EMAIL && TECHNICIAN_EMAIL.length > 0) {
            for (let i = 0; i < TECHNICIAN_EMAIL.length; i++) {
                // Create a bridge between the task and each technician
                await db.query(sqlBridge, [TECHNICIAN_EMAIL[i], lastInsertedTaskId]);
            }
        }

        res.status(200).send({ message: 'Task created successfully' });
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: 'An error occurred', error: err.message });
    }
};



exports.updateTask = async (req, res) => {
    const id = req.params.id;
    const { NAME, STARTDATE, ENDDATE, PROGRESS, DESCRIPTION, STATUS, PRIORITY, PROJECTID, TECHNICIAN_EMAIL } = req.body;
    
    const sqlTask = "UPDATE TASK SET NAME = ?, STARTDATE = ?, ENDDATE = ?, PROGRESS = ?, DESCRIPTION = ?, STATUS = ?, PRIORITY = ?, PROJECTID = ? WHERE TASKID = ?";
    const sqlDeleteBridge = "DELETE FROM TASK_TECHNICIAN_BRIDGE WHERE TASKID = ?";
    const sqlInsertBridge = "INSERT INTO TASK_TECHNICIAN_BRIDGE (EMAIL, TASKID) VALUES (?, ?)";
    
    try {
        const [resultTask] = await db.query(sqlTask, [NAME, STARTDATE, ENDDATE, PROGRESS, DESCRIPTION, STATUS, PRIORITY, PROJECTID, id]);
        
        // Delete existing technicians for the task
        const [resultDeleteBridge] = await db.query(sqlDeleteBridge, [id]);

        if (TECHNICIAN_EMAIL && TECHNICIAN_EMAIL.length > 0) {
            for (let i = 0; i < TECHNICIAN_EMAIL.length; i++) {
                // Add new technicians for the task
                const [resultInsertBridge] = await db.query(sqlInsertBridge, [TECHNICIAN_EMAIL[i], id]);
            }
        }
        
        res.status(200).send({ message: 'Task updated successfully' });
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: 'An error occurred', error: err.message });
    }
};


exports.deleteTask = async (req, res) => {
    const id = req.params.id;
    
    const sqlTask = "DELETE FROM TASK WHERE TASKID = ?";
    const sqlBridge = "DELETE FROM TASK_TECHNICIAN_BRIDGE WHERE TASKID = ?";

    try {
        const [resultTask] = await db.query(sqlTask, [id]);

        // Delete technicians for the task
        const [resultBridge] = await db.query(sqlBridge, [id]);

        res.status(200).send({ message: 'Task deleted successfully' });
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: 'An error occurred', error: err.message });
    }
};



exports.getTask = async (req, res) => {
    const taskId = req.params.id;
    const sql = `
        SELECT
            T.*,
            GROUP_CONCAT(U.FIRSTNAME, ' ', U.LASTNAME) AS TECHNICIAN_NAMES,
            D.DEPENDSON_TASKID,
            DT.NAME AS DEPENDENCY_NAME
        FROM
            TASK AS T
        LEFT JOIN
            TASK_TECHNICIAN_BRIDGE AS TT ON T.TASKID = TT.TASKID
        LEFT JOIN
            USER AS U ON TT.EMAIL = U.EMAIL
        LEFT JOIN
            DEPENDENCY_BRIDGE AS D ON T.TASKID = D.TASKID
        LEFT JOIN
            TASK AS DT ON D.DEPENDSON_TASKID = DT.TASKID
        WHERE
            T.TASKID = ?
        GROUP BY
            T.TASKID, D.DEPENDSON_TASKID, DT.NAME
    `;

    try {
        const [result, fields] = await db.query(sql, [taskId]);
        if (result.length === 0) {
            return res.status(404).send({ message: 'Task not found' });
        }
        res.status(200).json(result[0]);
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: 'An error occurred', error: err.message });
    }
};

