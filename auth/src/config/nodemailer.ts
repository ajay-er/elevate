import nodemailer from 'nodemailer';
import { MailInterface } from '../lib/interfaces';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.APP_PASSWORD
    }
});

export const sendMail = async (options: MailInterface) => {
    return await transporter
        .sendMail({
            from: 'Elevate',
            to: options.to,
            cc: options.cc,
            bcc: options.bcc,
            subject: options.subject,
            text: options.text,
            html: options.html
        })
        .then((info) => {
            console.log('Mail sent successfully!!');
            return info;
        }).catch((err) => {
            console.error(err);
            return null;
        });
};
