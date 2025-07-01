import mongoose from "mongoose";
import EduZoneBenefit from "../../models/edu-benefits/edu_benefits_model.js";
import { catchAsyncHandler } from "../../middlewares/error_middleware.js";

export const handleBenefitByGetAll = catchAsyncHandler(async (req, res) => {
  try {
    const data = await EduZoneBenefit.find({});
    if (!data || data.length === 0) {
      return res.status(404).json({ message: "No data found." });
    }

    return res
      .status(200)
      .json({ message: "Data fetched successfully.", data });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong while fetching data.",
      error: error.message,
    });
  }
});

export const handleBenefitById = catchAsyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID format." });
    }

    const data = await EduZoneBenefit.findById(id);

    if (!data) {
      return res.status(404).json({ message: "Data not found." });
    }

    return res.status(200).json({
      message: "Data fetched successfully.",
      data,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong while fetching data.",
      error: error.message,
    });
  }
});

export const createBenefit = catchAsyncHandler(async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title || !description) {
      return res
        .status(400)
        .json({ message: "Title and description are required." });
    }

    const existingBenefit = await EduZoneBenefit.findOne({
      title,
      description,
    });
    if (existingBenefit) {
      return res.status(400).json({ message: "Benefit already exists." });
    }

    const newBenefit = new EduZoneBenefit({ title, description });
    const savedBenefit = await newBenefit.save();

    return res.status(201).json({
      message: "Benefit created successfully.",
      data: savedBenefit,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong while creating the benefit.",
      error: error.message,
    });
  }
});

export const handleUpdateBenefitById = catchAsyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID format." });
    }

    if (!title || !description) {
      return res
        .status(400)
        .json({ message: "Title and description are required." });
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
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong while updating the benefit.",
      error: error.message,
    });
  }
});

export const handleDeleteBenefitById = catchAsyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID format." });
    }

    const deletedBenefit = await EduZoneBenefit.findByIdAndDelete(id);

    if (!deletedBenefit) {
      return res.status(404).json({ message: "Benefit not found!" });
    }

    return res.status(200).json({
      message: "Benefit deleted successfully.",
      data: deletedBenefit,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong while deleting the benefit.",
      error: error.message,
    });
  }
});

export default {
  handleBenefitByGetAll,
  handleBenefitById,
  createBenefit,
  handleUpdateBenefitById,
  handleDeleteBenefitById,
};
