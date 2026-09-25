const express = require("express");
const {
  createSession,
  getStudentSessions,
  getMentorSessions,
  updateSessionStatus
} = require("../controllers/sessionController");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, createSession);
router.get("/student", protect, getStudentSessions);
router.get("/mentor", protect, getMentorSessions);
router.put("/:id/status", protect, updateSessionStatus);

module.exports = router;
