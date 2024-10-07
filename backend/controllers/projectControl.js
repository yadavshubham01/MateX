const Project = require("../models/project");

// Create a project
exports.createProject = async (req, res) => {
  const { title, description } = req.body;
  try {
    const project = new Project({ title, description, createdBy: req.user });
    await project.save();
    res.status(201).json(project);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.bulkProject =async (req,res) => {
   try {
      const projects= await Project.find();
       res.json(projects);
   }catch(e){
    res.json({ msg:"Invalid "})
   }
}
// Like a project
exports.likeProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project.likes.includes(req.user)) {
      project.likes.push(req.user);
      await project.save();
    }
    res.json(project);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Join a project team
exports.joinProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project.teamMembers.includes(req.user)) {
      project.teamMembers.push(req.user);
      await project.save();
    }
    res.json(project);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
