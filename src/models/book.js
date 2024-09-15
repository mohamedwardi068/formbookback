const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  price: { type: Number },
  originalPrice: { type: Number, default: null },   // Added original price
  discount: { type: Number, default: null },        // Added discount percentage
  sold: { type: Number, default: 0 },               // Added sold count
  totalStock: { type: Number, default: null },      // Added total stock
  rating: { type: Number, default: null },          // Added rating
  reviewsCount: { type: Number, default: null },    // Added reviews count
  isTopRated: { type: Boolean, default: false },    // Added isTopRated
  isBestSeller: { type: Boolean, default: false },  // Added isBestSeller
  isPreOrder: { type: Boolean, default: false },    // Added isPreOrder
  isNnew: { type: Boolean, default: false },         // Added isNew

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
