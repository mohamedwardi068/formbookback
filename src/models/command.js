const mongoose = require("mongoose");

const commandSchema = new mongoose.Schema({
  idcommand: { type: mongoose.Schema.Types.ObjectId, ref: "delevrerSchema", required: true }, // Assuming idcommand refers to another schema (e.g., for the deliverer)
  clientid: { type: mongoose.Schema.Types.ObjectId, ref: "clientSchema", required: true }, // Reference to the client
  totalprice: { type: Number, required: true }, // Total price of the order
  adress: { type: String, required: true }, // Address field
  numtel: { type: String, required: true }, // Phone number
  books: [{ type: mongoose.Schema.Types.ObjectId, ref: "bookSchema" }], // Reference to multiple books
  status: { type: String, required: true, enum: ["Pending", "Confirmed", "Shipped", "Delivered", "Cancelled"] } // Order status
});

module.exports = mongoose.model("commandSchema", commandSchema);
