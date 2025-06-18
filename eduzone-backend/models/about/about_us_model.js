const mongoose = require("mongoose");

const aboutSchema = new mongoose.Schema({
  heading: {
    type: String,
    required: true,
    default: "About Us",
  },
  subheading: {
    type: String,
    required: true,
    default: "EDU-ZONE Free E-Learning Service to Help You Grow",
  },
  description: {
    type: String,
    required: true,
    default:
      "EduZone is expected to be a useful service for the future in the field of education, providing accessible learning resources for everyone.",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("About", aboutSchema, "about-us");
