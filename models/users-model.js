const mongoose = require("mongoose");
var Schema = mongoose.Schema;

// this will be our data base's data structure
var UsersSchema = new Schema(
  {
    first_name: String,
    last_name: String,
    age: Number,
    fights: String,
    wins: String,
    draws: String
  },
  {
    timestamps: true
  }
);

// singular capitalized name for the mongo collection
module.exports = mongoose.model("User", UsersSchema);

//https://mongoosejs.com/docs/models.html
