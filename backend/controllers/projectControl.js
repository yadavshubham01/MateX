const Project = require("../models/project");

exports.createProject = async (req, res) => {
  const { description } = req.body;
  try {
    const project = new Project({ description, createdBy: req.user });
    await project.save();
    res.status(201).json(project);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
// Fetch projects to display in feed
exports.getFeedProjects = async (req, res) => {
  try {
    const projects = await Project.find({ createdBy: { $ne: req.user._id } })
      .populate("createdBy", "name profilePicture") // Fetch creator's name and profile picture
      .populate("likes", "name profilePicture") // Fetch names and profile pictures of users who liked
      .populate("shares", "name profilePicture") // Fetch names and profile pictures of users who shared
      .populate("comments.user", "name profilePicture"); // Fetch names and profile pictures of commenters

    const formattedProjects = projects.map(project => ({
      id: project._id,
      title: project.title,
      description: project.description,
      createdBy: {
        id: project.createdBy._id,
        name: project.createdBy.name,
        profilePicture: project.createdBy.profilePicture
      },
      likes: project.likes.map(user => ({
        id: user._id,
        name: user.name,
        profilePicture: user.profilePicture
      })),
      shares: project.shares.map(user => ({
        id: user._id,
        name: user.name,
        profilePicture: user.profilePicture
      })),
      comments: project.comments.map(comment => ({
        id: comment._id,
        text: comment.text,
        createdAt: comment.createdAt,
        user: {
          id: comment.user._id,
          name: comment.user.name,
          profilePicture: comment.user.profilePicture
        }
      }))
    }));

    res.json(formattedProjects);
  } catch (err) {
    console.error("Error fetching feed projects:", err);
    res.status(400).json({ error: err.message });
  }
};


exports.likeProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ error: "Project not found" });

    if (!project.likes.includes(req.user._id)) {
      project.likes.push(req.user._id);
      await project.save();
    }
    res.json(project);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Share a project
exports.shareProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ error: "Project not found" });

    if (!project.shares.includes(req.user._id)) {
      project.shares.push(req.user._id);
      await project.save();
    }
    res.json(project);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Comment on a project
exports.commentOnProject = async (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: "Comment text is required" });
  }

  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ error: "Project not found" });

    const newComment = {
      user: req.user._id,
      text,
    };

    project.comments.push(newComment);
    await project.save();
    res.json(project);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Join a project team
exports.joinProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ error: "Project not found" });

    if (!project.teamMembers.includes(req.user._id)) {
      project.teamMembers.push(req.user._id);
      await project.save();
    }
    res.json(project);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};