const express = require("express");
const router = express.Router();
const authentication = require("../middlewares/authentication");

const noteController = require("../controllers/noteController.js");

router.get("/api/notes", authentication, noteController.findNotes);
router.get("/api/notes/:id", authentication, noteController.findNoteById);
router.post("/api/notes", authentication, noteController.createNote);
router.put("/api/notes/:id", authentication, noteController.updateNote);
router.delete("/api/notes/:id", authentication, noteController.deleteNote);

module.exports = router;
