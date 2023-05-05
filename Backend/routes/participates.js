const express = require("express");
const router = express.Router();

const {
    registeredToEvent,
    attendedTheEvent,
    getAllParticipatentsByUserId,
    getAllParticipatentsByeventId,
    getAllParticipatentsById,
    getParticipates
} = require("../controllers/participates");
const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");
const { getUserById } = require("../controllers/user");

//params
router.param("userId", getUserById);

router.param("particpatesId", getAllParticipatentsById);


router.post(
    "/event/register/:userId",
    isSignedIn,
    isAuthenticated,
    registeredToEvent
);

router.get("/particpates/:particpatesId", isSignedIn, isAuthenticated, getParticipates);
router.get("/particpates/event/:eventId", getAllParticipatentsByeventId);
router.get("/particpates/user/:userId", isSignedIn, isAuthenticated, getAllParticipatentsByUserId);
router.post("/attended/event", isSignedIn,attendedTheEvent);

// router.put("/particpates/:particpatesId", isSignedIn, isAuthenticated, updateParticipates);

module.exports = router;
