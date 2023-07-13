// taskController.js . Path: C:\Users\nguye\OneDrive\Desktop\project-managment-website\server\controllers\taskController.js
const mysql = require('mysql2/promise');
const db = require('../db/database');

exports.getTasks = async (req, res) => {
    const sql = `
        SELECT TASK.*, TASK.PROJECTID, GROUP_CONCAT(USER.FIRSTNAME, ' ', USER.LASTNAME) AS TECHNICIAN_NAMES
        FROM TASK
        LEFT JOIN TASK_TECHNICIAN_BRIDGE ON TASK.TASKID = TASK_TECHNICIAN_BRIDGE.TASKID
        LEFT JOIN USER ON TASK_TECHNICIAN_BRIDGE.EMAIL = USER.EMAIL
        GROUP BY TASK.TASKID
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
    const { NAME, STARTDATE, ENDDATE, PROGRESS, DESCRIPTION, STATUS, PRIORITY, PROJECTID } = req.body;
    const sql = "UPDATE TASK SET NAME = ?, STARTDATE = ?, ENDDATE = ?, PROGRESS = ?, DESCRIPTION = ?, STATUS = ?, PRIORITY = ?, PROJECTID = ? WHERE TASKID = ?";

    try {
        const [result, fields] = await db.query(sql, [NAME, STARTDATE, ENDDATE, PROGRESS, DESCRIPTION, STATUS, PRIORITY, PROJECTID, id]);
        res.status(200).send({ message: 'Task updated successfully' });
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: 'An error occurred', error: err.message });
    }
};

exports.deleteTask = async (req, res) => {
    const id = req.params.id;
    const sql = "DELETE FROM TASK WHERE TASKID = ?";

    try {
        const [result, fields] = await db.query(sql, [id]);
        res.status(200).send({ message: 'Task deleted successfully' });
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: 'An error occurred', error: err.message });
    }
};


exports.getTask = async (req, res) => {
    const taskId = req.params.id; // Get the taskId from the request parameters
    const sql = "SELECT * FROM TASK WHERE TASKID = ?"; // Modify the SQL query to fetch a specific task

    try {
        const [result, fields] = await db.query(sql, [taskId]);
        if (result.length === 0) {
            // If no task is found with the specified taskId, return a 404 response
            return res.status(404).send({ message: 'Task not found' });
        }
        res.status(200).json(result[0]); // Return the first (and only) task found
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: 'An error occurred', error: err.message });
    }
};
