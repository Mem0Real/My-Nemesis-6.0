var nodemailer = require("nodemailer");

export async function sendMail(sender, subject, message) {
	var transporter = nodemailer.createTransport({
		service: "gmail",
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
		text: message,
	};

	transporter.sendMail(mailOptions, function (error, info) {
		if (error) {
			throw new Error(error);
		} else {
			return true;
		}
	});
}
