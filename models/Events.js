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
    required: true,
    unique: true,
  },
  category: {
    type: String,
  },
  emoji: {
    type: String,
  },
});

Events.pre("validate", function (next) {
  if (this.title) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  next();
});

module.exports = mongoose.model("Events", Events);
