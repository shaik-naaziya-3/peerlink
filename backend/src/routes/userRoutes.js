const express = require("express");
const {
  getCurrentUser,
  updateCurrentUser
} = require("../controllers/userController");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/profile", protect, getCurrentUser);
router.put("/profile", protect, updateCurrentUser);

module.exports = router;
