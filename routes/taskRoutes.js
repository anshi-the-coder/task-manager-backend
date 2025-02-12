const express = require("express");
const { createTask, getTasks, updateTask, deleteTask, bulkUpdateTasks, bulkDeleteTasks } = require("../controllers/taskController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, createTask);
router.get("/", authMiddleware, getTasks);
router.put("/:id", authMiddleware, updateTask);
router.delete("/:id", authMiddleware, deleteTask);
router.put("/bulk-update", authMiddleware, bulkUpdateTasks);
router.delete("/bulk-delete", authMiddleware, bulkDeleteTasks);

module.exports = router;
