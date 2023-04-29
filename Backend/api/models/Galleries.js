const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categories = ["Imagen", "Video"];
const platformVideo = ["YouTube", "Other"];
const typeMultimedia = ["Audio", "PDF"];

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
    description: {
      type: String,
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
    video: {
      platform: {
        type: String,
        enum: platformVideo,
      },
      url: {
        type: String,
      },
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
    labels: [
      {
        type: String,
        required: true,
      },
    ],
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

module.exports = mongoose.model("Galleries", gallerySchema);
