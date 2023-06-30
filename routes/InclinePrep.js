const express = require("express");
const router = express.Router();
const Events = require("../models/Events");
const { response } = require("express");
const AdminLogin = require("../models/AdminLogin");
const UserInterests = require("../models/UserInterests");

// fetch all the events
router.get("/events", async (req, res) => {
  const events = await Events.find().sort({ createdAt: 1 });
  res.send(events);
});

// fetch a single event based on the id
router.get("/oneEvent/:id", async (req, res) => {
  const event = await Events.findById(req.params.id);
  if (event == null) {
    console.log("No event found");
  }
  res.send(event);
});

// make a new event -> body must contain title, description, eventDate, and image
router.post("/newEvent", async (req, res, next) => {
  const event = new Events(req.body);
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
  let event = await Events.findOneAndUpdate(
    { id: req.params.id },
    {
      title: req.body.title,
      description: req.body.description,
      eventDate: req.body.eventDate,
      image: req.body.image,
    }
  );
  event = await Events.findOne({ id: req.params.id });
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
  let event = await Events.findByIdAndUpdate(req.params.id, {
    adminApproved: true,
  });
  event = await Events.findById(req.params.id);
  try {
    event.save();
  } catch (e) {
    console.log(e);
  }
  res.send(event);
  console.log("success");
});

router.delete("/admin/delete/:id", async (req, res) => {
  try {
    const event = await Events.findByIdAndDelete(req.params.id);

    if (!event) response.status(404).send("No event found");
    res.status(200).send();
  } catch (error) {
    res.status(500).send(error);
  }
});

// Admin

router.post("/login", async (req, res, next) => {
  const newUser = new AdminLogin(req.body);
  try {
    await newUser.save();
    res.send(newUser);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/admin/:name", async (req, res) => {
  const user = await AdminLogin.findOne({ name: req.params.name });
  if (user == null) console.log("Could not find name");
  res.send(user);
});

router.put("/interested/:id", async (req, res) => {
  let event = await Events.findByIdAndUpdate(req.params.id, {
    $inc: { peopleGoing: 1 },
  });
  event = await Events.findById(req.params.id);
  try {
    event.save();
  } catch (e) {
    console.log(e);
  }
  res.send(event);
  console.log("success");
});

router.post("/userInterests", async (req, res) => {
  const newInterest = new UserInterests(req.body);
  try {
    await newInterest.save();
    res.send(newInterest);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/userInterests", async (req, res) => {
  const events = await UserInterests.find().sort({ createdAt: 1 });
  res.send(events);
});

// fetch a single event based on the id
router.get("/userInterests/:uid", async (req, res) => {
  const userInfo = await UserInterests.findOne({ userId: req.params.uid });
  if (userInfo == null) {
    console.log("No user found");
  }
  res.send(userInfo);
});

router.get("/clubs", async (req, res) => {
  const clubs = await Clubs.find().sort({ name: 1 });
  res.send(clubs);
});

router.post("/newClub", async (req, res) => {
  const newClub = new Clubs(req.body);
  try {
    await newClub.save();
    res.send(newClub);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/clubs/:clubName", async (req, res) => {
  const club = await Clubs.findOne({ clubName: req.params.clubName });
  if (club == null) console.log("Could not find club");
  res.send(club);
});

module.exports = router;
