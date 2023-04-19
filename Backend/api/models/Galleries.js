const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categories = ["Imagen", "Video"];
const gallerySchema = new Schema(
  {
    titleMain: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: categories,
    },
    author: {
      type: String,
      required: true,
    },
    urlAuthor: {
      type: String,
    },
    introduction: {
      type: String,
    },
    images: [
      {
        label: {
          type: String,
        },
        url: {
          type: String,
          required: true,
        },
      },
    ],
    video: {
      type: String,
    },
    labels: [{ type: String }],
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Galleries", gallerySchema);
