// taskController.js . Path: C:\Users\nguye\OneDrive\Desktop\project-managment-website\server\controllers\taskController.js
const mysql = require('mysql2/promise');

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'pmsdatabase',
});

exports.getTasks = async (req, res) => {
    const sql = "SELECT * FROM TASK";

    try {
        const [result, fields] = await db.query(sql);
        res.status(200).json(result);
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: 'An error occurred', error: err.message });
    }
};

exports.createTask = async (req, res) => {
    const { NAME, STARTDATE, ENDDATE, PROGRESS, DESCRIPTION, STATUS, PRIORITY, PROJECTID } = req.body;
    const sql = "INSERT INTO TASK (NAME, STARTDATE, ENDDATE, PROGRESS, DESCRIPTION, STATUS, PRIORITY, PROJECTID) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

    try {
        const [result, fields] = await db.query(sql, [NAME, STARTDATE, ENDDATE, PROGRESS, DESCRIPTION, STATUS, PRIORITY, PROJECTID]);
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


