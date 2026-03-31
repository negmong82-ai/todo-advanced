const Todo = require('../models/Todo');

// GET /todos - Fetch all todos
exports.getTodos = async (req, res) => {
  try {
    const todos = await Todo.find().sort({ createdAt: 1 });
    res.json(todos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST /todos - Create a new todo
exports.createTodo = async (req, res) => {
  try {
    const { text, dueDate, important, color } = req.body;

    if (!text || text.trim() === '') {
      return res.status(400).json({ error: '할 일 텍스트는 필수입니다.' });
    }

    const newTodo = new Todo({
      text: text.trim(),
      completed: false,
      color: color || 'white',
      important: important || false,
      dueDate: dueDate || null
    });

    await newTodo.save();
    res.status(201).json(newTodo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// PUT /todos/:id - Update an existing todo
exports.updateTodo = async (req, res) => {
  try {
    const { text, completed, color, important, dueDate } = req.body;
    const updates = {};

    if (text !== undefined) updates.text = text;
    if (completed !== undefined) updates.completed = completed;
    if (color !== undefined) updates.color = color;
    if (important !== undefined) updates.important = important;
    if (dueDate !== undefined) updates.dueDate = dueDate;

    const updatedTodo = await Todo.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true }
    );

    if (!updatedTodo) {
      return res.status(404).json({ error: 'Todo를 찾을 수 없습니다.' });
    }

    res.json(updatedTodo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE /todos/:id - Remove a todo
exports.deleteTodo = async (req, res) => {
  try {
    const deletedTodo = await Todo.findByIdAndDelete(req.params.id);

    if (!deletedTodo) {
      return res.status(404).json({ error: 'Todo를 찾을 수 없습니다.' });
    }

    res.json({ message: 'Todo가 삭제되었습니다.', todo: deletedTodo });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
