// projectController.js

const mysql = require('mysql2/promise');

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'pmsdatabase',
});

exports.getProjects = async (req, res) => {
    const sql = `
        SELECT PROJECT.*, CONCAT(USER.FIRSTNAME, ' ', USER.LASTNAME) AS MANAGERNAME
        FROM PROJECT
        INNER JOIN PROJECT_MANAGER_BRIDGE ON PROJECT.PROJECTID = PROJECT_MANAGER_BRIDGE.PROJECTID
        INNER JOIN USER ON PROJECT_MANAGER_BRIDGE.MANAGEREMAIL = USER.EMAIL`;

    try {
        const [result, fields] = await db.query(sql);
        res.status(200).json(result);
    } catch (err) {
        console.log("Error message: ", err.message);
        res.status(500).send({ message: 'An error occurred', error: err.message });
    }
};

exports.createProject = async (req, res) => {
    const {
        NAME,
        STARTDATE,
        ENDDATE,
        PROGRESS,
        MANAGERNAME,
        DESCRIPTION,
        COMPANYID
    } = req.body;
    const sqlProject = "INSERT INTO PROJECT (NAME, STARTDATE, ENDDATE, PROGRESS, DESCRIPTION, COMPANYID) VALUES (?, ?, ?, ?, ?, ?)";
    const sqlProjectManagerBridge = "INSERT INTO PROJECT_MANAGER_BRIDGE (PROJECTID, MANAGEREMAIL) VALUES (?, ?)";

    try {
        const [projectResult] = await db.query(sqlProject, [
            NAME,
            STARTDATE,
            ENDDATE,
            PROGRESS,
            DESCRIPTION,
            COMPANYID
        ]);

        // ProjectID is last insert id
        const projectId = projectResult.insertId;

        await db.query(sqlProjectManagerBridge, [
            projectId,
            MANAGERNAME // Now, MANAGERNAME is actually MANAGEREMAIL
        ]);

        res.status(200).send({ message: 'Project created successfully' });
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: 'An error occurred', error: err.message });
    }
};



exports.updateProject = async (req, res) => {
    const id = req.params.id;
    const {
        NAME,
        STARTDATE,
        ENDDATE,
        PROGRESS,
        MANAGEREMAIL,
        DESCRIPTION,
        COMPANYID
    } = req.body;
    const sql =
        "UPDATE PROJECT SET NAME = ?, STARTDATE = ?, ENDDATE = ?, PROGRESS = ?, MANAGEREMAIL = ?, DESCRIPTION = ?, COMPANYID = ? WHERE PROJECTID = ?";

    try {
        const [result, fields] = await db.query(sql, [
            NAME,
            STARTDATE,
            ENDDATE,
            PROGRESS,
            MANAGEREMAIL,
            DESCRIPTION,
            COMPANYID,
            id
        ]);
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


exports.getProject = async (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM PROJECT WHERE PROJECTID = ?";

    try {
        const [result, fields] = await db.query(sql, [id]);
        // Assuming you are expecting to return a single project, hence returning result[0]
        if (result.length > 0) {
            res.status(200).json(result[0]);
        } else {
            res.status(404).send({ message: 'No project found with the provided ID' });
        }
    } catch (err) {
        console.log("Error message: ", err.message);
        res.status(500).send({ message: 'An error occurred', error: err.message });
    }
};
