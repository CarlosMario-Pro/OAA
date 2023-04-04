const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const commentsSchema = new Schema({
    // email: String,
    comment: String,
    response: String,
    rating: {
        type: Number
    },
    user: { type: Schema.Types.ObjectId, ref: "User" },
    product: { type: Schema.Types.ObjectId, ref: "News" } 
},
{ versionKey: false });


module.exports = mongoose.model("Comments", commentsSchema);