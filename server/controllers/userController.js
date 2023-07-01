const mysql = require('mysql2');
const bcrypt = require('bcrypt');

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'pwsdatabase',
});

db.getConnection((err, connection) => {
    if (err) {
        console.error('Error connecting to the database: ', err);
        return;
    }
    console.log('Database connected as ID ' + connection.threadId);
});

exports.getUsers = (req, res) => {
    const query = `
      SELECT users.UserID, users.FirstName, users.LastName, users.Email, users.RoleID, users.CompanyID, roles.RoleName, companies.CompanyName
      FROM users
      LEFT JOIN roles ON users.RoleID = roles.RoleID
      LEFT JOIN companies ON users.CompanyID = companies.CompanyID
    `;

    db.query(query, (error, results) => {
        if (error) {
            console.error('Error: ', error);
            return res.status(500).send({ error: error.message });
        }

        if (results.length === 0) {
            return res.status(404).send({ message: 'No users found' });
        }

        res.status(200).send(results);
    });
};


exports.createUser = (req, res) => {
    const { firstName, lastName, email, password, role, company } = req.body;

    // Perform validation or additional checks if necessary

    // Hash the password before storing it in the database
    const saltRounds = 10;
    bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) {
            console.log('Error: ', err);
            return res.status(500).send({ error: err.message });
        }

        // Lookup the RoleID and CompanyID based on the provided role and company names
        const roleQuery = 'SELECT RoleID FROM roles WHERE RoleID = ?';
        db.query(roleQuery, [role], (roleError, roleResults) => {
            if (roleError) {
                console.log('Error: ', roleError);
                return res.status(500).send({ error: roleError.message });
            }

            if (roleResults.length === 0) {
                console.log('Role not found');
                return res.status(404).send({ message: 'Role not found' });
            }

            const roleId = roleResults[0].RoleID;

            const companyQuery = 'SELECT CompanyID FROM companies WHERE CompanyID = ?';
            db.query(companyQuery, [company], (companyError, companyResults) => {
                if (companyError) {
                    console.log('Error: ', companyError);
                    return res.status(500).send({ error: companyError.message });
                }

                if (companyResults.length === 0) {
                    console.log('Company not found');
                    return res.status(404).send({ message: 'Company not found' });
                }

                const companyId = companyResults[0].CompanyID;

                // Insert the user into the database
                const query = `
                    INSERT INTO users (FirstName, LastName, Email, Password, RoleID, CompanyID)
                    VALUES (?, ?, ?, ?, ?, ?)
                `;

                db.query(query, [firstName, lastName, email, hash, roleId, companyId], (error, results) => {
                    if (error) {
                        console.log('Error: ', error);
                        return res.status(500).send({ error: error.message });
                    }

                    console.log('User created');
                    res.status(201).send({ message: 'User created' });
                });
            });
        });
    });
};

exports.getRoles = (req, res) => {
    const query = 'SELECT * FROM roles';

    db.query(query, (error, results) => {
        if (error) {
            console.log('Error: ', error);
            return res.status(500).send({ error: error.message });
        }

        res.status(200).send(results);
    });
};

exports.getCompanies = (req, res) => {
    const query = 'SELECT * FROM companies';

    db.query(query, (error, results) => {
        if (error) {
            console.log('Error: ', error);
            return res.status(500).send({ error: error.message });
        }

        res.status(200).send(results);
    });
};
