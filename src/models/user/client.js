const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema({
  firstName: { type: String, required: true }, // Required for better data integrity
  lastName: { type: String, required: true },  // Required for better data integrity
  email: { type: String, required: true, unique: true, match: /.+\@.+\..+/ }, // Email validation
  phoneNumber: { type: String, unique: true, match: /^[0-9]+$/ }, // Use String for consistent formatting
  password: { type: String, required: true, minlength: 8 }, // Minimum length for security
  
  address: {
    street: { type: String ,required: true},
    city: { type: String ,required: true},
    state: { type: String ,required: true},
    postalCode: { type: String,required: true },
  },
  avatar: { type: String, default: 'default-avatar.jpg',required: true } ,// Default avatar if not provided

  commandIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "Command" }] 
}, {
  timestamps: true
});

module.exports = mongoose.model("Client", clientSchema);
