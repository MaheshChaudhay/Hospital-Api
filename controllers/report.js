const moment = require("moment");
const Report = require("./../models/Report");
const Patient = require("./../models/Patient");

async function createReport(req, res) {
  // console.log(req.doctor);
  const doctor = req.doctor.name;
  const status = req.body.status.trim();
  if (doctor.length == 0 || status.length == 0) {
    return res.status(400).json({
      error: "Doctor name and status of report are required",
    });
  }
  try {
    const patient = await Patient.findById(req.params.id);
    if (patient) {
      const report = await Report.create({
        doctor,
        status,
        date: moment().format("MMMM Do YYYY"),
      });
      if (report) {
        patient.reports.push(report);
        patient.save();
        return res.status(200).json({
          report,
          message: "Report created successfully",
        });
      } else {
        return res.status(500).json({
          message: "Error in creating report",
        });
      }
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: err,
      message: "Internal Server Error",
    });
  }
}

async function getReportsByStatus(req, res) {
  const status = req.params.status;
  try {
    const reports = await Report.find({ status });
    return res.status(200).json({
      reports,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: err,
      message: "Internal Server Error",
    });
  }
}

module.exports = {
  createReport,
  getReportsByStatus,
};
