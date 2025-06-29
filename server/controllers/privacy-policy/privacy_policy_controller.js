import PrivacyPolicy from "../../models/privacy-policy/privacy_policy_model.js";

export const getPrivacyPolicy = async (req, res) => {
  try {
    const policy = await PrivacyPolicy.find({}).sort({ updatedAt: -1 });
    if (!policy) {
      return res.status(404).json({ message: "Privacy policy not found." });
    }
    return res
      .status(200)
      .json({ message: "Policy fetched successfully.", data: policy });
  } catch (err) {
    console.error("Get policy error:", err);
    return res.status(500).json({ error: "Failed to fetch privacy policy." });
  }
};

export const createPrivacyPolicy = async (req, res) => {
  try {
    const { content } = req.body;
    if (!content) {
      return res.status(400).json({ message: "Content is required." });
    }

    const policy = new PrivacyPolicy({ content });
    await policy.save();

    return res
      .status(201)
      .json({ message: "Policy created successfully.", data: policy });
  } catch (err) {
    console.error("Create policy error:", err);
    return res.status(500).json({ error: "Failed to create privacy policy." });
  }
};

// PUT to update existing policy
export const updatePrivacyPolicy = async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({ message: "Content is required." });
    }

    const updatedPolicy = await PrivacyPolicy.findByIdAndUpdate(
      id,
      { content, updatedAt: new Date() },
      { new: true }
    );

    if (!updatedPolicy) {
      return res
        .status(404)
        .json({ message: "Privacy policy not found for update." });
    }

    return res
      .status(200)
      .json({ message: "Policy updated successfully.", data: updatedPolicy });
  } catch (err) {
    console.error("Update policy error:", err);
    return res.status(500).json({ error: "Failed to update privacy policy." });
  }
};

// DELETE a policy
export const deletePrivacyPolicy = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await PrivacyPolicy.findByIdAndDelete(id);
    if (!deleted) {
      return res
        .status(404)
        .json({ message: "Privacy policy not found for deletion." });
    }

    return res.status(200).json({ message: "Policy deleted successfully." });
  } catch (err) {
    console.error("Delete policy error:", err);
    return res.status(500).json({ error: "Failed to delete privacy policy." });
  }
};
