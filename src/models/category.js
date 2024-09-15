const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    name: { type: String , required: true},
    image: { type: String , required: true},
    language: { type: String , required: true},

    numberOfBooks: { type: Number, required: true },
    gender: { type: String , required: true},
    books: [{ type: mongoose.Schema.Types.ObjectId, ref: "bookSchema" }],

  
});

module.exports = mongoose.model("categorySchema", categorySchema);