import * as path from "path";
import * as fs from "fs";
import * as handlebars from "handlebars";
import * as nodemailer from "nodemailer";

interface SendEmailProps {
    email: string;
    subject: string;
    payload: object;
    template: string;
    onError: (error: Error) => void;
    onSuccess: () => void;
}
export const sendEmail = async ({ email, subject, payload, template, onError, onSuccess }: SendEmailProps) => {
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            host: "smtp.gmail.com",
            port: 465,
            secure: true, // use SSL
            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASSWORD, // replace both with your real credentials or an application-specific password
            },
        });

        const source = fs.readFileSync(path.join(__dirname, template), "utf8");
        const compiledTemplate = handlebars.compile(source);
        const options = () => ({
            from: process.env.EMAIL_USERNAME,
            to: email,
            subject: subject,
            html: compiledTemplate(payload),
        });

        // Send email
        transporter.sendMail(options(), (error, info) => {
            if (error) {
                onError(error);
            } else {
                onSuccess();
            }
        });
    } catch (error: unknown) {
        console.log(error);
        onError(error as Error);
    }
};
