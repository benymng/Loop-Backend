//this schema now includes image links for the blog
const slugify = require("slugify");
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
    default: Date.now,
  },
  startTime: {
    type: Date,
    required: true,
  },
  endTime: {
    type: Date,
    required: true,
  },
  adminApproved: {
    type: Boolean,
    default: false,
  },
  image: {
    type: String,
  },
  location: {
    type: String,
  },
  externalLinks: {
    type: String,
  },
  slug: {
    type: String,
    // required: true,
    // unique: true,
  },
  category: {
    type: String,
  },
  emoji: {
    type: String,
  },
  peopleGoing: {
    type: Number,
    default: 0,
  },
});

Events.pre("validate", function (next) {
  if (this.title) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  next();
});

module.exports = mongoose.model("Events", Events);
