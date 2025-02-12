const Task = require("../models/Task");

// Create Task
const createTask = async (req, res) => {
  try {
    const { text, priority } = req.body;
    const newTask = await Task.create({ userId: req.user.id, text, priority });

    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

//  Get All Tasks for a User (with Filters)
const getTasks = async (req, res) => {
  try {
    const { priority, completed } = req.query;
    const filters = { userId: req.user.id };

    if (priority) filters.priority = priority;
    if (completed) filters.completed = completed === "true";

    const tasks = await Task.find(filters);
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

//  Update Task
const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedTask = await Task.findOneAndUpdate(
      { _id: id, userId: req.user.id },
      req.body,
      { new: true }
    );

    if (!updatedTask) return res.status(404).json({ message: "Task not found" });
    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Delete Task
const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTask = await Task.findOneAndDelete({ _id: id, userId: req.user.id });

    if (!deletedTask) return res.status(404).json({ message: "Task not found" });
    res.json({ message: "Task deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Bulk Update Tasks (Complete/Undo Complete)
const bulkUpdateTasks = async (req, res) => {
  try {
    const { taskIds, completed } = req.body;
    await Task.updateMany(
      { _id: { $in: taskIds }, userId: req.user.id },
      { completed }
    );

    res.json({ message: "Tasks updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Bulk Delete Tasks
const bulkDeleteTasks = async (req, res) => {
  try {
    const { taskIds } = req.body;
    await Task.deleteMany({ _id: { $in: taskIds }, userId: req.user.id });

    res.json({ message: "Tasks deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { createTask, getTasks, updateTask, deleteTask, bulkUpdateTasks, bulkDeleteTasks };
