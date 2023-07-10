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
    try {
        // SQL to get basic project details
        let sql = "SELECT * FROM PROJECT WHERE PROJECTID = ?";
        const [result] = await db.query(sql, [id]);
        if (result.length === 0) {
            return res.status(404).send({ message: 'No project found with the provided ID' });
        }
        const project = result[0];

        // SQL to get manager of the project
        sql = `SELECT u.FIRSTNAME, u.LASTNAME FROM USER u INNER JOIN PROJECT_MANAGER_BRIDGE pmb 
                ON u.EMAIL = pmb.MANAGEREMAIL WHERE pmb.PROJECTID = ?`;
        const [manager] = await db.query(sql, [id]);
        project.manager = manager.map(m => `${m.FIRSTNAME} ${m.LASTNAME}`);

        // SQL to get technicians of the project
        sql = `SELECT u.FIRSTNAME, u.LASTNAME FROM USER u INNER JOIN PROJECT_TECHNICIAN_BRIDGE ptb 
                ON u.EMAIL = ptb.TECHNICIANEMAIL WHERE ptb.PROJECTID = ?`;
        const [technicians] = await db.query(sql, [id]);
        project.technicians = technicians.map(t => `${t.FIRSTNAME} ${t.LASTNAME}`);

        // SQL to get viewers of the project
        sql = `SELECT u.FIRSTNAME, u.LASTNAME FROM USER u INNER JOIN VIEWER_BRIDGE vb 
                ON u.EMAIL = vb.VIEWEREMAIL WHERE vb.PROJECTID = ?`;
        const [viewers] = await db.query(sql, [id]);
        project.viewers = viewers.map(v => `${v.FIRSTNAME} ${v.LASTNAME}`);

        // SQL to get total tasks and completed tasks
        sql = `SELECT COUNT(*) AS TOTAL_TASKS, 
                COUNT(CASE WHEN STATUS = 'Completed' THEN 1 END) AS COMPLETED_TASKS
                FROM TASK WHERE PROJECTID = ?`;
        const [tasks] = await db.query(sql, [id]);
        project.total_tasks = tasks[0].TOTAL_TASKS;
        project.completed_tasks = tasks[0].COMPLETED_TASKS;

        // Assume you will manage Priority and Status in the PROJECT table
        // No need for separate SQL query for them
        res.status(200).json(project);
    } catch (err) {
        console.log("Error message: ", err.message);
        res.status(500).send({ message: 'An error occurred', error: err.message });
    }
};

