const mysql=require('mysql');
const connection = mysql.createConnection({
    host     : 'localhost',  // host for the mysql server
    user     : 'root',      // remote user for the mysql server
    password : '',   // password for the remote user 
    database : 'orders'  // database name 
 });

module.exports = connection;