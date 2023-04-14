const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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
    author: {
      type: String,
      required: true,
    },
    introduction: {
      type: String,
    },
    description: [
      {
        type: String,
      },
    ],
    image: [
      {
        type: String,
      },
    ],
    location: {
      type: String,
    },
    video: {
      type: String,
    },
    source: {
      type: String,
    },
    read_time: {
      type: String,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    comments: [{ type: Schema.Types.ObjectId, ref: "Comments" }],
    category: {
      type: Schema.Types.ObjectId,
      ref: "Categories",
      required: true,
    },
  },
  { versionKey: false },
  { timestamps: true }
);

module.exports = mongoose.model("News", newsSchema);
