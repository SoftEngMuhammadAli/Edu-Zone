import mongoose from "mongoose";
import { catchAsyncHandler } from "../../middlewares/error_middleware.js";
import Todo from "../../models/todo/todo_model.js";

export const getTodos = catchAsyncHandler(async (req, res) => {
  try {
    const todos = await Todo.find({}).populate("user", "name email");
    if (!todos || todos.length === 0) {
      return res.status(404).json({ message: "No todos found", data: [] });
    }
    return res.status(200).json({ message: "Todos fetched", data: todos });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
});

export const createTodo = catchAsyncHandler(async (req, res) => {
  try {
    const { text } = req.body;

    if (!text?.trim()) {
      return res
        .status(400)
        .json({ message: "Invalid input: 'text' is required" });
    }

    const todo = new Todo({ text: text.trim(), user: req.user._id });
    const saved = await todo.save();

    return res
      .status(201)
      .json({ message: "Todo created successfully", data: saved });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
});

export const updateTodo = catchAsyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid todo ID" });
    }

    const updated = await Todo.findByIdAndUpdate(id, req.body, { new: true });

    if (!updated) {
      return res.status(404).json({ message: "Todo not found" });
    }

    return res
      .status(200)
      .json({ message: "Todo updated successfully", data: updated });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
});

export const deleteTodo = catchAsyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid todo ID" });
    }

    const deleted = await Todo.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Todo not found" });
    }

    return res.status(200).json({
      message: "Todo deleted successfully",
      data: deleted,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
});
