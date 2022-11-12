const { Router } = require("express");

const router = Router();

router.use("/doctors", require("./doctors"));
router.use("/patients/", require("./patient"));
router.use("/reports/", require("./report"));

module.exports = router;
