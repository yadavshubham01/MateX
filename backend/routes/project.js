const express = require("express");

const { createProject, likeProject, joinProject, commentOnProject, shareProject, getFeedProjects } = require("../controllers/projectControl");
const { protect } = require("../middleware");

const router = express.Router();

router.post("/projects", protect, createProject);
router.get("/bulk", protect, getFeedProjects);
router.post("/projects/:id/like", protect, likeProject);
router.post("/projects/:id/join", protect, joinProject);
router.post("/projects/:id/share", protect, shareProject);
router.post("/projects/:id/comment", protect, commentOnProject);

module.exports = router;
