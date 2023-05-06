const express = require("express");
const router = express.Router();

const {
  getUserById,
  getUser,
  getAllUsers,
  createAchievement,
  updateUser,
  certificate,
  getAchievementByUserId,
  getAchievementById
} = require("../controllers/user");
const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");

router.param("userId", getUserById);
router.param("achievementId", getAchievementById);

router.post("/user/:userId/achievement",isSignedIn, createAchievement)

// read routes
router.get("/user/achievement/:userId", getAchievementByUserId);
router.get("/user/achievement/certificate/:achievementId", certificate);

router.get("/user/:userId", isSignedIn, isAuthenticated, getUser);
router.put("/user/:userId", isSignedIn, isAuthenticated, updateUser);

router.get("/users",getAllUsers)


module.exports = router;
