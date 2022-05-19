const express = require("express");
const passport = require("passport");

const router = express.Router();
const patAPI = require("../../../controllers/api/v1/patient");
const docAPI = require("../../../controllers/api/v1/doctor");


router.get("/:status", patAPI.allReportsOfStatus);


module.exports = router;
