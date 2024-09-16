const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema({
  firstName: { type: String  }, // Split from name
  lastName: { type: String },  // Split from name
  email: { type: String, required: true, unique: true },
  phonenumber: { type: Number},
  password: { type: String, required: true },
  
  address: {
    street: { type: String },
    city: { type: String },
    state: { type: String },
    postalCode: { type: String }
  },
  
  commandIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "Command" }] 
});

module.exports = mongoose.model("Client", clientSchema);
