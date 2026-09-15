const Skill = require("../models/Skill");

// CREATE a skill
const createSkill = async (req, res) => {
  try {
    const { title, description, category } = req.body;

    if (!title || !description || !category) {
      return res.status(400).json({
        message: "Title, description and category are required"
      });
    }

    const skill = await Skill.create({
      title,
      description,
      category,
      mentor: req.user.id
    });

    res.status(201).json({
      message: "Skill created successfully",
      skill
    });

  } catch (error) {
    console.error("Create skill error:", error.message);

    res.status(500).json({
      message: "Server error while creating skill"
    });
  }
};


// READ all skills
const getSkills = async (req, res) => {
  try {
    const skills = await Skill.find()
      .populate("mentor", "name email");

    res.status(200).json({
      skills
    });

  } catch (error) {
    console.error("Get skills error:", error.message);

    res.status(500).json({
      message: "Server error while fetching skills"
    });
  }
};


// READ one skill
const getSkillById = async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id)
      .populate("mentor", "name email");

    if (!skill) {
      return res.status(404).json({
        message: "Skill not found"
      });
    }

    res.status(200).json({
      skill
    });

  } catch (error) {
    console.error("Get skill error:", error.message);

    res.status(500).json({
      message: "Server error while fetching skill"
    });
  }
};


// UPDATE a skill
const updateSkill = async (req, res) => {
  try {
    const { title, description, category } = req.body;

    const skill = await Skill.findById(req.params.id);

    if (!skill) {
      return res.status(404).json({
        message: "Skill not found"
      });
    }

    // Only the mentor who created the skill can update it
    if (skill.mentor.toString() !== req.user.id) {
      return res.status(403).json({
        message: "You can update only your own skills"
      });
    }

    skill.title = title || skill.title;
    skill.description = description || skill.description;
    skill.category = category || skill.category;

    await skill.save();

    res.status(200).json({
      message: "Skill updated successfully",
      skill
    });

  } catch (error) {
    console.error("Update skill error:", error.message);

    res.status(500).json({
      message: "Server error while updating skill"
    });
  }
};


// DELETE a skill
const deleteSkill = async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id);

    if (!skill) {
      return res.status(404).json({
        message: "Skill not found"
      });
    }

    // Only the mentor who created the skill can delete it
    if (skill.mentor.toString() !== req.user.id) {
      return res.status(403).json({
        message: "You can delete only your own skills"
      });
    }

    await skill.deleteOne();

    res.status(200).json({
      message: "Skill deleted successfully"
    });

  } catch (error) {
    console.error("Delete skill error:", error.message);

    res.status(500).json({
      message: "Server error while deleting skill"
    });
  }
};


module.exports = {
  createSkill,
  getSkills,
  getSkillById,
  updateSkill,
  deleteSkill
};