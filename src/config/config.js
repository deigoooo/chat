import dotenv from "dotenv";
import { Command } from "commander";

const program = new Command();

program.option("-p <port>", "puerto del server", 8080);

program.parse();

dotenv.config({
  path: ".env.development",
});

console.log(program.opts().p)

export default {
  app: {
    persistence: process.env.PERSISTENCE,
  },
  mongo: {
    url: process.env.URI_MONGO,
    db_name: process.env.DBNAME_MONGO,
    secret: process.env.SECRET,
  },
  github: {
    github_client_id: process.env.GITHUB_CLIENT_ID,
    github_client_secret: process.env.GITHUB_CLIENT_SECRET,
    github_callback_url: process.env.GITHUB_CALLBACK_URL,
  },
  google: {
    google_client_id: process.env.GOOGLE_CLIENT_ID,
    google_client_secret: process.env.GOOGLE_CLIENT_SECRET,
    google_callback_url: process.env.GOOGLE_CALLBACK_URL,
  },
  nodemailer: {
    nodemailer_user: process.env.NODEMAILER_USER,
    nodemailer_password: process.env.NODEMAILER_PASS,
  },
  stripe: {
    stripe_access_token: process.env.STRIPE_ACCESS_TOKEN,
  },
  HOST: process.env.HOST,
  PORT: program.opts().p || 8080,
  //MODE: program.opts().mode,
};
