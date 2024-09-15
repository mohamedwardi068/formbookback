const express = require("express");
const categoriesRouter = express.Router();
const categoriesController = require("./category-Controller");


categoriesRouter.get("/get", categoriesController.getCategories); 
categoriesRouter.post('/add', categoriesController.addCategory);
categoriesRouter.put("/update/:id", categoriesController.updateCategory); 
categoriesRouter.delete("/remove/:id", categoriesController.removeCategory); 

module.exports = categoriesRouter;
