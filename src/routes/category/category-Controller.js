const Category = require("../../models/category"); 

exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).send(categories);
    // res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error });
  }
};

exports.addCategory = async (req, res) => {
    try {
      console.log("Request Body:", req.body);
  
      if (!req.body) {
        return res.status(400).json({ message: "Request body is missing" });
      }
  
      if (!req.body.name) {
        return res.status(400).json({ message: "Category name is required" });
      }
  
      if (!req.body.language) {
        return res.status(400).json({ message: "Language is required" });
      }
  
      const newCategory = new Category({
        name: req.body.name,
        image: req.body.image,
        language: req.body.language,
        numberOfBooks: req.body.numberOfBooks,
        gender: req.body.gender,
        books: req.body.books || []
      });
  
      console.log("New Category Object:", newCategory);
  
      const savedCategory = await newCategory.save();
  
      console.log("Saved Category Object:", savedCategory);
  
      res.status(201).json(savedCategory);
    } catch (error) {
      console.error("Error Adding Category:", error);
      res.status(500).json({ error });
    }
  };

exports.updateCategory = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;

    const updatedCategory = await Category.findByIdAndUpdate(id, updatedData, { new: true });

    if (updatedCategory) {
      res.status(200).json(updatedCategory);
    } else {
      res.status(404).json();
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};

exports.removeCategory = async (req, res) => {
  try {
    const id = req.params.id;
    const category = await Category.findByIdAndDelete(id);

    if (category) {
      res.status(200).json();
    } else {
      res.status(404).json();
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};