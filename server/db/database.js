// database.js . Path: C:\Users\nguye\OneDrive\Desktop\project-managment-website\server\db\database.js

const mysql = require('mysql2');

const db = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || 'password',
    database: process.env.DB_NAME || 'pmsdatabase',
});


module.exports = db;
