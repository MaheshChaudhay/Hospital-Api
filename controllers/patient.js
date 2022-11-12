const Patient = require("./../models/Patient");

async function registerPatient(req, res) {
  const phone = req.body.phone;
  const text = phone.toString();
  if (isNaN(text) || text.length < 10 || text.length > 10) {
    return res.status(404).json({
      message: phone + " please enter a valid phone number",
    });
  }
  try {
    let patient = await Patient.findOne({ phone });
    if (patient) {
      return res.status(200).json({
        patient,
        message: "Patient already registered",
      });
    } else {
      patient = await Patient.create({
        phone,
      });
      return res.status(200).json({
        patient,
        message: "Patient registered successfully",
      });
    }
  } catch (err) {
    console.log(err);
    return res.json({
      error: err,
      message: "Internal Server Error",
    });
  }
}

async function getAllReports(req, res) {
  const patientId = req.params.id;
  const patient = await Patient.findById(patientId).populate("reports");
  return res.status(200).json({
    reports: patient.reports,
  });
}

module.exports = {
  registerPatient,
  getAllReports,
};
