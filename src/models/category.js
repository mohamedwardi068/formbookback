const mongoose = require("mongoose");

const CategSchema = new mongoose.Schema({
 name: { type: String , required: true },
 image: { type:String },
 language: { type: String},
 numberOfBooks: { type: Number },
 gender: { type: String, required: true },
 books: [{ type: mongoose.Schema.Types.ObjectId, ref: "book"  }],
 
});

module.exports = mongoose.model("Category", CategSchema);