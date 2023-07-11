// projectController.js

const mysql = require('mysql2/promise');
const db = require('../db/database');

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
        STATUS,
        MANAGEREMAIL,
        TECHNICIANEMAILS,
        VIEWEREMAILS,
        DESCRIPTION,
        COMPANYID
    } = req.body;

    // Format STARTDATE and ENDDATE to MySQL Date format
    const formattedStartDate = new Date(STARTDATE).toISOString().slice(0, 10);
    const formattedEndDate = new Date(ENDDATE).toISOString().slice(0, 10);

    const sqlProject =
        "INSERT INTO PROJECT (NAME, STARTDATE, ENDDATE, STATUS, DESCRIPTION, COMPANYID) VALUES (?, ?, ?, ?, ?, ?)";
    const sqlProjectManagerBridge =
        "INSERT INTO PROJECT_MANAGER_BRIDGE (PROJECTID, MANAGEREMAIL) VALUES (?, ?)";
    const sqlProjectTechnicianBridge =
        "INSERT INTO PROJECT_TECHNICIAN_BRIDGE (PROJECTID, TECHNICIANEMAIL) VALUES (?, ?)";
    const sqlProjectViewerBridge =
        "INSERT INTO VIEWER_BRIDGE (PROJECTID, VIEWEREMAIL) VALUES (?, ?)";

    try {
        const [projectResult] = await db.query(sqlProject, [
            NAME,
            formattedStartDate,
            formattedEndDate,
            STATUS,
            DESCRIPTION,
            parseInt(COMPANYID)
        ]);

        const projectId = projectResult.insertId;

        await db.query(sqlProjectManagerBridge, [projectId, MANAGEREMAIL]);

        for (let technicianEmail of TECHNICIANEMAILS) {
            await db.query(sqlProjectTechnicianBridge, [projectId, technicianEmail]);
        }

        for (let viewerEmail of VIEWEREMAILS) {
            await db.query(sqlProjectViewerBridge, [projectId, viewerEmail]);
        }

        res.status(200).send({ message: "Project created successfully" });
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "An error occurred", error: err.message });
    }
};

exports.updateProject = async (req, res) => {
    const id = req.params.id;
    const {
        NAME,
        STARTDATE,
        ENDDATE,
        PROGRESS,
        STATUS,
        MANAGEREMAIL,
        DESCRIPTION,
        COMPANYID,
        TECHNICIANEMAILS,
        VIEWEREMAILS
    } = req.body;

    // Format STARTDATE and ENDDATE to MySQL Date format
    const formattedStartDate = new Date(STARTDATE).toISOString().slice(0, 10);
    const formattedEndDate = new Date(ENDDATE).toISOString().slice(0, 10);


    const checkEmailSql = "SELECT * FROM USER WHERE EMAIL = ?";
    const [emailResult] = await db.query(checkEmailSql, [MANAGEREMAIL]);

    if (emailResult.length === 0) {
        return res.status(400).send({ message: 'MANAGEREMAIL not found in User table' });
    }


    const sqlUpdateProject =
        "UPDATE PROJECT SET NAME = ?, STARTDATE = ?, ENDDATE = ?, PROGRESS = ?, STATUS = ?, DESCRIPTION = ?, COMPANYID = ? WHERE PROJECTID = ?";
    const sqlDeleteManagerBridge = "DELETE FROM PROJECT_MANAGER_BRIDGE WHERE PROJECTID = ?";
    const sqlInsertManagerBridge =
        "INSERT INTO PROJECT_MANAGER_BRIDGE (PROJECTID, MANAGEREMAIL) VALUES (?, ?)";
    const sqlDeleteTechnicianBridge = "DELETE FROM PROJECT_TECHNICIAN_BRIDGE WHERE PROJECTID = ?";
    const sqlInsertTechnicianBridge =
        "INSERT INTO PROJECT_TECHNICIAN_BRIDGE (PROJECTID, TECHNICIANEMAIL) VALUES (?, ?)";
    const sqlDeleteViewerBridge = "DELETE FROM VIEWER_BRIDGE WHERE PROJECTID = ?";
    const sqlInsertViewerBridge =
        "INSERT INTO VIEWER_BRIDGE (PROJECTID, VIEWEREMAIL) VALUES (?, ?)";

    try {
        await db.query(sqlUpdateProject, [
            NAME,
            formattedStartDate,
            formattedEndDate,
            PROGRESS,
            STATUS,
            DESCRIPTION,
            COMPANYID,
            id
        ]);

        // Update Manager
        await db.query(sqlDeleteManagerBridge, [id]);
        await db.query(sqlInsertManagerBridge, [id, MANAGEREMAIL]);

        // Update Technicians
        await db.query(sqlDeleteTechnicianBridge, [id]);
        for (let technicianEmail of TECHNICIANEMAILS) {
            await db.query(sqlInsertTechnicianBridge, [id, technicianEmail]);
        }

        // Update Viewers
        await db.query(sqlDeleteViewerBridge, [id]);
        for (let viewerEmail of VIEWEREMAILS) {
            await db.query(sqlInsertViewerBridge, [id, viewerEmail]);
        }

        res.status(200).send({ message: 'Project updated successfully' });
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: 'An error occurred', error: err.message });
    }
};



