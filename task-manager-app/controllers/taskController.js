
const Task = require('../models/Task');
const User = require('../models/User');
const Category = require('../models/Category'); 

// Create Task
exports.createTask = async (req, res) => {
  const { title, description, dueDate, category: categoryName } = req.body; // Get category name

  try {
    // Check user task limit
    const taskCount = await Task.countDocuments({ user: req.user._id });
    if (req.user.role.name !== 'Admin' && taskCount >= 10) {
      return res.status(400).json({ message: 'Task limit reached (10 tasks)' });
    }

    // Fetch the category object by its name
    const category = await Category.findOne({ name: categoryName });
    if (!category) {
      return res.status(400).json({ message: 'Category not found' });
    }

    const task = await Task.create({
      title,
      description,
      dueDate,
      category: category._id, // Use the ObjectId of the category
      user: req.user._id,
    });

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get All Tasks
exports.getTasks = async (req, res) => {
  const { status, sortBy } = req.query;
  const query = {};

  if (status) {
    query.status = status;
  }

  if (req.user.role.name !== 'Admin') {
    query.user = req.user._id;
  }

  try {
    let tasksQuery = Task.find(query).populate('category').populate('user', 'name email');

    // Sorting
    if (sortBy) {
      const sortParams = sortBy.split(',').join(' ');
      tasksQuery = tasksQuery.sort(sortParams);
    } else {
      tasksQuery = tasksQuery.sort('-createdAt');
    }

    const tasks = await tasksQuery;
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Single Task
exports.getTask = async (req, res) => {
  const { id } = req.params;

  try {
    const task = await Task.findById(id).populate('category').populate('user', 'name email');
    if (!task) return res.status(404).json({ message: 'Task not found' });

    // Check ownership
    if (req.user.role.name !== 'Admin' && task.user._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Access denied' });
    }

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Task
exports.updateTask = async (req, res) => {
  const { id } = req.params;

  try {
    let task = await Task.findById(id);
    if (!task) return res.status(404).json({ message: 'Task not found' });

    // Check ownership
    if (req.user.role.name !== 'Admin' && task.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Access denied' });
    }

    task = await Task.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Task
exports.deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    const task = await Task.findById(id);
    if (!task) return res.status(404).json({ message: 'Task not found' });

    // Check ownership
    if (req.user.role.name !== 'Admin' && task.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Access denied' });
    }

    await task.remove();
    res.status(200).json({ message: 'Task deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
