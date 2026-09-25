const mongoose = require("mongoose");

const learningSessionSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    mentor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    skill: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Skill",
      required: true
    },
    request: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "LearningRequest",
      required: true
    },
    date: {
      type: String,
      required: true,
      trim: true
    },
    time: {
      type: String,
      required: true,
      trim: true
    },
    duration: {
      type: String,
      required: true,
      trim: true
    },
    status: {
      type: String,
      enum: ["scheduled", "completed", "cancelled"],
      default: "scheduled"
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("LearningSession", learningSessionSchema);
