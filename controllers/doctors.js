const Doctor = require("./../models/Doctor");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function registerDoctor(req, res) {
  const name = req.body.username;
  try {
    const password = await bcrypt.hash(req.body.password, 10);
    const doctor = await Doctor.create({
      name,
      password,
    });
    return res
      .status(200)
      .json({ doctor: doctor, message: "doctor registered successfully" });
  } catch (err) {
    console.log(err);
    return res.status(404).send({
      error: err,
      message: "Error in registering the doctor",
    });
  }
}

async function login(req, res) {
  const name = req.body.username;
  const password = req.body.password;
  try {
    const doctor = await Doctor.findOne({ name });
    if (doctor) {
      if (await bcrypt.compare(password, doctor.password)) {
        const token = await jwt.sign({ id: doctor._id }, "doctors api secret");
        return res.status(200).json({
          token,
          message: "Login successful",
        });
      } else {
        return res.status(400).json({
          message: "Incorrect username or password",
        });
      }
    } else {
      return res.status(400).json({
        message: "Incorrect username or password",
      });
    }
  } catch (err) {
    console.log("error", err);
    return res.status(400).json({
      error: err,
      message: "Internal Server Error",
    });
  }
}

module.exports = {
  registerDoctor,
  login,
};
