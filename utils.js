const jwt = require("jsonwebtoken");
const Doctor = require("./models/Doctor");

function checkAuthentication(req, res, next) {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];

    if (token) {
      jwt.verify(token, "doctors api secret", (err, decodedToken) => {
        if (err) {
          return res.status(401).json({
            message: "Invalid Token",
          });
        }
        // console.log(decodedToken);/
        next();
      });
    } else {
      return res.status(401).json({
        message: "Invalid Token",
      });
    }
  } else {
    return res.status(401).json({
      message: "Token not Found",
    });
  }
}

function setDoctor(req, res, next) {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    if (token) {
      jwt.verify(token, "doctors api secret", async (err, decodedToken) => {
        if (err) {
          return res.status(401).json({
            message: "Invalid Token",
          });
        }
        // console.log(decodedToken);
        const doctor = await Doctor.findById(decodedToken.id);
        req.doctor = doctor;
        next();
      });
    } else {
      return res.status(401).json({
        message: "Invalid Token",
      });
    }
  } else {
    return res.status(401).json({
      message: "Token not Found",
    });
  }
}

module.exports = {
  checkAuthentication,
  setDoctor,
};
