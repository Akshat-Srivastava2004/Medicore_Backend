import nodemailer from "nodemailer"

let transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'akshatsri2004alld@gmail.com',
        pass: '8081258368pranusrivastava'
    }
});
export {transporter}