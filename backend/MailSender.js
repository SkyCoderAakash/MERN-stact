import nodemailer from 'nodemailer';

// const verificationCodes = {};
// const resendTimeouts = {};

// app.post('/request-verification', (req, res) => {
    // const { email } = req.body;
    // if (resendTimeouts[email] && Date.now() - resendTimeouts[email] < 5 * 60 * 1000) {
    //     console.log('Please wait 5 minutes before requesting a new verification code.');
    // };
    // const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
    // verificationCodes[email] = {
    //     code: verificationCode,
    //     timestamp: Date.now(),
    // };
    // sendVerificationEmail(email, verificationCode);
    // resendTimeouts[email] = Date.now();
    // res.json({ message: 'Verification code sent successfully.' });
// });

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'aakashprajapati000001@gmail.com',
        pass: 'avjfwkqvtezlfbjx',
    },
});

function mailSender(email, text) {
    const mailOptions = {
        from: 'your-email@gmail.com',
        to: email,
        subject: 'Verification Code',
        text: text,
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
        } else {
            console.log(`Verification email sent: ${info.response}`);
        }
    });
};

export default mailSender;