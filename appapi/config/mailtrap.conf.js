import nodemailer from 'nodemailer'

export const emailClient = nodemailer.createTransport({

 host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "c0f8bb8ad0bdef",
    pass: "85fd176345e6fb"
  }
});

export const sender = {
  email: "test@qtechit.dev",
  name: "Mern Project",
};
