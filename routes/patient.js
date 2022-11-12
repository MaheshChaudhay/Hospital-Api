const { Router } = require("express");
const patientContoller = require("./../controllers/patient");
const reportController = require("./../controllers/report");
const { checkAuthentication, setDoctor } = require("./../utils");

const router = Router();

router.post("/register", checkAuthentication, patientContoller.registerPatient);
router.post("/:id/create_report", setDoctor, reportController.createReport);
router.get(
  "/:id/all_reports",
  checkAuthentication,
  patientContoller.getAllReports
);

module.exports = router;
