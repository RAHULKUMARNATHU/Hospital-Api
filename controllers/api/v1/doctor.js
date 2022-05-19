const Doctor = require("../../../models/doctor");
const Patient = require("../../../models/patient");
const Report = require("../../../models/report");

const jwt = require("jsonwebtoken");

module.exports.register = async (req, res) => {
  try {
    let docs = await Doctor.findOne({ email: req.body.email });

    if (docs) {
      return res.status(400).json({
        message: "this user already exists",
      });
    } else {
      await Doctor.create({
        email: req.body.email,
        name: req.body.name,
        password: req.body.password,
      });
      let docs = await Doctor.findOne({ email: req.body.email });
      if (docs) {
        return res.status(200).json({
          success: true,
          message: "user created",
          data: docs,
        });
      }
    }
  } catch (error) {
    console.log("error in creating user", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports.login = async (req, res) => {
  try {
    let doctor = await Doctor.findOne({ email: req.body.email });
    if (!doctor || doctor.password != req.body.password) {
      return res
        .status(422)
        .json({ success: false, message: "invalid username or password" });
    }
    return res.status(200).json({
      success: true,
      message: "login successful here is your token keep it safe !!",
      data: {
        token: jwt.sign(doctor.toJSON(), "hospital", { expiresIn: "12d" }),
      },
    });
  } catch (error) {
    console.log("error in sign in ", error);
    return res.status(500).json({
      success: false,
      message: "internal server error",
    });
  }
};

module.exports.createReport = async (req, res) => {
  try {
    let patient = await Patient.findById(req.params.id);

    if (!patient) {
      return res.status(400).json({
        message: "no patient was found ",
      });
    } else {
      let report = await Report.create({
        of: patient._id,
        createdBy: req.user._id,
        date: req.body.date,
        status: req.body.status,
      });
      patient = await Patient.findByIdAndUpdate(req.params.id, {
        status: req.body.status,
      });
      patient.reports.push(report);
      patient.save();

      report = await report
        .populate("of", "name")
        .populate("createdBy", "name")
        .execPopulate();

      return res.status(200).json({
        message: "Report Created Successfully !!",
        data: {
          report: report,
        },
      });
    }
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({
      success: false,
      message: "internal server error",
    });
  }
};
