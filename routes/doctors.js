const { Router } = require("express");
const doctorsController = require("./../controllers/doctors");

const router = Router();

router.post("/register", doctorsController.registerDoctor);
router.post("/login", doctorsController.login);

module.exports = router;
