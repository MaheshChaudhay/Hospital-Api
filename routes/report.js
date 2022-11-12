const express = require("express");
const reportController = require("../controllers/report");
const router = express.Router();
const { checkAuthentication } = require("./../utils");

router.get(
  "/:status",
  checkAuthentication,
  reportController.getReportsByStatus
);

module.exports = router;
