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

Workorders.orderget = function (req, result) {
  dbConn.query("call Order_Select()", function (err, res) {
    if (err) {
      result(null, 0);
      throw new Error(err);
    } else {
      result(null, res);
    }
  });
};

Workorders.orderinsert = function (req, result) {
  dbConn.query(
    "call Order_Insert(?,?)",
    [req.ItemID, req.Quantity],
    function (err, res) {
      if (err) {
        // result(err, null);
        result(null, 0);
        throw new Error(err);
      } else {
        result(null, res);
      }
    }
  );
};
module.exports = Workorders;
