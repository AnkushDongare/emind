import nodemailer from "nodemailer";

// Define the type for the email options
interface MailOptions {
    mailTo: string | null;
    subject: string;
    text?: string;
    html?: string;
}

// Create the transporter for SMTP
const transporter = nodemailer.createTransport({
    host: 'smtp.hostinger.com', // Replace with your SMTP server
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.SMTP_USER as string,
        pass: process.env.SMTP_PASS as string,
    },
});

export default async function sendMail({ mailTo, subject, text, html }: MailOptions): Promise<void> {
    // Send the email
    await transporter.sendMail({
        from: "contact@emindcafe.com",
        to: mailTo || "contact@emindcafe.com",
        subject,
        text,
        html,
    });
}
