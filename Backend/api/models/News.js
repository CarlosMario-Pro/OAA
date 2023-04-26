const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categories = ["Novedades", "Comunidades", "Agroecología"];
const typeMultimedia = ["Audio", "PDF"];

const newsSchema = new Schema(
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
    location: {
      type: String,
    },
    introduction: {
      type: String,
      required: true,
    },
    image: [
      {
        caption: {
          type: String,
        },
        url: {
          type: String,
          required: true,
        },
      },
    ],
    description: {
      type: String,
      required: true,
    },
    multimedia: [
      {
        label: {
          type: String,
          required: true,
        },
        type: {
          type: String,
          required: true,
          enum: typeMultimedia,
        },
        url: {
          type: String,
          required: true,
        },
      },
    ],
    visitorCounter: {
      type: Number,
      default: 0,
    },
    labels: {
      type: String,
      required: true,
    },
    extraData: {
      type: String,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
  { versionKey: false }
);

module.exports = mongoose.model("News", newsSchema);
