import { MailtrapClient } from "mailtrap";

const client = new MailtrapClient({ token: process.env.MAILTRAP_TOKEN });

export default client;
