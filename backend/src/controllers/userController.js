const mongoose = require("mongoose");
const User = require("../models/User");

const getCurrentUser = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.user.id)) {
      return res.status(401).json({
        message: "Invalid authenticated user"
      });
    }

    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User profile not found"
      });
    }

    return res.status(200).json({ user });
  } catch (error) {
    console.error("Get profile error:", error.message);
    return res.status(500).json({
      message: "Unable to load profile"
    });
  }
};

const updateCurrentUser = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.user.id)) {
      return res.status(401).json({
        message: "Invalid authenticated user"
      });
    }

    const { name, bio, skills } = req.body;

    if (typeof name !== "string" || !name.trim()) {
      return res.status(400).json({
        message: "Name cannot be empty"
      });
    }

    if (bio !== undefined && typeof bio !== "string") {
      return res.status(400).json({
        message: "Bio must be text"
      });
    }

    if (
      skills !== undefined &&
      (!Array.isArray(skills) || skills.some((skill) => typeof skill !== "string"))
    ) {
      return res.status(400).json({
        message: "Skills must be a list of text values"
      });
    }

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        message: "User profile not found"
      });
    }

    user.name = name.trim();
    user.bio = typeof bio === "string" ? bio.trim() : user.bio;
    user.skills = Array.isArray(skills)
      ? skills.map((skill) => skill.trim()).filter(Boolean)
      : user.skills;

    await user.save();

    return res.status(200).json({
      message: "Profile updated successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        bio: user.bio,
        skills: user.skills
      }
    });
  } catch (error) {
    console.error("Update profile error:", error.message);
    return res.status(500).json({
      message: "Unable to update profile"
    });
  }
};

module.exports = {
  getCurrentUser,
  updateCurrentUser
};
