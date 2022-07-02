//this schema now includes image links for the blog

const mongoose = require("mongoose");

// todo: find way to make event recurring, add tags (making array of interests?), number of attendees,

const Events = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  host: {
    type: String,
  },
  createdAt: {
    type: Date,
  },
  adminApproved: {
    type: Boolean,
    default: false,
  },
  image: {
    data: Buffer,
    contentType: String,
  },
  location: {
    type: String,
  },
  externalLinks: {
    type: String,
  },
});

module.exports = mongoose.model("Events", Events);
