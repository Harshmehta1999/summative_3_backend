const mongoose = require("mongoose");
var Schema = mongoose.Schema;
const Writer = require("./writers-model");
const Comment = require("./comments-model");

// When viewing book details we may need the writer and user comments
// so this model links to two other collectons

var BooksSchema = new Schema({
    title: String,
    pages: Number,
    author_id: Number,
    synopsis: String,
    profile_image: String
}, {
    timestamps: true,
    toJSON: { virtuals: true }
});
BooksSchema.virtual("writers", {
    ref: "Writer",
    localField: "author_id",
    foreignField: "id",
    justOne: true
});

BooksSchema.virtual("comments", {
    ref: "Comment",
    localField: "title",
    foreignField: "book_title",
    justOne: false
});

// singular capitalized name for the mongo collection
// the collection in your database should be lowercase and plural
module.exports = mongoose.model("Book", BooksSchema);