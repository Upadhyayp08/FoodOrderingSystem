"use strict";
const { json } = require("body-parser");
const fs = require("fs");
const path = require("path");
const XLSX = require("xlsx");

const Workorders = require("../models/workorders.model.js");

exports.get = function (req, res) {
  Workorders.get(req.body, function (err, result) {
    console.log("result::>>", result);
    if (err)
      res.json({
        ResponseID: 0,
        ResponseCode: "ERROR",
        ResponseData: [],
        ResponseMessage: err,
        ResponseJSON: "",
        OtherData: "",
      });

    if (result[0][0]["ID"] == -1) {
      res.json({
        ResponseID: result[0][0]["ID"],
        ResponseCode: "Error",
        ResponseData: [],
        ResponseMessage: "Data Doesn't Exists!",
        ResponseJSON: "",
        OtherData: "",
      });
    } else
      res.json({
        ResponseID: result[0][0]["recordExists"],
        ResponseCode: "SUCCESS",
        ResponseData: result,
        ResponseMessage: "Successfull Login",
        ResponseJSON: "",
        OtherData: "",
      });
  });
};

exports.orderget = function (req, res) {
  Workorders.orderget(req.body, function (err, result) {
    console.log("result::>>", result);
    if (err)
      res.json({
        ResponseID: 0,
        ResponseCode: "ERROR",
        ResponseData: [],
        ResponseMessage: err,
        ResponseJSON: "",
        OtherData: "",
      });

    if (result[0][0]["ID"] == -1) {
      res.json({
        ResponseID: result[0][0]["ID"],
        ResponseCode: "Error",
        ResponseData: [],
        ResponseMessage: "Data Doesn't Exists!",
        ResponseJSON: "",
        OtherData: "",
      });
    } else
      res.json({
        ResponseID: result[0][0]["recordExists"],
        ResponseCode: "SUCCESS",
        ResponseData: result,
        ResponseMessage: "Successfull Login",
        ResponseJSON: "",
        OtherData: "",
      });
  });
};

exports.orderinsert = function (req, res) {
  //handles null error
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res
      .status(400)
      .send({ error: true, message: "Please provide all required field" });
  } else {
    Workorders.orderinsert(req.body, function (err, result) {
      if (err)
        res.json({
          ResponseID: 0,
          ResponseCode: "ERROR",
          ResponseData: [],
          ResponseMessage: err,
          ResponseJSON: "",
          OtherData: "",
        });

      if (result) {
        res.json({
          ResponseID: result[0],
          ResponseCode: "SUCCESS",
          ResponseData: [],
          ResponseMessage: "Data Save successfully!",
          ResponseJSON: "",
          OtherData: "",
        });
      } else
        res.json({
          ResponseID: result,
          ResponseCode: "ERROR",
          ResponseData: [],
          ResponseMessage: "Something went wrong!",
          ResponseJSON: "",
          OtherData: "",
        });
    });
  }
};

exports.update = function (req, res) {
  //handles null error
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res
      .status(400)
      .send({ error: true, message: "Please provide all required field" });
  } else {
    Workorders.update(req.body, function (err, result) {
      if (err)
        res.json({
          ResponseID: 0,
          ResponseCode: "ERROR",
          ResponseData: [],
          ResponseMessage: err,
          ResponseJSON: "",
          OtherData: "",
        });

      if (result > 0) {
        res.json({
          ResponseID: result,
          ResponseCode: "SUCCESS",
          ResponseData: [],
          ResponseMessage: "Data save successfully!",
          ResponseJSON: "",
          OtherData: "",
        });
      } else
        res.json({
          ResponseID: result,
          ResponseCode: "ERROR",
          ResponseData: [],
          ResponseMessage: "Something went wrong!",
          ResponseJSON: "",
          OtherData: "",
        });
    });
  }
};

exports.excelexport = function (req, res) {
  //handles null error
  Workorders.excelexport(req.body, function (err, result) {
    if (err)
      res.json({
        ResponseID: 0,
        ResponseCode: "ERROR",
        ResponseData: [],
        ResponseMessage: err,
        ResponseJSON: "",
        OtherData: "",
      });

    if (result) {
      const headers = Object.keys(result[0]);
      const aoa = [
        headers,
        ...result.map((obj) => headers.map((key) => obj[key])),
      ];

      const wb = XLSX.utils.book_new();
      const ws = XLSX.utils.aoa_to_sheet(aoa);
      XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
      const binaryData = new Buffer.from(
        XLSX.write(wb, { bookType: "xlsx", type: "array" })
      );
      const downloadsPath = path.join(process.env.USERPROFILE, "Downloads");
      const fileName = `workorders_export_${Date.now()}.xlsx`;
      const filePath = path.join(downloadsPath, fileName);
      fs.writeFileSync(filePath, binaryData);
      res.download(filePath);

      res.json({
        ResponseID: result[0].ID,
        ResponseCode: "SUCCESS",
        ResponseData: result,
        ResponseMessage: "",
        ResponseJSON: "",
        OtherData: "",
      });
    } else res.json({ ResponseID: result, ResponseCode: "ERROR", ResponseData: [], ResponseMessage: "Something went wrong!", ResponseJSON: "", OtherData: "" });
  });
};

