const { NODEMAILER_PASSWORD, NODEMAILER_USER } = process.env;
const nodemailer = require("nodemailer");

const transport = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: NODEMAILER_USER,
    pass: NODEMAILER_PASSWORD,
  },
});

const sendEmail = async (to, subject, text, html) => {
  await transport.sendMail({
    from: `Organización de Ambientalistas Autoconvocados <${NODEMAILER_USER}>`,
    to,
    subject,
    text,
    html,
  });
};

module.exports = { transport, sendEmail };