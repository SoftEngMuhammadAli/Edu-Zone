import Assignment from "../../models/course/asssingment_model.js";

export const createAssignment = async (req, res) => {
  try {
    const assignment = new Assignment(req.body);

    if (!assignment) {
      return res
        .status(400)
        .json({ message: "Invalid assignment data", data: null });
    }

    await assignment.save();
    return res
      .status(201)
      .json({ message: "Assignment created", data: assignment });
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Failed to create assignment", error });
  }
};

export const getAllAssignments = async (req, res) => {
  try {
    const assignments = await Assignment.find()
      .populate("courseId", "title")
      .populate("lessonId", "title");

    if (!assignments || assignments.length === 0) {
      return res
        .status(404)
        .json({ message: "No assignments found", data: [] });
    }

    return res
      .status(200)
      .json({ message: "Assignments fetched", data: assignments });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to fetch assignments", error });
  }
};

export const getAssignmentById = async (req, res) => {
  try {
    const { id } = req.params;
    const assignment = await Assignment.findById(id)
      .populate("courseId", "title")
      .populate("lessonId", "title");

    if (!assignment) {
      return res
        .status(404)
        .json({ message: "Assignment not found", data: null });
    }

    return res
      .status(200)
      .json({ message: "Assignment fetched", data: assignment });
  } catch (error) {
    return res.status(400).json({ message: "Invalid assignment ID", error });
  }
};

export const updateAssignment = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Assignment.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updated) {
      return res
        .status(404)
        .json({ message: "Assignment not found", data: null });
    }

    return res
      .status(200)
      .json({ message: "Assignment updated", data: updated });
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Failed to update assignment", error });
  }
};

export const deleteAssignment = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Assignment.findByIdAndDelete(id);

    if (!deleted) {
      return res
        .status(404)
        .json({ message: "Assignment not found", data: null });
    }

    return res
      .status(200)
      .json({ message: "Assignment deleted", data: deleted });
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Failed to delete assignment", error });
  }
};
