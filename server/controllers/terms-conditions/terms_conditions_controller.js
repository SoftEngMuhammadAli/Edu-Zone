import TermsConditions from "../../models/terms-conditions/terms_conditions_model.js";

export const getTermsAndConditions = async (req, res) => {
  try {
    const terms = await TermsConditions.find({});
    if (!terms || terms.length === 0) {
      return res
        .status(404)
        .json({ message: "Terms and conditions not found." });
    }
    return res
      .status(200)
      .json({ message: "Terms fetched successfully.", data: terms });
  } catch (err) {
    console.error("Get terms error:", err);
    return res
      .status(500)
      .json({ error: "Failed to fetch terms and conditions." });
  }
};

export const createTermsAndConditions = async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res
        .status(400)
        .json({ message: "Both title and content are required." });
    }

    const terms = new TermsConditions({ title, content });
    await terms.save();

    return res.status(201).json({
      message: "Terms and conditions created successfully.",
      data: terms,
    });
  } catch (err) {
    console.error("Create terms error:", err);
    return res
      .status(500)
      .json({ error: "Failed to create terms and conditions." });
  }
};

export const updateTermsAndConditions = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;

    if (!title || !content) {
      return res
        .status(400)
        .json({ message: "Both title and content are required." });
    }

    const updatedTerms = await TermsConditions.findByIdAndUpdate(
      id,
      { title, content, updatedAt: new Date() },
      { new: true }
    );

    if (!updatedTerms) {
      return res
        .status(404)
        .json({ message: "Terms and conditions not found for update." });
    }

    return res.status(200).json({
      message: "Terms and conditions updated successfully.",
      data: updatedTerms,
    });
  } catch (err) {
    console.error("Update terms error:", err);
    return res
      .status(500)
      .json({ error: "Failed to update terms and conditions." });
  }
};

export const deleteTermsAndConditions = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await TermsConditions.findByIdAndDelete(id);
    if (!deleted) {
      return res
        .status(404)
        .json({ message: "Terms and conditions not found for deletion." });
    }

    return res
      .status(200)
      .json({ message: "Terms and conditions deleted successfully." });
  } catch (err) {
    console.error("Delete terms error:", err);
    return res
      .status(500)
      .json({ error: "Failed to delete terms and conditions." });
  }
};
