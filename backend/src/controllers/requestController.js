const mongoose = require("mongoose");
const LearningRequest = require("../models/LearningRequest");
const Skill = require("../models/Skill");
const User = require("../models/User");

const createRequest = async (req, res) => {
  try {
    if (req.user.role !== "student") {
      return res.status(403).json({
        message: "Only students can send learning requests"
      });
    }

    const { skillId } = req.body;

    if (!mongoose.isValidObjectId(skillId)) {
      return res.status(400).json({
        message: "Invalid skill ID"
      });
    }

    const skill = await Skill.findById(skillId).select("title mentor");

    if (!skill) {
      return res.status(404).json({
        message: "Skill not found"
      });
    }

    if (skill.mentor.toString() === req.user.id) {
      return res.status(403).json({
        message: "You cannot request your own skill"
      });
    }

    const mentor = await User.findById(skill.mentor).select("_id role");

    if (!mentor) {
      return res.status(404).json({
        message: "Skill mentor not found"
      });
    }

    const existingRequest = await LearningRequest.findOne({
      student: req.user.id,
      skill: skill._id,
      status: "pending"
    });

    if (existingRequest) {
      return res.status(409).json({
        message: "Learning request already pending"
      });
    }

    const request = await LearningRequest.create({
      student: req.user.id,
      mentor: skill.mentor,
      skill: skill._id
    });

    const populatedRequest = await request.populate([
      { path: "skill", select: "title description category" },
      { path: "mentor", select: "name email" }
    ]);

    return res.status(201).json({
      message: "Learning request sent successfully.",
      request: populatedRequest
    });
  } catch (error) {
    console.error("Create learning request error:", error.message);
    return res.status(500).json({
      message: "Unable to send learning request"
    });
  }
};

const getStudentRequests = async (req, res) => {
  try {
    if (req.user.role !== "student") {
      return res.status(403).json({
        message: "Only students can view student requests"
      });
    }

    const requests = await LearningRequest.find({
      student: req.user.id
    })
      .populate("skill", "title description category")
      .populate("mentor", "name email")
      .sort({ createdAt: -1 });

    return res.status(200).json({ requests });
  } catch (error) {
    console.error("Get student requests error:", error.message);
    return res.status(500).json({
      message: "Unable to load learning requests"
    });
  }
};

const getMentorRequests = async (req, res) => {
  try {
    if (req.user.role !== "mentor") {
      return res.status(403).json({
        message: "Only mentors can view incoming requests"
      });
    }

    const requests = await LearningRequest.find({
      mentor: req.user.id
    })
      .populate("student", "name email")
      .populate("skill", "title description category")
      .sort({ createdAt: -1 });

    return res.status(200).json({ requests });
  } catch (error) {
    console.error("Get mentor requests error:", error.message);
    return res.status(500).json({
      message: "Unable to load incoming requests"
    });
  }
};

const updateRequestStatus = async (req, res) => {
  try {
    if (req.user.role !== "mentor") {
      return res.status(403).json({
        message: "Only mentors can update request status"
      });
    }

    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({
        message: "Invalid request ID"
      });
    }

    const { status } = req.body;

    if (!["accepted", "rejected"].includes(status)) {
      return res.status(400).json({
        message: "Status must be accepted or rejected"
      });
    }

    const request = await LearningRequest.findById(req.params.id);

    if (!request) {
      return res.status(404).json({
        message: "Learning request not found"
      });
    }

    if (request.mentor.toString() !== req.user.id) {
      return res.status(403).json({
        message: "You can update only requests for your skills"
      });
    }

    request.status = status;
    await request.save();

    const populatedRequest = await request.populate([
      { path: "student", select: "name email" },
      { path: "skill", select: "title description category" }
    ]);

    return res.status(200).json({
      message: `Request ${status} successfully`,
      request: populatedRequest
    });
  } catch (error) {
    console.error("Update learning request error:", error.message);
    return res.status(500).json({
      message: "Unable to update learning request"
    });
  }
};

module.exports = {
  createRequest,
  getStudentRequests,
  getMentorRequests,
  updateRequestStatus
};
