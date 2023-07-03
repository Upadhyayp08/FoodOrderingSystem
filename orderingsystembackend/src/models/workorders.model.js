"use strict";
//var dbConn = require('../../../Authentication/config/db.config');
var dbConn = require("../../config/db.config");
var Workorders = function (workorders) {};

Workorders.get = function (req, result) {
  dbConn.query("call Menu_Select()", function (err, res) {
    if (err) {
      result(null, 0);
      throw new Error(err);
    } else {
      result(null, res);
    }
  });
};

// Workorders.logincheck = function (req, result) {
//   dbConn.query("call Login_Check(?)", [req.PhoneNumber], function (err, res) {
//     if (err) {
//       // result(err, null);
//       result(null, 0);
//       throw new Error(err);
//     } else {
//       result(null, res);
//     }
//   });
// };
module.exports = Workorders;
