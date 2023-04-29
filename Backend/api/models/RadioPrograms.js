const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const typeMultimedia = ["Audio", "PDF"];

const radioProgramsSchema = new Schema(
  {
    titleMain: {
      type: String,
      required: true,
    },
    date: {
      type: String,
    },
    introduction: {
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
    audio: [
      {
        label: {
          type: String,
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

module.exports = mongoose.model("RadioPrograms", radioProgramsSchema);
