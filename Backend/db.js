import dotenv from 'dotenv'
dotenv.config();

import mysql from 'mysql2/promise'
const sqlKey = process.env.SQLKEY;


const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user:'root',
    database: 'cats_api',
    port: 3306,
    password: process.env.SQLKEY ,  
    waitForConnections : true, 
    connectionLimit: 10,
    queueLimit:0
});




export default pool;