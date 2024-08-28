/* global process */
const sgMail = require("@sendgrid/mail");
const colors = require("colors");

async function sendEmail(to, from = "from@gmail.com", subject, text, html) {
  try {
    if (!process.env.SENDGRID_API_KEY) {
      console.log(colors.red("process.env.SENDGRID_API_KEY is null"));
      throw "Exception: process.env.SENDGRID_API_KEY is null";
    }

    return new Promise((resolve, reject) => {
      sgMail.setApiKey(process.env.SENDGRID_API_KEY);
      const msg = {
        to,
        from: from || process.env.EMAIL_FROM,
        subject: subject || `Email from `,
        text: text || `An email from `,
        html: html || `<strong>Email from <strong>`,
      };
      sgMail
        .send(msg)
        .then(() => {
          resolve(true);
        })
        .catch((error) => {
          reject(error);
        });
    });
  } catch (e) {
    console.log(e);
    return new Error("Something went wrong while sending email");
  }
}

module.exports = {
  sendEmail,
};
