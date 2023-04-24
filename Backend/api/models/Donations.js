const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const typeISO = ["ARS", "USD"];

const DonationsSchema = new Schema(
  {
    iso: {
      type: String,
      required: true,
      enum: typeISO,
    },
    amount: {
      type: Number,
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

module.exports = mongoose.model("Donations", DonationsSchema);
