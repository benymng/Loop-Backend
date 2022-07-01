const express = require("express");
const router = express.Router();
const Events = require("../models/Events");

// fetch all the events
router.get("/events", async (req, res) => {
  const events = await Events.find();
  res.send(events);
});

// fetch a single event based on the id
router.get("/oneEvent/:id", async (req, res) => {
  const event = await Event.findOne({ id: req.params.id });
  if (event == null) {
    console.log("No event found");
  }
  res.send(event);
});

// make a new event -> body must contain title, description, eventDate, and image
router.post("/newEvent", async (req, res, next) => {
  const event = new Event(req.body);
  try {
    await event.save();
    res.send(event);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Edit events for the person that made the event -> based on the id but can be changed to something else later -> look into how the image upload would work
router.put("/edit/:id", async (req, res) => {
  console.log(req.body);
  let event = await Event.findOneAndUpdate(
    { id: req.params.id },
    {
      title: req.body.title,
      description: req.body.description,
      eventDate: req.body.eventDate,
      image: req.body.image,
    }
  );
  event = await Event.findOne({ id: req.params.id });
  try {
    event.save();
  } catch (e) {
    console.log(e);
  }
  res.send(event);
  console.log("success");
});

// Approval by the admin for events
router.put("/admin/edit/:id", async (req, res) => {
  let event = await Event.findByIdAndUpdate(
    req.params.id,
    {
      adminApproved: true,
    },
    function (err, docs) {
      if (err) console.log(err);
      else console.log("Updated event ID: ", docs);
    }
  );
});

// Add delete

module.exports = router;
