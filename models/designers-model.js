const mongoose = require("mongoose");
var Schema = mongoose.Schema;

// const Book = require("./books-model");

// this will be our data base's data structure
var DesignerSchema = new Schema({
    product_title: String,
    product_subtitle: String,
    product_description: String,
    id: { type: Number, default: Date.now() }
}, {
    timestamps: true,
    toJSON: { virtuals: true }
});

// WriterSchema.virtual("books", {
//   ref: "Book",
//   localField: "id",
//   foreignField: "author_id",
//   justOne: false,
//   options: { sort: { title: 1 } }
// });

// singular capitalized name for the mongo collection
module.exports = mongoose.model("Designer", DesignerSchema);