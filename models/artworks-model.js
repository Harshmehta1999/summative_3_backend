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
    product_description: String,
    cat_id: Number,
    synopsis: String,
    // comment: String,
    // myImage: String,

    // img: { data: Buffer, contentType: String }



    // _id: { type: Number, default: Date.now() }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
});
// ArtworksSchema.virtual("categories", {
//     ref: "categories",
//     localField: "id",
//     foreignField: "cat_id",
//     justOne: true,
//     options: { sort: { pages: -1 } }

// });

// ArtworksSchema.virtual("comments", {
//     ref: "Comments",
//     localField: "artwork_title",
//     foreignField: "comment",
//     justOne: false
// });


// ArtworksSchema.virtual("comments", {
//     ref: "Comments",
//     localField: "id",
//     foreignField: "item_id",
//     justOne: false
// });

// singular capitalized name for the mongo collection
// the collection in your database should be lowercase and plural
module.exports = mongoose.model("artworks", ArtworksSchema);