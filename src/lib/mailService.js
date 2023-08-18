import nodemailer from "nodemailer";

export async function sendMail(sender, subject, message) {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.NODEMAILER_EMAIL,
      pass: process.env.NODEMAILER_PW,
    },
  });

  let firstName = subject.toLowerCase();
  let array = firstName.split(" ");
  firstName = array[0];

  const name = subject;
  const email = sender;

  const mailOptions = {
    from: `${name} <${email}>`,
    to: process.env.NODEMAILER_EMAIL,
    subject: subject,
    text: message + "Sent from: " + email,
    html: `
    <p>${name}</p> 
    <div>${message}</div>
    <p>Sent from:
    ${email}</p>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: "Message Sent" };
  } catch (error) {
    return { error: "Message Not Sent!" };
  }
}
