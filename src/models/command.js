const mongoose = require("mongoose");

const commandSchema = new mongoose.Schema({
    delevrerid: { type: mongoose.Schema.Types.ObjectId, ref: "delevrerSchema" },
    clientid: { type: mongoose.Schema.Types.ObjectId, ref: "clientSchema" },
    totalprice: { type: Number, required: true },
 
    books: [{ type: mongoose.Schema.Types.ObjectId, ref: "bookSchema" }],

  
});

module.exports = mongoose.model("categorySchema", commandSchema);