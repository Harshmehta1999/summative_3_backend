const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CommentsSchema = new Schema(
  {
    comment: String,
    id: String,
  },
  {
    timestamps: true,
  }
);

// singular capitalized name for the mongo collection
module.exports = mongoose.model("Comment", CommentsSchema);
