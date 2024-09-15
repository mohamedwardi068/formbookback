const express = require("express");
const bookSchema= require("../../models/book")

const booksrouter = express.Router();
const booksController = require("./books-Controller");

booksrouter.get("/", booksController.getBooks);
booksrouter.delete("/remove/:id", booksController.removeBooks);
booksrouter.put("/update/:id", booksController.updateBook);  
booksrouter.post("/addBook", booksController.addBook); 


module.exports = booksrouter;
