// database.js . Path: C:\Users\nguye\OneDrive\Desktop\project-managment-website\server\db\database.js

const mysql = require('mysql2');

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'pwsdatabase',
});

module.exports = db;