exports.findbyid = function (req, res) {
  //handles null error
  Workorders.findbyid(req.query, function (err, result) {
    if (err)
      res.json({
        ResponseID: 0,
        ResponseCode: "ERROR",
        ResponseData: [],
        ResponseMessage: err,
        ResponseJSON: "",
        OtherData: "",
      });

    if (result) {
      res.json({
        ResponseID: 0,
        ResponseCode: "SUCCESS",
        ResponseData: result,
        ResponseMessage: "",
        ResponseJSON: "",
        OtherData: "",
      });
    } else res.json({ ResponseID: result, ResponseCode: "ERROR", ResponseData: [], ResponseMessage: "Something went wrong!", ResponseJSON: "", OtherData: "" });
  });
};

exports.statusupsert = function (req, res) {
  //handles null error
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res
      .status(400)
      .send({ error: true, message: "Please provide all required field" });
  } else {
    Workorders.statusupsert(req.body, function (err, result) {
      if (err)
        res.json({
          ResponseID: 0,
          ResponseCode: "ERROR",
          ResponseData: [],
          ResponseMessage: err,
          ResponseJSON: "",
          OtherData: "",
        });

      if (result > 0) {
        res.json({
          ResponseID: result,
          ResponseCode: "SUCCESS",
          ResponseData: [],
          ResponseMessage: "Data Save successfully!",
          ResponseJSON: "",
          OtherData: "",
        });
      } else
        res.json({
          ResponseID: result,
          ResponseCode: "ERROR",
          ResponseData: [],
          ResponseMessage: "Something went wrong!",
          ResponseJSON: "",
          OtherData: "",
        });
    });
  }
};

exports.findAll = function (req, res) {
  //handles null error
  Workorders.findAll(req.query, function (err, result) {
    if (err)
      res.json({
        ResponseID: 0,
        ResponseCode: "ERROR",
        ResponseData: [],
        ResponseMessage: err,
        ResponseJSON: "",
        OtherData: "",
      });

    if (result) {
      res.json({
        ResponseID: 0,
        ResponseCode: "SUCCESS",
        ResponseData: result,
        ResponseMessage: "",
        ResponseJSON: "",
        OtherData: "",
      });
    } else res.json({ ResponseID: result, ResponseCode: "ERROR", ResponseData: [], ResponseMessage: "Something went wrong!", ResponseJSON: "", OtherData: "" });
  });
};

exports.statusfindAll = function (req, res) {
  //handles null error
  Workorders.statusfindAll(req.query, function (err, result) {
    if (err)
      res.json({
        ResponseID: 0,
        ResponseCode: "ERROR",
        ResponseData: [],
        ResponseMessage: err,
        ResponseJSON: "",
        OtherData: "",
      });

    if (result) {
      res.json({
        ResponseID: 0,
        ResponseCode: "SUCCESS",
        ResponseData: result,
        ResponseMessage: "",
        ResponseJSON: "",
        OtherData: "",
      });
    } else res.json({ ResponseID: result, ResponseCode: "ERROR", ResponseData: [], ResponseMessage: "Something went wrong!", ResponseJSON: "", OtherData: "" });
  });
};

exports.statusfindall = function (req, res) {
  //handles null error
  Workorders.statusfindall(req.query, function (err, result) {
    if (err)
      res.json({
        ResponseID: 0,
        ResponseCode: "ERROR",
        ResponseData: [],
        ResponseMessage: err,
        ResponseJSON: "",
        OtherData: "",
      });

    if (result) {
      res.json({
        ResponseID: 0,
        ResponseCode: "SUCCESS",
        ResponseData: result,
        ResponseMessage: "",
        ResponseJSON: "",
        OtherData: "",
      });
    } else res.json({ ResponseID: result, ResponseCode: "ERROR", ResponseData: [], ResponseMessage: "Something went wrong!", ResponseJSON: "", OtherData: "" });
  });
};

