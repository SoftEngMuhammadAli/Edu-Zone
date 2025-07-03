import mongoose from "mongoose";
import { catchAsyncHandler } from "../../middlewares/error_middleware.js";
import TermsConditions from "../../models/terms-conditions/terms_conditions_model.js";

export const getTermsAndConditions = catchAsyncHandler(async (req, res) => {
  const terms = await TermsConditions.find({});
  if (!terms || terms.length === 0) {
    return res.status(404).json({ message: "Terms and conditions not found." });
  }
  return res
    .status(200)
    .json({ message: "Terms fetched successfully.", data: terms });
});

export const createTermsAndConditions = catchAsyncHandler(async (req, res) => {
  const { title, content } = req.body;

  if (!title?.trim() || !content?.trim()) {
    return res
      .status(400)
      .json({ message: "Both title and content are required." });
  }

  const newTerms = new TermsConditions({
    title: title.trim(),
    content: content.trim(),
  });

  await newTerms.save();

  return res.status(201).json({
    message: "Terms and conditions created successfully.",
    data: newTerms,
  });
});

export const updateTermsAndConditions = catchAsyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid terms ID." });
  }

  if (!title?.trim() || !content?.trim()) {
    return res
      .status(400)
      .json({ message: "Both title and content are required." });
  }

  const updatedTerms = await TermsConditions.findByIdAndUpdate(
    id,
    {
      title: title.trim(),
      content: content.trim(),
      updatedAt: new Date(),
    },
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
});

export const deleteTermsAndConditions = catchAsyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid terms ID." });
  }

  const deleted = await TermsConditions.findByIdAndDelete(id);
  if (!deleted) {
    return res
      .status(404)
      .json({ message: "Terms and conditions not found for deletion." });
  }

  return res.status(200).json({
    message: "Terms and conditions deleted successfully.",
    data: deleted,
  });
});
