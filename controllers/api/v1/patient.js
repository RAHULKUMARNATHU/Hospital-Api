const Patient = require("../../../models/patient");
const Doctor = require("../../../models/doctor");
// const Report = require("../../../models/Report");

module.exports.register = async (req, res) => {
  try {
    let patient = await Patient.findOne({ phone: req.body.phone });
    if (patient) {
      return res.status(200).json({
        message: " patient already exists",
        data: patient,
      });
    } else {
      await Patient.create({
        name: req.body.name,
        phone: req.body.phone,
        status: req.body.status,
      });
      let patient = await Patient.findOne({ phone: req.body.phone });
      return res.status(200).json({
        success: true,
        message: "patient created",
        data: patient,
      });
    }
  } catch (error) {
    console.log("error in creating patient", error);
    return res.status(500).json({
      success: false,
      message: "internal server error",
    });
  }
};

module.exports.allReportsOfPatient = async (req, res) => {
  try {
    let patient = await Patient.findById(req.params.id)
      .select({ _id: 0, status: 0, createdAt: 0, updatedAt: 0, __v: 0 })
      .populate({
        path: "reports",
        select: { _id: 0, of: 0, createdAt: 0, updatedAt: 0, __v: 0 },
        populate: {
          path: "createdBy",
          select: {
            _id: 0,
            username: 0,
            password: 0,
            createdAt: 0,
            updatedAt: 0,
            __v: 0,
          },
        },
      });
    return res.status(200).json({
      message: `Reports of  Patient with name ${patient.name}`,
      data: {
        reports: patient,
      },
    });
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({
      message: "internal server error",
    });
  }
};

module.exports.allReportsOfStatus = async (req, res) => {
  try {
    console.log(req.params.status, "!!!!!!");
    console.log(typeof req.params.status, "@@@@@");
    let report = await Patient.find({ status: req.params.status});
    console.log(report);

    return res.status(200).json({
      message: `Reports of  Patients with ${req.params.status} status`,
      data: {
        reports: report,
      },
    });
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
