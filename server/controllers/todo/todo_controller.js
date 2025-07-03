import mongoose from "mongoose";
import { catchAsyncHandler } from "../../middlewares/error_middleware.js";
import Todo from "../../models/todo/todo_model.js";

export const getTodos = catchAsyncHandler(async (req, res) => {
  const todos = await Todo.find({});
  if (!todos || todos.length === 0) {
    return res.status(404).json({ message: "No todos found", data: [] });
  }
  return res.status(200).json({ message: "Todos fetched", data: todos });
});

export const createTodo = catchAsyncHandler(async (req, res) => {
  const { text } = req.body;

  if (!text?.trim()) {
    return res
      .status(400)
      .json({ message: "Invalid input: 'text' is required" });
  }

  const todo = new Todo({ text: text.trim() });
  const saved = await todo.save();

  return res
    .status(201)
    .json({ message: "Todo created successfully", data: saved });
});

export const updateTodo = catchAsyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid todo ID" });
  }

  const updated = await Todo.findByIdAndUpdate(id, req.body, { new: true });

  if (!updated) {
    return res.status(404).json({ message: "Todo not found" });
  }

  return res
    .status(200)
    .json({ message: "Todo updated successfully", data: updated });
});

export const deleteTodo = catchAsyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
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
});
