const express = require("express");
const passport = require("passport");

const router = express.Router();
const patAPI = require("../../../controllers/api/v1/patient");
const docAPI = require("../../../controllers/api/v1/doctor");

router.post("/register", patAPI.register);
router.get("/:id/all_reports", patAPI.allReportsOfPatient);
router.get("/reports/:status", patAPI.allReportsOfStatus);
router.post(
  "/:id/create_report",
  passport.authenticate("jwt", { session: false }),
  docAPI.createReport
);

module.exports = router;
