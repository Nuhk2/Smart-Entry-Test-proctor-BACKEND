const router = require("express").Router();
const studentApiService = require("../../services/api/student");
const guard = require("../../guards/index");

router.get("/list", studentApiService.getAllStudents);

router.post(
  "/create",
  guard.checkPermissions("students", "create", "any", ["*"]),
  studentApiService.createStudent
);

module.exports = router;
