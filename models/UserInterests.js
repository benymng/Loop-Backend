//this schema now includes image links for the blog
const slugify = require("slugify");
const mongoose = require("mongoose");

// todo: find way to make event recurring, add tags (making array of interests?), number of attendees,

const UserInterests = new mongoose.Schema({
  userId: {
    type: String,
  },
  subjects: {
    type: Array,
  },
  likedClubs: {
    type: Array,
  },
});

module.exports = mongoose.model("UserInterests", UserInterests);