exports.batchdelete = function (req, res) {
  //handles null error
  Workorders.batchdelete(req.body, function (err, result) {
    if (err)
      res.json({
        ResponseID: 0,
        ResponseCode: "ERROR",
        ResponseData: [],
        ResponseMessage: err,
        ResponseJSON: "",
        OtherData: "",
      });

    if (result) {
      res.json({
        ResponseID: result[0].ID,
        ResponseCode: "SUCCESS",
        ResponseData: [],
        ResponseMessage: "data deleted successfully",
        ResponseJSON: "",
        OtherData: "",
      });
    } else res.json({ ResponseID: result, ResponseCode: "ERROR", ResponseData: [], ResponseMessage: "Something went wrong!", ResponseJSON: "", OtherData: "" });
  });
};

exports.statusfindbyid = function (req, res) {
  //handles null error
  Workorders.statusfindbyid(req.query, function (err, result) {
    if (err)
      res.json({
        ResponseID: 0,
        ResponseCode: "ERROR",
        ResponseData: [],
        ResponseMessage: err,
        ResponseJSON: "",
        OtherData: "",
      });

    if (result) {
      res.json({
        ResponseID: 1,
        ResponseCode: "SUCCESS",
        ResponseData: result,
        ResponseMessage: "",
        ResponseJSON: "",
        OtherData: "",
      });
    } else res.json({ ResponseID: result, ResponseCode: "ERROR", ResponseData: [], ResponseMessage: "Something went wrong!", ResponseJSON: "", OtherData: "" });
  });
};

exports.statusdelete = function (req, res) {
  //handles null error
  Workorders.statusdelete(req.body, function (err, result) {
    if (err)
      res.json({
        ResponseID: 0,
        ResponseCode: "ERROR",
        ResponseData: [],
        ResponseMessage: err,
        ResponseJSON: "",
        OtherData: "",
      });

    if (result == req.body.id) {
      res.json({
        ResponseID: result,
        ResponseCode: "SUCCESS",
        ResponseData: [],
        ResponseMessage: "data deleted successfully",
        ResponseJSON: "",
        OtherData: "",
      });
    } else
      res.json({
        ResponseID: result,
        ResponseCode: "ERROR",
        ResponseData: [],
        ResponseMessage: "Something went wrong!",
        ResponseJSON: "",
        OtherData: "",
      });
  });
};

exports.statusundelete = function (req, res) {
  Workorders.statusundelete(req.body, function (err, result) {
    if (err)
      res.json({
        ResponseID: 0,
        ResponseCode: "ERROR",
        ResponseData: [],
        ResponseMessage: err,
        ResponseJSON: "",
        OtherData: "",
      });

    if (result == req.body.id) {
      res.json({
        ResponseID: result,
        ResponseCode: "SUCCESS",
        ResponseData: [],
        ResponseMessage: "data undeleted successfully",
        ResponseJSON: "",
        OtherData: "",
      });
    } else
      res.json({
        ResponseID: result,
        ResponseCode: "ERROR",
        ResponseData: [],
        ResponseMessage: "Something went wrong!",
        ResponseJSON: "",
        OtherData: "",
      });
  });
};

// Barcode Select all
exports.barcodeselectalltype = function (req, res) {
  //handles null error
  Workorders.barcodeselectalltype(req.query, function (err, result) {
    if (err)
      res.json({
        ResponseID: 0,
        ResponseCode: "ERROR",
        ResponseData: [],
        ResponseMessage: err,
        ResponseJSON: "",
        OtherData: "",
      });

    if (result) {
      res.json({
        ResponseID: 0,
        ResponseCode: "SUCCESS",
        ResponseData: result,
        ResponseMessage: "",
        ResponseJSON: "",
        OtherData: "",
      });
    } else res.json({ ResponseID: result, ResponseCode: "ERROR", ResponseData: [], ResponseMessage: "Something went wrong!", ResponseJSON: "", OtherData: "" });
  });
};

//Barcode Upsert
exports.barcodeupsert = function (req, res) {
  //handles null error
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res
      .status(400)
      .send({ error: true, message: "Please provide all required field" });
  } else {
    Workorders.barcodeupsert(req.body, function (err, result) {
      console.log(result);
      if (err)
        res.json({
          ResponseID: 0,
          ResponseCode: "ERROR",
          ResponseData: [],
          ResponseMessage: err,
          ResponseJSON: "",
          OtherData: "",
        });

      if (result > 0) {
        res.json({
          ResponseID: result,
          ResponseCode: "SUCCESS",
          ResponseData: [],
          ResponseMessage: "Data save successfully!",
          ResponseJSON: "",
          OtherData: "",
        });
      } else if (result == -1) {
        res.json({
          ResponseID: result,
          ResponseCode: "ERROR",
          ResponseData: [],
          ResponseMessage: "",
          ResponseJSON: "",
          OtherData: "",
        });
      } else
        res.json({
          ResponseID: result,
          ResponseCode: "ERROR",
          ResponseData: [],
          ResponseMessage: "Something went wrong!",
          ResponseJSON: "",
          OtherData: "",
        });
    });
  }
};

// Barcode FindbyId
exports.barcodefindbyid = function (req, res) {
  //handles null error
  Workorders.barcodefindbyid(req.query, function (err, result) {
    if (err)
      res.json({
        ResponseID: 0,
        ResponseCode: "ERROR",
        ResponseData: [],
        ResponseMessage: err,
        ResponseJSON: "",
        OtherData: "",
      });

    if (result) {
      res.json({
        ResponseID: 0,
        ResponseCode: "SUCCESS",
        ResponseData: result,
        ResponseMessage: "",
        ResponseJSON: "",
        OtherData: "",
      });
    } else res.json({ ResponseID: result, ResponseCode: "ERROR", ResponseData: [], ResponseMessage: "Something went wrong!", ResponseJSON: "", OtherData: "" });
  });
};

exports.selectedworkorder = function (req, res) {
  //handles null error
  Workorders.selectedworkorder(req.query, function (err, result) {
    if (err)
      res.json({
        ResponseID: 0,
        ResponseCode: "ERROR",
        ResponseData: [],
        ResponseMessage: err,
        ResponseJSON: "",
        OtherData: "",
      });

    if (result) {
      res.json({
        ResponseID: 0,
        ResponseCode: "SUCCESS",
        ResponseData: result,
        ResponseMessage: "",
        ResponseJSON: "",
        OtherData: "",
      });
    } else res.json({ ResponseID: result, ResponseCode: "ERROR", ResponseData: [], ResponseMessage: "Something went wrong!", ResponseJSON: "", OtherData: "" });
  });
};

exports.undeletemutiple = function (req, res) {
  console.log("---------> " + req.query);
  //handles null error
  Workorders.undeletemutiple(req.body, function (err, result) {
    console.log(result[0].ID);
    if (err)
      res.json({
        ResponseID: 0,
        ResponseCode: "ERROR",
        ResponseData: [],
        ResponseMessage: err,
        ResponseJSON: "",
        OtherData: "",
      });

    if (result) {
      res.json({
        ResponseID: result[0].ID,
        ResponseCode: "SUCCESS",
        ResponseData: [],
        ResponseMessage: "data undeleted successfully",
        ResponseJSON: "",
        OtherData: "",
      });
    } else res.json({ ResponseID: result, ResponseCode: "ERROR", ResponseData: [], ResponseMessage: "Something went wrong!", ResponseJSON: "", OtherData: "" });
  });
};

exports.managedelete = function (req, res) {
  console.log("---------> " + req.query);
  //handles null error
  Workorders.managedelete(req.query, function (err, result) {
    console.log(result);
    if (err)
      res.json({
        ResponseID: 0,
        ResponseCode: "ERROR",
        ResponseData: [],
        ResponseMessage: err,
        ResponseJSON: "",
        OtherData: "",
      });

    if (result) {
      res.json({
        ResponseID: 0,
        ResponseCode: "SUCCESS",
        ResponseData: result,
        ResponseMessage: "",
        ResponseJSON: "",
        OtherData: "",
      });
    } else res.json({ ResponseID: result, ResponseCode: "ERROR", ResponseData: [], ResponseMessage: "Something went wrong!", ResponseJSON: "", OtherData: "" });
  });
};

exports.statusCount = function (req, res) {
  //handles null error
  Workorders.statusCount(req.query, function (err, result) {
    if (err)
      res.json({
        ResponseID: 0,
        ResponseCode: "ERROR",
        ResponseData: [],
        ResponseMessage: err,
        ResponseJSON: "",
        OtherData: "",
      });

    if (result) {
      res.json({
        ResponseID: 0,
        ResponseCode: "SUCCESS",
        ResponseData: result,
        ResponseMessage: "",
        ResponseJSON: "",
        OtherData: "",
      });
    } else res.json({ ResponseID: result, ResponseCode: "ERROR", ResponseData: [], ResponseMessage: "Something went wrong!", ResponseJSON: "", OtherData: "" });
  });
};
