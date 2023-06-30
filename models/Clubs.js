//this schema now includes image links for the blog
const slugify = require("slugify");
const mongoose = require("mongoose");

// todo: find way to make event recurring, add tags (making array of interests?), number of attendees,

const Clubs = new mongoose.Schema({
  clubName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  leaderID: {
    type: Array,
  },
  adminApproved: {
    type: Boolean,
    default: false,
  },
  location: {
    type: String,
  },
  externalLinks: {
    type: Array,
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
  meetingTime: {
    type: String,
  },
});

Clubs.pre("validate", function (next) {
  if (this.clubName) {
    this.slug = slugify(this.clubName, { lower: true, strict: true });
  }
  next();
});

module.exports = mongoose.model("Clubs", Clubs);
