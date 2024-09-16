const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  price: { type: Number },
  originalPrice: { type: Number, default: null },   
  discount: { type: Number, default: null },        
  sold: { type: Number, default: 0 },              
  totalStock: { type: Number, default: null },      
  rating: { type: Number, default: null },          
  reviewsCount: { type: Number, default: null },    
  isTopRated: { type: Boolean, default: false },   
  isBestSeller: { type: Boolean, default: false },  
  isPreOrder: { type: Boolean, default: false },    
  isNnew: { type: Boolean, default: false },         

  creationDate: { type: Date, default: Date.now },
  ageRestriction: { type: Number },
  description: { type: String },
  bookName: { type: String, required: true },
  bookLanguage: { type: String, required: true },
  coverImg: { type: String },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "categorySchema",
    // required: true,
  },
  commandIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "Command" }],
  createdAt: { type: Date, default: Date.now }, 
});

module.exports = mongoose.model("bookSchema", bookSchema);
