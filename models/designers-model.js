const mongoose = require("mongoose");
var Schema = mongoose.Schema;

const Categories = require("./categories-model");

// this will be our data base's data structure
var DesignersSchema = new Schema({
    first_name: String,
    last_name: String,
    // product_description: String,
    id: { type: Number, default: Date.now() }
}, {
    timestamps: true,
    toJSON: { virtuals: true }
});

// DesignerSchema.virtual("categories", {
//     ref: "Categories",
//     localField: "id",
//     foreignField: "author_id",
//     justOne: false,
//     options: { sort: { title: 1 } }
// });

// singular capitalized name for the mongo collection
module.exports = mongoose.model("designers", DesignersSchema);