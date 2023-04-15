const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categories = ["Novedades", "Comunidades", "Agroecología"];
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
        type: String,
      },
    ],
    description: {
      type: String,
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    labels: [{ type: String }],
    comments: [{ type: Schema.Types.ObjectId, ref: "Comments" }],
  },
  { timestamps: true },
  { versionKey: false }
);

module.exports = mongoose.model("News", newsSchema);
