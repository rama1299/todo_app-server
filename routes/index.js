const express = require("express");
const router = express.Router();

const authRouter = require("./authRouter.js");
const userRouter = require("./userRouter.js");
const listRouter = require("./listRouter.js");
const taskRouter = require("./taskRouter.js");
const subtaskRouter = require("./subtaskRouter.js");
const taskcommentRouter = require("./taskcommentRouter.js");
const noteRouter = require("./noteRouter.js");

router.use(authRouter);
router.use(userRouter);
router.use(listRouter);
router.use(taskRouter);
router.use(subtaskRouter);
router.use(taskcommentRouter);
router.use(noteRouter);

module.exports = router;
