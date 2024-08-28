const md5 = require("md5");
const Models = require("../../models/model");

async function createStudent(req, res) {
  try {
    const data = req.body;

    data.role = "student";
    data.password = md5(data.password);

    const student = new Models.User(data);
    await student.save();

    return res.status(200).json({ success: true, data: student });
  } catch (err) {
    return res.status(500).json({ success: false, message: err });
  }
}

async function getAllStudents(req, res) {
  console.log("getAllStudents");
}

module.exports = {
  createStudent,
  getAllStudents,
};
