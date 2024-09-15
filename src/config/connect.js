const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb://localhost:27017/tesv")

 //"mongodb+srv://mohamedwadi068:06112004@cluster0.gefeg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/test"  ) 
  .then(() => {
    console.log("connected to db");
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = mongoose;
