import nodemailer from "nodemailer";

interface sendEmailDataTypes {
  to: string;
  subject: string;
  text: string;
  html: string;
}

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "ganabacode@gmail.com",
    pass: "xjml fqdu xxca wcru",
  },
});

export const sendEmail = async ({
  to,
  subject,
  text,
  html,
}: sendEmailDataTypes) => {
  try {
    const info = await transporter.sendMail({
      from: '"DriveElite" <ganabacode@gmail.com>',
      to,
      subject,
      text,
      html,
    });

    return info;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};
