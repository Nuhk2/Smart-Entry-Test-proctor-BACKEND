const mongoose = require('mongoose');
const generateUserPDF = require('../../utils/pdfGenerator');

const User = mongoose.model('User');

exports.downloadUserPDF = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const pdfBuffer = generateUserPDF(user);

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=User_${user._id}.pdf`);
    res.send(Buffer.concat(pdfBuffer)); // Convert buffers to a single buffer and send
  } catch (error) {
    res.status(500).json({ message: 'Error generating PDF', error });
  }
};
