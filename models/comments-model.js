const mongoose = require("mongoose");
var Schema = mongoose.Schema;
const Artwork = require("./artworks-model")

var CommentsSchema = new Schema({
    comment: String,
    artwork_title: String,

}, {
    timestamps: true
});

// singular capitalized name for the mongo collection
module.exports = mongoose.model("comments", CommentsSchema);