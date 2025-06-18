const About = require("../../models/about/about_us_model");

const getAbout = async (req, res) => {
  try {
    const about = await About.findOne({});
    if (!about) {
      return res.status(404).json({ message: "About information not found." });
    }
    return res.status(200).json(about);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

const createAbout = async (req, res) => {
  try {
    const { heading, subheading, description } = req.body;

    const existing = await About.findOne();
    if (existing) {
      return res.status(400).json({
        message: "About section already exists. Use PUT to update it.",
      });
    }

    const newAbout = new About({ heading, subheading, description });
    await newAbout.save();

    return res.status(201).json(newAbout);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

const updateAbout = async (req, res) => {
  try {
    const { id } = req.params;
    const { heading, subheading, description } = req.body;

    const updated = await About.findByIdAndUpdate(
      id,
      { heading, subheading, description },
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "About document not found." });
    }

    return res.status(200).json(updated);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  getAbout,
  createAbout,
  updateAbout,
};
