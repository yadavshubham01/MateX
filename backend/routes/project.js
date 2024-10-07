const express = require("express");

const { createProject, likeProject, joinProject, bulkProject } = require("../controllers/projectControl");
const { protect } = require("../middleware");

const router = express.Router();

router.post("/projects", protect, createProject);
router.post("/projects/bulk", protect, bulkProject);
router.post("/projects/:id/like", protect, likeProject);
router.post("/projects/:id/join", protect, joinProject);

module.exports = router;
