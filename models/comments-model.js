// const mongoose = require("mongoose");
// var Schema = mongoose.Schema;
// const Artwork = require("./artworks-model")

// var CommentsSchema = new Schema({
//     comment: String,
//     artwork_title: String,
//     cat_id: String,


// }, {
//     timestamps: true
// });

// // singular capitalized name for the mongo collection
// module.exports = mongoose.model("comments", CommentsSchema);

const mongoose = require("mongoose");

var Schema = mongoose.Schema;

var CommentsSchema = new Schema({
    comment: String,

    //  " added by cruz - must use when creating new user items to link to commenting"
    id: String,
}, {
    timestamps: true
});

// singular capitalized name for the mongo collection
module.exports = mongoose.model("comments", CommentsSchema);