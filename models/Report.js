const mongoose = require("mongoose");

const reportSchema = mongoose.Schema({
  doctor: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: [
      "Negative",
      "Travelled-Quarantine",
      "Symptoms-Quarantine",
      "Positive-Admit",
    ],
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
});

const Report = mongoose.model("Report", reportSchema);

module.exports = Report;
