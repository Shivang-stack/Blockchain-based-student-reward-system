const express = require("express");
const router = express.Router();

const {
    participated,
    isParticipated,
    getAllParticipatentsByuserId,
    getAllParticipatentsByeventId,
    getAllParticipatentsById,
    getParticipates
} = require("../controllers/particpates");
const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");
const { getUserById } = require("../controllers/user");

//params
router.param("userId", getUserById);

router.param("particpatesId", getAllParticipatentsById);


router.post(
    "/particpates/create/:userId",
    isSignedIn,
    isAuthenticated,
    isAdmin,
    participated
);

router.get("/particpates/:particpatesId", isSignedIn, isAuthenticated, getParticipates);
router.get("/particpates/:eventId", isSignedIn, isAuthenticated, isAdmin,getAllParticipatentsByeventId);
router.get("/particpates/:userId", isSignedIn, isAuthenticated, getAllParticipatentsByuserId);
router.get("/isparticpated", isSignedIn, isAuthenticated, isAdmin,isParticipated);

// router.put("/particpates/:particpatesId", isSignedIn, isAuthenticated, updateParticipates);




  


module.exports = router;
