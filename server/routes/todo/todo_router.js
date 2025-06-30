import express from "express";
import {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} from "../../controllers/todo/todo_controller.js";

const router = express.Router();

router.get("/", getTodos);

router.post("/", createTodo);

router.put("/:id", updateTodo);

router.delete("/:id", deleteTodo);

export default router;
