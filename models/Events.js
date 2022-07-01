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
  createdAt: {
    type: Date,
  },
  adminApproved: {
    type: Boolean,
    default: false,
  },
  startTime: {
    type: Date,
    required: true,
  },
  endTime: {
    type: Date,
    required: true,
  },
  image: {
    data: Buffer,
    contentType: String,
  },
  currentAttendees: {
    type: Number,
    minimum: 0,
  },
  maxAttendees: {
    type: Number,
    minimum: 0,
  },
  location: {
    type: String,
    required: true,
  },
  eventPrivacy: {
    type: Boolean,
    default: false,
  },
  externalLinks: {
    type: String,
  },
});

module.exports = mongoose.model("Events", Events);
