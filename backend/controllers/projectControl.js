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
      const limit = parseInt(req.query.limit) || 5;
  
      // Fetch random posts
      const projects = await Project.aggregate([
        { 
          $match: { createdBy: { $ne: req.user._id } } // Exclude posts by the current user
        },
        { 
          $sample: { size: limit } // Randomly sample the documents
        },
        {
          $lookup: {
            from: "users", 
            localField: "createdBy", 
            foreignField: "_id", 
            as: "creatorDetails"
          }
        },
        {
          $unwind: "$creatorDetails"
        },
        {
          $lookup: {
            from: "users",
            localField: "likes",
            foreignField: "_id",
            as: "likeDetails"
          }
        },
        {
          $lookup: {
            from: "users",
            localField: "shares",
            foreignField: "_id",
            as: "shareDetails"
          }
        },
        {
          $lookup: {
            from: "comments",
            localField: "_id",
            foreignField: "project",
            as: "commentDetails"
          }
        },
        {
          $project: {
            description: 1,
            likes: { $size: "$likeDetails" },
            shares: { $size: "$shareDetails" },
            comments: { 
              $map: {
                input: "$commentDetails",
                as: "comment",
                in: {
                  id: "$$comment._id",
                  text: "$$comment.text",
                  createdAt: "$$comment.createdAt",
                  user: {
                    id: "$$comment.user",
                    username: "$$comment.username",
                    profileImage: "$$comment.profileImage"
                  }
                }
              }
            },
            createdBy: {
              id: "$creatorDetails._id",
              username: "$creatorDetails.username",
              profileImage: "$creatorDetails.profileImage"
            }
          }
        }
      ]);
  
      res.status(200).json(projects);
      
    } catch (error) {
      console.error('Error fetching feed:', error);
      res.status(500).json({ message: 'Server error' });
    }  
};

// Fetch a single post's details with comments
exports.getSingleProject = async (req, res) => {
  try {
    const project = await Project.aggregate([
      {
        $match: { _id: req.params.id }
      },
      {
        $lookup: {
          from: "users",
          localField: "createdBy",
          foreignField: "_id",
          as: "creatorDetails"
        }
      },
      {
        $unwind: "$creatorDetails"
      },
      {
        $lookup: {
          from: "users",
          localField: "likes",
          foreignField: "_id",
          as: "likeDetails"
        }
      },
      {
        $lookup: {
          from: "users",
          localField: "shares",
          foreignField: "_id",
          as: "shareDetails"
        }
      },
      {
        $lookup: {
          from: "comments",
          localField: "_id",
          foreignField: "project",
          as: "commentDetails"
        }
      },
      {
        $project: {
          description: 1,
          likes: { $size: "$likeDetails" },
          shares: { $size: "$shareDetails" },
          comments: {
            $map: {
              input: "$commentDetails",
              as: "comment",
              in: {
                id: "$$comment._id",
                text: "$$comment.text",
                createdAt: "$$comment.createdAt",
                user: {
                  id: "$$comment.user",
                  username: "$$comment.username",
                  profileImage: "$$comment.profileImage"
                }
              }
            }
          },
          createdBy: {
            id: "$creatorDetails._id",
            username: "$creatorDetails.username",
            profileImage: "$creatorDetails.profileImage"
          }
        }
      }
    ]);

    if (!project || project.length === 0) {
      return res.status(404).json({ error: "Project not found" });
    }

    res.status(200).json(project[0]); // Return the single project with comments
  } catch (error) {
    console.error('Error fetching single post:', error);
    res.status(500).json({ message: 'Server error' });
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

// Comment on a project - Updated to handle a specific post and comment section
exports.commentOnProject = async (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: "Comment text is required" });
  }

  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ error: "Project not found" });

    // Add the new comment
    const newComment = {
      user: req.user._id,
      text,
    };

    project.comments.push(newComment);
    await project.save();
    res.json(project); // Returning updated project with new comment
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