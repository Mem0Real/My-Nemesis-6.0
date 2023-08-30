import nodemailer from "nodemailer";
const fs = require("fs");
import { join } from "path";

const path = process.cwd();
const htmlPath = "public/mail.html";

const location = join(path, htmlPath);
const htmlTemplate = fs.readFileSync(location, "utf8");

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

	let htmlContent = htmlTemplate.replace("{{name}}", name);
	htmlContent = htmlContent.replace("{{message}}", message);
	htmlContent = htmlContent.replace("{{email}}", email);

	const mailOptions = {
		from: `${name} <${email}>`,
		to: process.env.NODEMAILER_EMAIL,
		subject: subject,
		// text: message + "Sent from: " + email,
		// html: `<div style={display: flex, }
		// <p>${name}</p>
		// <div>${message}</div>
		// <p>Sent from:
		// ${email}</p>`,

		// 	html: `
		//   <div
		//     style="
		//       display: flex;
		//       flex-direction: column;
		//       justify-content: center;
		//       align-items: center;
		//       gap: 5;
		//       background-color: #313131;
		//       color: azure;
		//       width: 100%;
		//       height: 100%;
		//       padding-top: 4em;
		//     "
		// >
		//   <h1 style="font-weight: 500; text-decoration: underline; font-size: 50px">
		//     Ethio Machineries
		//   </h1>
		//   <h3 style="margin-top: 15px">You have recieved an email from ${name}</h3>
		//   <p style="border: 1px solid #acacac; border-radius: 10px">${message}</p>
		//         <h2 style="margin-top: 30px; align-self: flex-end;">Please reply to ${name} at ${email}</h2>
		// </div>`,
		html: htmlContent,
	};

	try {
		await transporter.sendMail(mailOptions);
		return { success: "Message Sent" };
	} catch (error) {
		return { error: "Message Not Sent!" };
	}
}
