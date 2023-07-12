// commentController.js
const mysql = require('mysql2/promise');
const db = require('../db/database');

exports.getComments = async (req, res) => {
    const sql = "SELECT * FROM COMMENT";

    try {
        const [result, fields] = await db.query(sql);
        res.status(200).json(result);
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: 'An error occurred', error: err.message });
    }
};

exports.createComment = async (req, res) => {
    const { COMMENT, TASKID, EMAIL } = req.body;
    const DATE = new Date(); // Set current date and time
    const sql = "INSERT INTO COMMENT (COMMENT, DATE, TASKID, EMAIL) VALUES (?, ?, ?, ?)";

    try {
        const [result, fields] = await db.query(sql, [COMMENT, DATE, TASKID, EMAIL]);
        res.status(200).send({ message: 'Comment created successfully' });
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: 'An error occurred', error: err.message });
    }
};


exports.updateComment = async (req, res) => {
    const id = req.params.id;
    const { COMMENT, DATE, TASKID, EMAIL } = req.body;
    const sql = "UPDATE COMMENT SET COMMENT = ?, DATE = ?, TASKID = ?, EMAIL = ? WHERE COMMENTID = ?";

    try {
        const [result, fields] = await db.query(sql, [COMMENT, DATE, TASKID, EMAIL, id]);
        res.status(200).send({ message: 'Comment updated successfully' });
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: 'An error occurred', error: err.message });
    }
};

exports.deleteComment = async (req, res) => {
    const id = req.params.id;
    const sql = "DELETE FROM COMMENT WHERE COMMENTID = ?";

    try {
        const [result, fields] = await db.query(sql, [id]);
        res.status(200).send({ message: 'Comment deleted successfully' });
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: 'An error occurred', error: err.message });
    }
};

exports.getCommentsByTaskId = async (req, res) => {
    const taskId = req.query.taskId;
    const sql = "SELECT * FROM COMMENTS WHERE TASKID = ?";

    try {
        const [result, fields] = await db.query(sql, [taskId]);
        res.status(200).json(result);
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: 'An error occurred', error: err.message });
    }
};

