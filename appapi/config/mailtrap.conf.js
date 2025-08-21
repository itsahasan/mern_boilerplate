import nodemailer from 'nodemailer'

export const emailClient = nodemailer.createTransport({

 host: "smtppro.zoho.eu",
  port: 465,
  auth: {
    user: "info@qtechit.dev",
    pass: "Pj5#SteMIN!@#"
  }
});

export const sender = {
  email: "info@qtechit.dev",
  name: "Mern Project",
};
