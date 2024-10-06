const Category = require("../../models/category");

// Command Handlers
const getCategories = async () => {
  return await Category.find();
};

const addCategory = async (data) => {
  if (!data || !data.name || !data.language) {
    throw new Error("Category name and language are required");
  }

  const newCategory = new Category({
    name: data.name,
    image: data.image,
    language: data.language,
    numberOfBooks: data.numberOfBooks,
    gender: data.gender,
    books: data.books || []
  });

  return await newCategory.save();
};

const updateCategory = async (id, data) => {
  if (!id || !data) {
    throw new Error("Category ID and data are required");
  }

  const updatedCategory = await Category.findByIdAndUpdate(id, data, { new: true });
  if (!updatedCategory) {
    throw new Error("Category not found");
  }

  return updatedCategory;
};

const removeCategory = async (id) => {
  if (!id) {
    throw new Error("Category ID is required");
  }

  const deletedCategory = await Category.findByIdAndDelete(id);
  if (!deletedCategory) {
    throw new Error("Category not found");
  }

  return deletedCategory;
};

// Crowd: Command Registry
const commandCrowd = {
  getCategories: getCategories,
  addCategory: addCategory,
  updateCategory: updateCategory,
  removeCategory: removeCategory
};

// Command Dispatcher
exports.handleCommand = async (req, res) => {
  const { command, data, id } = req.body;

  try {
    if (!commandCrowd[command]) {
      return res.status(400).json({ message: "Invalid command" });
    }

    const result = await commandCrowd[command](id, data); // Pass id and data as required by handlers
    return res.status(200).json(result);
  } catch (error) {
    console.error("Error handling command:", error);
    return res.status(500).json({ error: error.message });
  }
};
