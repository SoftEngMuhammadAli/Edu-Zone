import Todo from "../../models/todo/todo_model.js";

export const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find({});
    if (!todos || todos.length === 0) {
      return res.status(404).json({ message: "No todos found" });
    }
    return res.status(200).json({ data: todos });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

export const createTodo = async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) {
      return res
        .status(400)
        .json({ message: "Invalid input: 'text' is required" });
    }

    const todo = new Todo({ text });
    const saved = await todo.save();
    return res.status(201).json({ data: saved });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

export const updateTodo = async (req, res) => {
  try {
    const { id } = req.params.id;
    const updated = await Todo.findByIdAndUpdate(id, req.body, { new: true });

    if (!updated) {
      return res.status(404).json({ message: "Todo not found" });
    }

    return res.status(200).json({ data: updated });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

export const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params.id;
    const deleted = await Todo.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Todo not found" });
    }

    return res
      .status(200)
      .json({ success: true, message: "Todo deleted", data: deleted });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};
