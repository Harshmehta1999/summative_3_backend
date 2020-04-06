const mongoose = require("mongoose");
var Schema = mongoose.Schema;
const Designer = require("./designers-model");
const Comment = require("./comments-model");
const Artwork = require("./artworks-model")


// When viewing book details we may need the writer and user comments
// so this model links to two other collectons

var CategoriesSchema = new Schema({
    category_title: String,
    category_subtitle: String,
    category_section: String,
    cat_id: Number,
    synopsis: String,
    profile_image: String,

}, {
    timestamps: true,
    toJSON: { virtuals: true }
});
CategoriesSchema.virtual("artworks", {
    ref: "Artwork",
    localField: "cat_id",
    foreignField: "id",
    justOne: true
});

// CategoriesSchema.virtual("comments", {
//     ref: "Comment",
//     localField: "title",
//     foreignField: "book_title",
//     justOne: false
// });

// singular capitalized name for the mongo collection
// the collection in your database should be lowercase and plural
module.exports = mongoose.model("categories", CategoriesSchema);