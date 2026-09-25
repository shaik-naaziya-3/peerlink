const mongoose = require("mongoose");
const LearningRequest = require("../models/LearningRequest");
const LearningSession = require("../models/LearningSession");

const sessionDetails = [
  { path: "mentor", select: "name email" },
  { path: "student", select: "name email" },
  { path: "skill", select: "title category" },
  { path: "request", select: "status" }
];

const createSession = async (req, res) => {
  try {
    if (req.user.role !== "mentor") {
      return res.status(403).json({
        message: "Only mentors can schedule learning sessions"
      });
    }

    const { requestId, date, time, duration } = req.body;

    if (!mongoose.isValidObjectId(requestId)) {
      return res.status(400).json({ message: "Invalid learning request ID" });
    }

    if (
      !String(date || "").trim() ||
      !String(time || "").trim() ||
      !String(duration || "").trim()
    ) {
      return res.status(400).json({
        message: "Date, time, and duration are required"
      });
    }

    const request = await LearningRequest.findById(requestId);

    if (!request) {
      return res.status(404).json({ message: "Learning request not found" });
    }

    if (request.mentor.toString() !== req.user.id) {
      return res.status(403).json({
        message: "You can schedule only sessions for your requests"
      });
    }

    if (request.status !== "accepted") {
      return res.status(400).json({
        message: "A session can be scheduled only for an accepted request"
      });
    }

    const existingSession = await LearningSession.findOne({
      request: request._id,
      status: "scheduled"
    });

    if (existingSession) {
      return res.status(409).json({
        message: "A scheduled session already exists for this request"
      });
    }

    const session = await LearningSession.create({
      student: request.student,
      mentor: request.mentor,
      skill: request.skill,
      request: request._id,
      date: String(date).trim(),
      time: String(time).trim(),
      duration: String(duration).trim()
    });

    await session.populate(sessionDetails);

    return res.status(201).json({
      message: "Learning session scheduled successfully.",
      session
    });
  } catch (error) {
    console.error("Create learning session error:", error.message);
    return res.status(500).json({
      message: "Unable to schedule learning session"
    });
  }
};

const getStudentSessions = async (req, res) => {
  try {
    if (req.user.role !== "student") {
      return res.status(403).json({
        message: "Only students can view their learning sessions"
      });
    }

    const sessions = await LearningSession.find({ student: req.user.id })
      .populate(sessionDetails)
      .sort({ date: 1, time: 1, createdAt: -1 });

    return res.status(200).json({ sessions });
  } catch (error) {
    console.error("Get student sessions error:", error.message);
    return res.status(500).json({
      message: "Unable to load learning sessions"
    });
  }
};

const getMentorSessions = async (req, res) => {
  try {
    if (req.user.role !== "mentor") {
      return res.status(403).json({
        message: "Only mentors can view their sessions"
      });
    }

    const sessions = await LearningSession.find({ mentor: req.user.id })
      .populate(sessionDetails)
      .sort({ date: 1, time: 1, createdAt: -1 });

    return res.status(200).json({ sessions });
  } catch (error) {
    console.error("Get mentor sessions error:", error.message);
    return res.status(500).json({
      message: "Unable to load mentor sessions"
    });
  }
};

const updateSessionStatus = async (req, res) => {
  try {
    if (req.user.role !== "mentor") {
      return res.status(403).json({
        message: "Only mentors can update session status"
      });
    }

    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid session ID" });
    }

    const { status } = req.body;

    if (!["completed", "cancelled"].includes(status)) {
      return res.status(400).json({
        message: "Status must be completed or cancelled"
      });
    }

    const session = await LearningSession.findById(req.params.id);

    if (!session) {
      return res.status(404).json({ message: "Learning session not found" });
    }

    if (session.mentor.toString() !== req.user.id) {
      return res.status(403).json({
        message: "You can update only your learning sessions"
      });
    }

    if (session.status !== "scheduled") {
      return res.status(400).json({
        message: "Only scheduled sessions can be updated"
      });
    }

    session.status = status;
    await session.save();
    await session.populate(sessionDetails);

    return res.status(200).json({
      message: `Session ${status} successfully`,
      session
    });
  } catch (error) {
    console.error("Update learning session error:", error.message);
    return res.status(500).json({
      message: "Unable to update learning session"
    });
  }
};

module.exports = {
  createSession,
  getStudentSessions,
  getMentorSessions,
  updateSessionStatus
};
