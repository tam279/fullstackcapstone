const mysql = require('mysql2/promise');

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'pmsdatabase',
});

exports.getProjects = async (req, res) => {
    const sql = "SELECT * FROM PROJECT";

    try {
        const [result, fields] = await db.query(sql);
        res.status(200).json(result);
    } catch (err) {
        console.log("Error message: ", err.message);
        res.status(500).send({ message: 'An error occurred', error: err.message });
    }
};

exports.createProject = async (req, res) => {
    const { NAME, STARTDATE, ENDDATE, PROGRESS, MANAGEREMAIL, DESCRIPTION, COMPANYID } = req.body;
    const sql = "INSERT INTO PROJECT (NAME, STARTDATE, ENDDATE, PROGRESS, MANAGEREMAIL, DESCRIPTION, COMPANYID) VALUES (?, ?, ?, ?, ?, ?, ?)";

    try {
        const [result, fields] = await db.query(sql, [NAME, STARTDATE, ENDDATE, PROGRESS, MANAGEREMAIL, DESCRIPTION, COMPANYID]);
        res.status(200).send({ message: 'Project created successfully' });
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: 'An error occurred', error: err.message });
    }
};

exports.updateProject = async (req, res) => {
    const id = req.params.id;
    const { NAME, STARTDATE, ENDDATE, PROGRESS, MANAGEREMAIL, DESCRIPTION, COMPANYID } = req.body;
    const sql = "UPDATE PROJECT SET NAME = ?, STARTDATE = ?, ENDDATE = ?, PROGRESS = ?, MANAGEREMAIL = ?, DESCRIPTION = ?, COMPANYID = ? WHERE PROJECTID = ?";

    try {
        const [result, fields] = await db.query(sql, [NAME, STARTDATE, ENDDATE, PROGRESS, MANAGEREMAIL, DESCRIPTION, COMPANYID, id]);
        res.status(200).send({ message: 'Project updated successfully' });
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: 'An error occurred', error: err.message });
    }
};

exports.deleteProject = async (req, res) => {
    const id = req.params.id;
    const sql = "DELETE FROM PROJECT WHERE PROJECTID = ?";

    try {
        const [result, fields] = await db.query(sql, [id]);
        res.status(200).send({ message: 'Project deleted successfully' });
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: 'An error occurred', error: err.message });
    }
};
