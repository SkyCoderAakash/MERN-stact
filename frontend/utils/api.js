const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// In-memory storage for verification codes and last sent time
const verificationCodes = {};
const resendTimeouts = {};

// Dummy email configuration (replace with your actual email configuration)
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'aakashprajapati000001@gmail.com',
        pass: 'avjfwkqvtezlfbjx',
    },
});

app.use(bodyParser.json());

// Endpoint to request a verification code
app.post('/request-verification', (req, res) => {
    const { email } = req.body;

    // Check if a code was already sent within the last 5 minutes
    if (resendTimeouts[email] && Date.now() - resendTimeouts[email] < 5 * 60 * 1000) {
        return res.status(429).json({ error: 'Please wait 5 minutes before requesting a new verification code.' });
    }

    // Generate a random 6-digit verification code
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

    // Save the verification code and timestamp
    verificationCodes[email] = {
        code: verificationCode,
        timestamp: Date.now(),
    };

    // Send the verification email
    sendVerificationEmail(email, verificationCode);

    // Set a timeout to allow resending after 5 minutes
    resendTimeouts[email] = Date.now();

    res.json({ message: 'Verification code sent successfully.' });
});

// Function to send a verification email
function sendVerificationEmail(email, code) {
    const mailOptions = {
        from: 'your-email@gmail.com',
        to: email,
        subject: 'Verification Code',
        text: `Your verification code is: ${code}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
        } else {
            console.log(`Verification email sent: ${info.response}`);
        }
    });
}

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});