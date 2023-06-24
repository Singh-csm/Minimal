const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;
const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
    },
    desc: {
      type: String,
      trim: true,
    },
    imgURL: {
      type: String,
      trim: true,
    },
    user: {
      type: ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);
