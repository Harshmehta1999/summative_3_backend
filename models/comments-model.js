const mongoose = require("mongoose");

var Schema = mongoose.Schema;

var CommentsSchema = new Schema({
    comment: String,

    id: String,
}, {
    timestamps: true
});


module.exports = mongoose.model("comments", CommentsSchema);