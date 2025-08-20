import { VERIFICATION_EMAIL_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE, PASSWORD_RESET_REQUEST_TEMPLATE, WELCOME_EMAIL } from "./emailTemplates.js"
import {emailClient, sender} from '../config/mailtrap.conf.js'

export const sendVerificationEmail = async (email, verificationToken) => {
  const recipient = [{ email }]

  try {
		const response = await emailClient.sendMail({
			from: sender,
			to: recipient,
			subject: "Verify your email",
			html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
			category: "Email Verification",
		});

		console.log("Email sent successfully", response);
	} catch (error) {
		console.error(`Error sending verification`, error);
		throw new Error(`Error sending verification email: ${error}`);
	}


}


export const sendWelcomeEmail = async (email, name) => {
	 const recipient = [{ email }]

	 try {
		const response = await emailClient.sendMail({
			from: sender,
			to: recipient,
			subject: "Welcome to our team",
			html: WELCOME_EMAIL.replace("{name}", name),
			category: "Welcome",
		});
		console.log("Welcome email sent successfully", response);
	 } catch (error) {
		console.error(`Error sending welcome`, error);
		throw new Error(`Error sending welcome email: ${error}`);
	 }
}

export const forgetpasswordEmail = async (email, resetUrl) => {
	 const recipient = [{ email }]

	 try {
		const response = await emailClient.sendMail({
			from: sender,
			to: recipient,
			subject: "Reset Your Password",
			html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetUrl ),
			category: "Password reset request",
		});
		console.log("Reset password request email send", response);
	 } catch (error) {
		console.error(`Error sending welcome`, error);
		throw new Error(`Error sending welcome email: ${error}`);
	 }
}

export const resetPasswordConfirm = async (email) => {
	 const recipient = [{ email }]

	 try {
		const response = await emailClient.sendMail({
			from: sender,
			to: recipient,
			subject: "Reset Your Password successfully",
			html: PASSWORD_RESET_SUCCESS_TEMPLATE,
			category: "Password reset successfully",
		});
		console.log("Reset password successfully updated", response);
	 } catch (error) {
		console.error(`Error sending reset password`, error);
		throw new Error(`Error sending reset password: ${error}`);
	 }
}
