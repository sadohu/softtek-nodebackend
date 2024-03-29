const mysql = require('mysql2');
const env = require('dotenv');

env.config();

const connection = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASS,
    database: process.env.MYSQL_DB,
    charset: process.env.MYSQL_CHARSET,
});

module.exports = {
    connection
};