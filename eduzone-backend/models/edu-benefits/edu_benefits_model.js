const mongoose = require("mongoose");

const eduZoneBenefitsSchema = mongoose.Schema({
  id: {
    type: Number,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model(
  "EduZoneBenefitModel",
  eduZoneBenefitsSchema,
  "eduzone-benefits"
);
