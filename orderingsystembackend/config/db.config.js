const mysql = require("mysql2");

var mysqlConnection = mysql.createPool({
  host: "127.0.0.1",
  user: "root",
  password: "parth123",
  database: "foodorderingsystem",
  // increase the connection limit here
});

mysqlConnection.getConnection((err) => {
  if (!err) console.log("DB connection succeded.");
  else console.log("DB connection failed \n Error :"); // + JSON.stringify(err, undefined, 2));
});

module.exports = mysqlConnection;
