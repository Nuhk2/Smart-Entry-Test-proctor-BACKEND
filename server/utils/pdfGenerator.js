const PDFDocument = require('pdfkit');
const path = require('path');
const fs = require('fs');

function generateUserPDF(userDetails) {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument();
      let buffers = [];

      // Collect data chunks
      doc.on('data', buffers.push.bind(buffers));
      
      // On end, concatenate buffers and resolve the Promise
      doc.on('end', () => {
        const pdfData = Buffer.concat(buffers);
        resolve(pdfData);
      });

      const {
        first_name,
        last_name,
        gender,
        email,
        phone_no,
        role,
        profile_image,
      } = userDetails;

      // Title
      doc.fontSize(20).text('User Information', { align: 'center' });
      doc.moveDown();

      // Name
      doc.fontSize(14).text(`Name: ${first_name} ${last_name}`, { align: 'left' });
      
      // Gender
      doc.text(`Gender: ${gender || 'N/A'}`, { align: 'left' });

      // Email
      doc.text(`Email: ${email}`, { align: 'left' });

      // Phone Number
      doc.text(`Phone Number: ${phone_no || 'N/A'}`, { align: 'left' });

      // Role
      doc.text(`Role: ${role}`, { align: 'left' });

      // Profile Image
      if (profile_image && profile_image.length > 0) {
        const imagePath = path.resolve(__dirname, '..', 'uploads', profile_image[0].file_name);

        // Check if image exists
        if (fs.existsSync(imagePath)) {
          doc.image(imagePath, {
            fit: [150, 150],
            align: 'center',
            valign: 'center',
          });
        } else {
          doc.text('Profile image not found.', { align: 'left' });
        }
      } else {
        doc.text('No Profile Image Available', { align: 'left' });
      }

      doc.end();
    } catch (error) {
      reject(error);
    }
  });
}

module.exports = generateUserPDF;
