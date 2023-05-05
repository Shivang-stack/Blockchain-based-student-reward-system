const express = require("express");
const router = express.Router();

const {
    createEvent,
  getEventById,
  getEvent,
  getQRCodeByEventId,
  updateEvent,
  getAllEvent
} = require("../controllers/event");
const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");
const { getUserById } = require("../controllers/user");

//params
router.param("userId", getUserById);

// router.param("eventId", getEventById);

router.get("/event/:eventId", getEventById);

router.get("/event/qrcode/:eventId", getQRCodeByEventId);

// router.put("/event/:eventId", isSignedIn, isAuthenticated, updateEvent);

router.get("/events",getAllEvent)

router.post(
    "/event/create/:userId",
    isSignedIn,
    isAuthenticated,
    isAdmin,
    createEvent
);
  


module.exports = router;
