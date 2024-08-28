const router = require("express").Router();

const studentApiController = require("./student");

router.use("/student", studentApiController);

module.exports = router;
