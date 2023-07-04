// userController.js

const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'pmsdatabase',
});



exports.getUsers = async (req, res) => {
    try {
        const query = `
            SELECT 
                USER.EMAIL, 
                USER.FIRSTNAME, 
                USER.LASTNAME, 
                USER.TAG, 
                COMPANY.COMPANYNAME, 
                ROLE.ROLENAME, 
                LOGIN_METHOD.METHODNAME, 
                USER.PHONE_NUMBER, 
                USER.JOB_TITLE,
                USER.ISACTIVE
            FROM 
                USER
            LEFT JOIN 
                COMPANY ON USER.COMPANYID = COMPANY.COMPANYID
            LEFT JOIN 
                ROLE ON USER.ROLEID = ROLE.ROLEID
            LEFT JOIN 
                LOGIN_METHOD ON USER.METHODID = LOGIN_METHOD.METHODID
        `;

        const [results] = await db.query(query);

        if (results.length === 0) {
            return res.status(404).send({ message: 'No users found' });
        }

        res.status(200).send(results);
    } catch (error) {
        console.error('Error: ', error);
        return res.status(500).send({ error: error.message });
    }
};

exports.getCompanies = async (req, res) => {
    try {
        const query = 'SELECT * FROM COMPANY';

        const [results] = await db.query(query);

        res.status(200).send(results);
    } catch (error) {
        console.log('Error: ', error);
        return res.status(500).send({ error: error.message });
    }
};




exports.createUser = async (req, res) => {
    try {
        const { firstName, lastName, email, password, roleID, companyID, methodID, phoneNumber, tag, jobTitle } = req.body;

        const saltRounds = 10;
        const hash = await bcrypt.hash(password, saltRounds);

        const query = `
            INSERT INTO USER (FIRSTNAME, LASTNAME, EMAIL, PASSWORD, ROLEID, COMPANYID, METHODID, PHONE_NUMBER, TAG, JOB_TITLE)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        await db.query(query, [firstName, lastName, email, hash, roleID, companyID, methodID, phoneNumber, tag, jobTitle]);

        console.log('User created');
        res.status(201).send({ message: 'User created' });
    } catch (error) {
        console.log('Error: ', error);
        return res.status(500).send({ error: error.message });
    }
};


exports.updateUser = async (req, res) => {
    console.log('updateUser called with req.params', req.params);

    try {
        const { email } = req.params;

        // First fetch the existing user data
        const [existingUsers] = await db.query('SELECT * FROM USER WHERE EMAIL = ?', [email]);

        // If the user does not exist, return an error
        if (existingUsers.length === 0) {
            return res.status(404).send({ message: 'User not found' });
        }

        const existingUser = existingUsers[0];

        // If a field is not provided in the request body, use the existing value
        const firstName = req.body.firstName !== undefined ? req.body.firstName : existingUser.FIRSTNAME;
        const lastName = req.body.lastName !== undefined ? req.body.lastName : existingUser.LASTNAME;
        const companyId = req.body.companyId !== undefined ? req.body.companyId : existingUser.COMPANYID;
        const roleId = req.body.roleId !== undefined ? req.body.roleId : existingUser.ROLEID;
        const loginMethodId = req.body.loginMethodId !== undefined ? req.body.loginMethodId : existingUser.METHODID;
        const phoneNumber = req.body.phoneNumber !== undefined ? req.body.phoneNumber : existingUser.PHONE_NUMBER;
        const jobTitle = req.body.jobTitle !== undefined ? req.body.jobTitle : existingUser.JOB_TITLE;

        const query = `
            UPDATE USER
            SET FIRSTNAME = ?, LASTNAME = ?, ROLEID = ?, COMPANYID = ?, METHODID = ?, PHONE_NUMBER = ?, JOB_TITLE = ?
            WHERE EMAIL = ?
        `;

        await db.query(query, [firstName, lastName, roleId, companyId, loginMethodId, phoneNumber, jobTitle, email]);

        console.log('User updated');
        res.status(200).send({ message: 'User updated' });
    } catch (error) {
        console.log('Error: ', error);
        return res.status(500).send({ error: error.message });
    }
};







exports.deleteUser = async (req, res) => {
    try {
        const { email } = req.params;

        const query = `
            DELETE FROM USER
            WHERE EMAIL = ?
        `;

        await db.query(query, [email]);

        console.log('User deleted');
        res.status(200).send({ message: 'User deleted' });
    } catch (error) {
        console.log('Error: ', error);
        return res.status(500).send({ error: error.message });
    }
};

exports.deactivateUser = async (req, res) => {
    try {
        const { email } = req.params;

        const query = `
            UPDATE USER
            SET ISACTIVE = 0
            WHERE EMAIL = ?
        `;

        await db.query(query, [email]);

        console.log('User deactivated');
        res.status(200).send({ message: 'User deactivated' });
    } catch (error) {
        console.log('Error: ', error);
        return res.status(500).send({ error: error.message });
    }
};



exports.getRoles = async (req, res) => {
    try {
        const query = 'SELECT * FROM ROLE';

        const [results] = await db.query(query);

        res.status(200).send(results);
    } catch (error) {
        console.log('Error: ', error);
        return res.status(500).send({ error: error.message });
    }
};



exports.createCompany = async (req, res) => {
    try {
        const { companyName, address, phoneNumber, website } = req.body;

        const query = `
            INSERT INTO COMPANY (COMPANYNAME, ADDRESS, PHONE_NUMBER, WEBSITE)
            VALUES (?, ?, ?, ?)
        `;

        await db.query(query, [companyName, address, phoneNumber, website]);

        console.log('Company created');
        res.status(201).send({ message: 'Company created' });
    } catch (error) {
        console.log('Error: ', error);
        return res.status(500).send({ error: error.message });
    }
};


exports.getLoginMethods = async (req, res, next) => {
    try {
        const loginMethods = await db.query('SELECT * FROM LOGIN_METHOD');
        res.json(loginMethods);
    } catch (error) {
        next(error);
    }
};

exports.updateCompany = (req, res) => {
    const id = req.params.id;
    const { companyName, address, phoneNumber, website } = req.body;
    const sql = `UPDATE COMPANY SET COMPANYNAME = ?, ADDRESS = ?, PHONE_NUMBER = ?, WEBSITE = ? WHERE COMPANYID = ?`;

    db.query(sql, [companyName, address, phoneNumber, website, id], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send({ message: 'An error occurred' });
        } else {
            res.status(200).send({ message: 'Company updated successfully' });
        }
    });
};

exports.deleteCompany = (req, res) => {
    const id = req.params.id;
    const sql = `DELETE FROM COMPANY WHERE COMPANYID = ?`;

    db.query(sql, [id], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send({ message: 'An error occurred' });
        } else {
            res.status(200).send({ message: 'Company deleted successfully' });
        }
    });
};