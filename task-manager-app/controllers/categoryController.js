const Category = require('../models/Category');


// Create a new category
exports.createCategory = async (req, res) => {
    const { name } = req.body;
  
    try {
      const category = new Category({ name });
      await category.save();
      res.status(201).json({ message: 'Category created successfully', category });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  // Get all categories
  exports.getAllCategories = async (req, res) => {
    try {
      const categories = await Category.find();
      res.status(200).json(categories);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  // Get a category by ID
  exports.getCategoryById = async (req, res) => {
    const { id } = req.params;
  
    try {
      const category = await Category.findById(id);
      if (!category) {
        return res.status(404).json({ message: 'Category not found' });
      }
      res.status(200).json(category);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  // Update a category by ID
  exports.updateCategory = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
  
    try {
      const category = await Category.findByIdAndUpdate(id, { name }, { new: true });
      if (!category) {
        return res.status(404).json({ message: 'Category not found' });
      }
      res.status(200).json({ message: 'Category updated successfully', category });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  // Delete a category by ID
  exports.deleteCategory = async (req, res) => {
    const { id } = req.params;
  
    try {
      const category = await Category.findByIdAndDelete(id);
      if (!category) {
        return res.status(404).json({ message: 'Category not found' });
      }
      res.status(200).json({ message: 'Category deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };