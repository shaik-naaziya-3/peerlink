const express = require("express");
const {
  createRequest,
  getStudentRequests,
  getMentorRequests,
  updateRequestStatus
} = require("../controllers/requestController");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, createRequest);
router.get("/student", protect, getStudentRequests);
router.get("/mentor", protect, getMentorRequests);
router.put("/:id/status", protect, updateRequestStatus);

module.exports = router;
