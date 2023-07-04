const express = require("express");
//const authJwt = require("../../../Authentication/src/middleware/auth.middleware");
const authJwt = require("../../config/auth.middleware");
const router = express.Router();

const workordersController = require("../controllers/workorders.controller.js");
//Upsert
router.get("/get", workordersController.get);

router.get("/orderget", workordersController.orderget);
// Login_Check
router.post("/orderinsert", workordersController.orderinsert);
module.exports = router;
