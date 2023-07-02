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
            SELECT USER.EMAIL, USER.FIRSTNAME, USER.LASTNAME, USER.ISACTIVE, USER.IS_EMAIL_VERIFIED, USER.TAG, USER.COMPANYID, USER.ROLEID, USER.METHODID, 
            ROLE.ROLENAME, COMPANY.COMPANYNAME, LOGIN_METHOD.METHODNAME
            FROM USER
            LEFT JOIN ROLE ON USER.ROLEID = ROLE.ROLEID
            LEFT JOIN COMPANY ON USER.COMPANYID = COMPANY.COMPANYID
            LEFT JOIN LOGIN_METHOD ON USER.METHODID = LOGIN_METHOD.METHODID
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

exports.createUser = async (req, res) => {
    try {
        const { firstName, lastName, email, password, roleID, companyID, methodID } = req.body;

        const saltRounds = 10;
        const hash = await bcrypt.hash(password, saltRounds);

        const query = `
            INSERT INTO USER (FIRSTNAME, LASTNAME, EMAIL, PASSWORD, ROLEID, COMPANYID, METHODID)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;

        await db.query(query, [firstName, lastName, email, hash, roleID, companyID, methodID]);

        console.log('User created');
        res.status(201).send({ message: 'User created' });
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
