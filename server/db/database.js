// database.js . Path: C:\Users\nguye\OneDrive\Desktop\project-managment-website\server\db\database.js

const mysql = require('mysql2');
require('dotenv').config();

const db = mysql.createPool({
    host: process.env.DATABASE_HOST || 'localhost',
    user: process.env.DATABASE_USERNAME || 'root',
    password: process.env.DATABASE_PASSWORD || 'password',
    database: process.env.DATABASE_NAME || 'pmsdatabase',
});


module.exports = db;
