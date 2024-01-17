import express from 'express';
const router = express.Router();
import { registerController,loginController } from '../controller/userController.js';
import { mailVerification,otpSenderController } from '../controller/userMailVerifier.js';
import { forgotPassword,gettingOtpForgotPassword } from '../controller/forgotPassword.js';
import { renewPasswordController } from '../controller/renewPasswordController.js';

router.post('/user/register',registerController ); // for user register 
router.post('/user/verification/:email',mailVerification ); // for take the OTP from user after register
router.post('/register/resendOTP/:email',otpSenderController); // for resend otp from any where
router.post('/user/login',loginController);  // for login;


router.post('/user/forgotPassword',forgotPassword);  // w c for forgot password (get a mail from user and verify it)
router.post('/user/forgotPassword/OTP_verification/:email',gettingOtpForgotPassword); // if user is verify then it will work 
router.post('/user/renewPassword/:email',renewPasswordController); // if otp fot fogot passwrod will match then only will work

export default router;