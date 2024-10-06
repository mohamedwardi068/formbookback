const express = require("express");
const commandRouter = express.Router();
const commandController = require("./command-Controller"); // Import the command controller

// Route to get all commands
// commandRouter.get("/get", commandController.getcommands); 

// Route to add a new command

commandRouter.post("/add", commandController.passcommand);

// Route to update a command by its ID
commandRouter.put("/update/:id", commandController.updatecommand); 

// Route to delete a command by its ID
commandRouter.delete("/remove/:id", commandController.removecommand); 

module.exports = commandRouter;
