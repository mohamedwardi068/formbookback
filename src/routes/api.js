const express = require("express");
const booksroot = require("./books/books-router");
const app = express();
const categorysroot=require("./category/category-router");
const userRouter = require("./user/user-router");
const api = express.Router();
app.use(express.json());
api.use('/category', categorysroot);
api.use('/books', booksroot);
api.use('/users', userRouter);



module.exports = api;
