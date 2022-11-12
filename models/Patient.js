const mongoose = require("mongoose");

const patientSchema = mongoose.Schema(
  {
    phone: {
      type: Number,
      required: true,
      unique: true,
    },
    reports: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Report",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Patient = mongoose.model("Patient", patientSchema);
module.exports = Patient;
