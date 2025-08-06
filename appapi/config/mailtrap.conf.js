import {MailtrapClient} from "mailtrap"
import dotenv from 'dotenv'

  dotenv.config()

const TOKEN = process.env.EmailToken;

export const emailClient = new MailtrapClient({
  token: TOKEN,
});

export const sender = {
  email: "hello@demomailtrap.co",
  name: "Mern Project",
};
