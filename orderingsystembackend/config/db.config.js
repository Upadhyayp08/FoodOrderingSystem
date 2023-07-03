const mysql = require("mysql2");

var mysqlConnection = mysql.createPool({
  host: "db4free.net",
  user: "foodordering",
  password: "foodordering",
  database: "foodordering",
  // increase the connection limit here
});

mysqlConnection.getConnection((err) => {
  if (!err) console.log("DB connection succeded.");
  else console.log("DB connection failed \n Error :"); // + JSON.stringify(err, undefined, 2));
});

module.exports = mysqlConnection;
