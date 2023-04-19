const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ourWorkSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
    },
    image: [{
      type: String,
    }],
    information: [{
      label: {
        type: String,
        required: true
      },
      url: {
        type: String,
        required: true
      }
    }],
    extraData:{
      type: String
    }
  },
  { timestamps: true },
  { versionKey: false }
);

module.exports = mongoose.model("OurWork", ourWorkSchema);
