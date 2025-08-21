import nodemailer from 'nodemailer'

export const emailClient = nodemailer.createTransport({

  host: process.env.HOST,
  port: Number(process.env.PORTEMAIL),
  secure: true,
  auth: {
    user: process.env.USER,
    pass: process.env.PASSWORD,
  }
});

export const sender = {
  email: process.env.USER,
  name: "Mern Project",
};
