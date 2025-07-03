import mongoose from "mongoose";
import EduZoneBenefit from "../../models/edu-benefits/edu_benefits_model.js";
import { catchAsyncHandler } from "../../middlewares/error_middleware.js";

export const handleBenefitByGetAll = catchAsyncHandler(async (req, res) => {
  const data = await EduZoneBenefit.find();
  if (!data.length) {
    return res.status(404).json({ message: "No data found.", data: [] });
  }

  return res.status(200).json({ message: "Data fetched successfully.", data });
});

export const handleBenefitById = catchAsyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid ID format." });
  }

  const data = await EduZoneBenefit.findById(id);

  if (!data) {
    return res.status(404).json({ message: "Data not found.", data: null });
  }

  return res.status(200).json({ message: "Data fetched successfully.", data });
});

export const createBenefit = catchAsyncHandler(async (req, res) => {
  let { title, description } = req.body;

  if (!title || !description) {
    return res
      .status(400)
      .json({ message: "Title and description are required." });
  }

  title = title.trim();
  description = description.trim();

  if (title.length < 3 || description.length < 10) {
    return res.status(400).json({
      message:
        "Title must be at least 3 characters and description at least 10 characters.",
    });
  }

  const existingBenefit = await EduZoneBenefit.findOne({
    title: { $regex: new RegExp(`^${title}$`, "i") },
  });

  if (existingBenefit) {
    return res
      .status(400)
      .json({ message: "Benefit with this title already exists." });
  }

  const newBenefit = new EduZoneBenefit({ title, description });
  const savedBenefit = await newBenefit.save();

  return res.status(201).json({
    message: "Benefit created successfully.",
    data: savedBenefit,
  });
});

export const handleUpdateBenefitById = catchAsyncHandler(async (req, res) => {
  const { id } = req.params;
  let { title, description } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid ID format." });
  }

  if (!title || !description) {
    return res
      .status(400)
      .json({ message: "Title and description are required." });
  }

  title = title.trim();
  description = description.trim();

  if (title.length < 3 || description.length < 10) {
    return res.status(400).json({
      message:
        "Title must be at least 3 characters and description at least 10 characters.",
    });
  }

  const updatedData = await EduZoneBenefit.findByIdAndUpdate(
    id,
    { title, description },
    { new: true, runValidators: true }
  );

  if (!updatedData) {
    return res.status(404).json({ message: "Benefit not found." });
  }

  return res.status(200).json({
    message: "Benefit updated successfully.",
    data: updatedData,
  });
});

export const handleDeleteBenefitById = catchAsyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid ID format." });
  }

  const deletedBenefit = await EduZoneBenefit.findByIdAndDelete(id);

  if (!deletedBenefit) {
    return res.status(404).json({ message: "Benefit not found." });
  }

  return res.status(200).json({
    message: "Benefit deleted successfully.",
    data: deletedBenefit,
  });
});
