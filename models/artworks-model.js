const mongoose = require("mongoose");
var Schema = mongoose.Schema;
// const Designer = require("./designers-model");
const Categories = require("./categories-model");
const Comments = require("./comments-model");

// When viewing book details we may need the writer and user comments
// so this model links to two other collectons

var ArtworksSchema = new Schema({
    artwork_title: String,
    artwork_subtitle: String,
    artwork_section: String,
    price: Number,
    image: String,
    cat_id: Number,
    synopsis: String,
    id: String,
}, {
    timestamps: true,
    toJSON: { virtuals: true },
});


ArtworksSchema.virtual("comments", {
    ref: "Comments",
    localField: "id",
    foreignField: "id",
    justOne: false
});


module.exports = mongoose.model("artworks", ArtworksSchema);