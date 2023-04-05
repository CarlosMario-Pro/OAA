const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const categoriesSchema = new Schema({
    category: {
        type: String,
        required: true
    }
},
{ versionKey: false });


module.exports = mongoose.model("Categories", categoriesSchema);