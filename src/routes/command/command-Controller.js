const commandSchema = require("../../models/command");



exports.passcommand = async (req, res) => {
  try {
    const data = req.body; // Use req.body to access the data being sent in the request
    console.log("Received Data:", data);

    // Create a new command object with the provided data
    const newCommand = new commandSchema({
      clientid: data.clientid, // Reference to the client
      totalprice: data.totalprice, // Total price of the command
      adress: data.adress, // Address
      numtel: data.numtel, // Phone number
      books: data.books || [], // Array of book IDs
      status: data.status // Command status (e.g., Pending, Confirmed, etc.)
    });

    // Save the new command to the database
    await newCommand.save();

    // Respond with the created command
    res.status(201).json(newCommand);
  } catch (error) {
    console.error("Error creating command:", error);
    res.status(500).json({ message: "Error creating command", error });
  }
};


exports.updatecommand = async (id, data) => {
  if (!id || !data) {
    throw new Error("command ID and data are required");
  }
  const updatedcommand = await commandSchema.findByIdAndUpdate(id, data, { new: true });
  if (!updatedcommand) {
    throw new Error("command not found");
  }
  return updatedcommand;
};

exports. removecommand = async (id) => {
  if (!id) {
    throw new Error("command ID is required");
  }

  const deletedcommand = await commandSchema.findByIdAndDelete(id);
  if (!deletedcommand) {
    throw new Error("command not found");
  }

  return deletedcommand;
};