exports.deleteProject = async (req, res) => {
    const id = req.params.id;
    const sqlProject = "DELETE FROM PROJECT WHERE PROJECTID = ?";
    const sqlProjectManagerBridge = "DELETE FROM PROJECT_MANAGER_BRIDGE WHERE PROJECTID = ?";
    const sqlProjectTechnicianBridge = "DELETE FROM PROJECT_TECHNICIAN_BRIDGE WHERE PROJECTID = ?";
    const sqlProjectViewerBridge = "DELETE FROM VIEWER_BRIDGE WHERE PROJECTID = ?";

    try {
        // Delete from bridge tables first
        await db.query(sqlProjectManagerBridge, [id]);
        await db.query(sqlProjectTechnicianBridge, [id]);
        await db.query(sqlProjectViewerBridge, [id]);

        // Then delete from Project table
        await db.query(sqlProject, [id]);

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
        sql = `SELECT CONCAT(u.FIRSTNAME, ' ' ,u.LASTNAME) NAME, pmb.MANAGEREMAIL FROM USER u INNER JOIN PROJECT_MANAGER_BRIDGE pmb 
                ON u.EMAIL = pmb.MANAGEREMAIL WHERE pmb.PROJECTID = ?`;
        const [manager] = await db.query(sql, [id]);
        project.manager = manager;

        // SQL to get technicians of the project
        sql = `SELECT CONCAT(u.FIRSTNAME, ' ' ,u.LASTNAME) NAME, ptb.TECHNICIANEMAIL FROM USER u INNER JOIN PROJECT_TECHNICIAN_BRIDGE ptb 
                ON u.EMAIL = ptb.TECHNICIANEMAIL WHERE ptb.PROJECTID = ?`;
        const [technicians] = await db.query(sql, [id]);
        project.technicians = technicians;

        // SQL to get viewers of the project
        sql = `SELECT CONCAT(u.FIRSTNAME, ' ' ,u.LASTNAME) NAME ,vb.VIEWEREMAIL FROM USER u INNER JOIN VIEWER_BRIDGE vb 
                ON u.EMAIL = vb.VIEWEREMAIL WHERE vb.PROJECTID = ?`;
        const [viewers] = await db.query(sql, [id]);
        project.viewers = viewers;

        // SQL to get total tasks and completed tasks
        sql = `SELECT COUNT(*) AS TOTAL_TASKS, 
                COUNT(CASE WHEN STATUS = 'Completed' THEN 1 END) AS COMPLETED_TASKS
                FROM TASK WHERE PROJECTID = ?`;
        const [tasks] = await db.query(sql, [id]);
        project.total_tasks = tasks[0].TOTAL_TASKS;
        project.completed_tasks = tasks[0].COMPLETED_TASKS;

        res.status(200).json(project);
    } catch (err) {
        console.log("Error message: ", err.message);
        res.status(500).send({ message: 'An error occurred', error: err.message });
    }
};


exports.activateProject = async (req, res) => {
    const id = req.params.id;
    const sql = "UPDATE PROJECT SET ISACTIVE = '1' WHERE PROJECTID = ?";

    try {
        const [result] = await db.query(sql, [id]);

        if (result.affectedRows === 0) {
            return res.status(404).send({ message: 'No project found with the provided ID' });
        }

        res.status(200).send({ message: 'Project activated successfully' });
    } catch (err) {
        console.log("Error message: ", err.message);
        res.status(500).send({ message: 'An error occurred', error: err.message });
    }
};

exports.deactivateProject = async (req, res) => {
    const id = req.params.id;
    const sql = "UPDATE PROJECT SET ISACTIVE = '0' WHERE PROJECTID = ?";

    try {
        const [result] = await db.query(sql, [id]);

        if (result.affectedRows === 0) {
            return res.status(404).send({ message: 'No project found with the provided ID' });
        }

        res.status(200).send({ message: 'Project deactivated successfully' });
    } catch (err) {
        console.log("Error message: ", err.message);
        res.status(500).send({ message: 'An error occurred', error: err.message });
    }
};
