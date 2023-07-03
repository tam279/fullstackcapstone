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


// ...
exports.updateUser = async (req, res) => {
    try {
        const { firstName, lastName, roleID, companyID, methodID } = req.body;
        const { email } = req.params;

        const query = `
            UPDATE USER
            SET FIRSTNAME = ?, LASTNAME = ?, ROLEID = ?, COMPANYID = ?, METHODID = ?
            WHERE EMAIL = ?
        `;

        await db.query(query, [firstName, lastName, roleID, companyID, methodID, email]);

        console.log('User updated');
        res.status(200).send({ message: 'User updated' });
    } catch (error) {
        console.log('Error: ', error);
        return res.status(500).send({ error: error.message });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const { email } = req.body;

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
        const { email } = req.body;

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
