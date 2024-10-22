const Category = require('../models/categoryModels');

exports.getCategories = async (req, res) => {
  const categories = await Category.find({ user: req.user._id });
  res.json(categories);
};

exports.createCategory = async (req, res) => {
  try {
    const category = new Category({ ...req.body, user: req.user._id });
    await category.save();
    res.status(201).json(category);
  } catch (error) {
    res.status(400).json({ error: 'Category creation failed' });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.id);
    res.json({ message: 'Category deleted' });
  } catch (error) {
    res.status(400).json({ error: 'Category deletion failed' });
  }
};
