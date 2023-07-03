const express = require("express");
//const authJwt = require("../../../Authentication/src/middleware/auth.middleware");
const authJwt = require("../../config/auth.middleware");
const router = express.Router();

const workordersController = require("../controllers/workorders.controller.js");
//Upsert
router.get("/get", workordersController.get);
// Login_Check
// router.post("/logincheck", workordersController.logincheck);
// router.post("/update", [authJwt.verifyToken], workordersController.update);
// router.post(
//   "/batchdelete",
//   [authJwt.verifyToken],
//   workordersController.batchdelete
// );
// router.post("/excelexport", [authJwt.verifyToken], workordersController.excelexport);

// router.get("/findbyid", [authJwt.verifyToken], workordersController.findbyid);
// router.get("/", [authJwt.verifyToken], workordersController.findAll);
// router.get(
//   "/statusfindAll",
//   [authJwt.verifyToken],
//   workordersController.statusfindAll
// );

// router.post(
//   "/statusupsert",
//   [authJwt.verifyToken],
//   workordersController.statusupsert
// );
// router.get(
//   "/statusfindall",
//   [authJwt.verifyToken],
//   workordersController.statusfindall
// );
// router.post(
//   "/statusundelete",
//   [authJwt.verifyToken],
//   workordersController.statusundelete
// );
// router.post(
//   "/statusdelete",
//   [authJwt.verifyToken],
//   workordersController.statusdelete
// );
// router.get(
//   "/statusfindbyid",
//   [authJwt.verifyToken],
//   workordersController.statusfindbyid
// );

// // barcode selecteAllType
// router.get(
//   "/barcodeselectalltype",
//   [authJwt.verifyToken],
//   workordersController.barcodeselectalltype
// );

// // Barcode UpsertType
// router.post(
//   "/barcodeupsert",
//   [authJwt.verifyToken],
//   workordersController.barcodeupsert
// );

// //Barcode FindbyID
// router.get(
//   "/barcodefindbyid",
//   [authJwt.verifyToken],
//   workordersController.barcodefindbyid
// );

// //Selected Workorder
// router.get(
//   "/workorderdetailforlabel",
//   [authJwt.verifyToken],
//   workordersController.selectedworkorder
// );

// router.post(
//   "/undeletemutiple",
//   [authJwt.verifyToken],
//   workordersController.undeletemutiple
// );

// router.get(
//   "/managedelete",
//   [authJwt.verifyToken],
//   workordersController.managedelete
// );

// router.get(
//   "/statusCount",
//   [authJwt.verifyToken],
//   workordersController.statusCount
// );
module.exports = router;
