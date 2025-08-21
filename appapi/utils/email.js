import { VERIFICATION_EMAIL_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE, PASSWORD_RESET_REQUEST_TEMPLATE, WELCOME_EMAIL } from "./emailTemplates.js"
import {emailClient, sender} from '../config/mailtrap.conf.js'

export const sendVerificationEmail = async (email, verificationToken) => {
	
  try {
		const response = await emailClient.sendMail({
			from: {
        address: sender.email,
        name: sender.name
      },
      to: email,
      subject: "Verify your email",
      html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
      category: "Email Verification"
    })

		console.log("Email sent successfully", response);
	} catch (error) {
		console.error(`Error sending verification`, error);
		throw new Error(`Error sending verification email: ${error}`);
	}

}


export const sendWelcomeEmail = async (email, name) => {

	 try {
		const response = await emailClient.sendMail({
			from: {
        address: sender.email,
        name: sender.name
      },
			to: email,
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


	 try {
		const response = await emailClient.sendMail({
			from: {
        address: sender.email,
        name: sender.name
      },
			to: email,
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


	 try {
		const response = await emailClient.sendMail({
			from: {
        address: sender.email,
        name: sender.name
      },
			to: email,
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
