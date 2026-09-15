const express = require("express");

const {
  createSkill,
  getSkills,
  getSkillById,
  updateSkill,
  deleteSkill
} = require("../controllers/skillController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

// Get all skills
router.get("/", getSkills);

// Get one skill
router.get("/:id", getSkillById);

// Create skill - login required
router.post("/", protect, createSkill);

// Update skill - login required
router.put("/:id", protect, updateSkill);

// Delete skill - login required
router.delete("/:id", protect, deleteSkill);

module.exports = router;