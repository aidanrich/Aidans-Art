const { Schema, model } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

const artSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  cloudURL: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  blurb: {
    type: String,
  },
  publishDate: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },

});

const Art = model("Art", artSchema);

module.exports = Art;
