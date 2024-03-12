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

/**
 * Sends an email using nodemailer and handlebars.<br/>
 * The email is sent to the specified email address with the specified subject and payload.<br/>
 * The template is the path to the handlebars template.<br/>
 * If an error occurs, the onError function is called with the error as an argument.<br/>
 * If the email is sent successfully, the onSuccess function is called.
 * @param email
 * @param subject
 * @param payload
 * @param template
 * @param onError
 * @param onSuccess
 */
export const sendEmail = async ({ email, subject, payload, template, onError, onSuccess }: SendEmailProps) => {
    try {
        // Create a transporter to send the email with the specified credentials
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

        // Compile the handlebars template with the specified payload
        const source = fs.readFileSync(path.join(__dirname, template), "utf8");
        const compiledTemplate = handlebars.compile(source);
        const options = () => ({
            from: process.env.EMAIL_USERNAME,
            to: email,
            subject: subject,
            html: compiledTemplate(payload),
        });

        // Send email
        transporter.sendMail(options(), (error) => {
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
