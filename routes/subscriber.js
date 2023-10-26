const express = require("express");
const router = express.Router();
const Subscriber = require("../modules/subscriber");

// Getting all
router.get("/", async (req, res) => {
  try {
    const subscribers = await Subscriber.find();
    res.send(subscribers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// Getting one
router.get("/:id", getSubscriber, (req, res) => {
  res.json(res.subscriber);
});
// Creating one
router.post("/", async (req, res) => {
  const subscriber = new Subscriber({
    name: req.body.name,
    subscriberToChannel: req.body.subscriberToChannel,
  });
  try {
    const newSubscriber = await subscriber;
    res.status(201).send(newSubscriber);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
// Updating one
router.patch("/:id", getSubscriber, async (req, res) => {
  if (req.body.name != null) {
    res.subscriber.name = req.body.name;
  }
  if (req.body.subscriberToChannel != null) {
    res.subscriber.subscriberToChannel = req.body.subscriberToChannel;
  }
  try {
    const updatedSubscriber = await res.subscriber.save();
    res.json(updatedSubscriber);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});
// Deleting one
router.delete("/:id", getSubscriber, async (req, res) => {
  try {
    await res.subscriber.remove();
    res.json({ message: "Deleted subscriber" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getSubscriber(req, res, next) {
  let subscriber;
  try {
    subscriber = await Subscriber.findById(req.params.id);
    if (subscriber == null) {
      return res.status(404).json({ message: "Cannot find the subscriber" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }

  res.subscriber = subscriber;
  next();
}

module.exports = router;
