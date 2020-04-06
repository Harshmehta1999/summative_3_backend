const mongoose = require("mongoose");
var Schema = mongoose.Schema;
const Designer = require("./designers-model");
const Categories = require("./categories-model");
// const Comment = require("./comments-model");

// When viewing book details we may need the writer and user comments
// so this model links to two other collectons

var ArtworksSchema = new Schema({
    artwork_title: String,
    artwork_subtitle: String,
    artwork_section: String,
    price: Number,
    cat_id: Number,
    synopsis: String,
    profile_image: String,
    id: { type: Number, default: Date.now() }

}, {
    timestamps: true,
    toJSON: { virtuals: true }
});
// ArtworksSchema.virtual("categories", {
//     ref: "categories",
//     localField: "id",
//     foreignField: "cat_id",
//     justOne: true,
//     options: { sort: { pages: -1 } }

// });

// ArtworksSchema.virtual("comments", {
//     ref: "Comment",
//     localField: "title",
//     foreignField: "book_title",
//     justOne: false
// });

// singular capitalized name for the mongo collection
// the collection in your database should be lowercase and plural
module.exports = mongoose.model("artworks", ArtworksSchema);