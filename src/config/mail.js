import nodemailer from "nodemailer"

export const transporter = nodemailer.createTransport({
    service: "gmail",
    port: 587,
    auth: {
        user: "matias2002carmona@gmail.com",
        pass: "fvtsahyeqwlabnbt",
    },
});