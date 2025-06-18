const express = require("express");
const router = express.Router();
const {
  getAbout,
  createAbout,
  updateAbout,
} = require("../../controllers/about/about_us_controller");

router.get("/", getAbout);
router.post("/", createAbout);
router.put("/:id", updateAbout);

module.exports = router;
