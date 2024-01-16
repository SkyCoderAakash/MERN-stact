import express from 'express';
const router = express.Router();
import { registerController,loginController } from '../controller/userController.js';
import { mailVerification,otpSenderController } from '../controller/userMailVerifier.js';
import { forgotPassword,gettingOTP } from '../controller/forgotPassword.js';

router.post('/user/register',registerController ); // for user register
router.post('/user/verification/:email',mailVerification ); // for take the OTP from user
router.post('/register/resendOTP/:email',otpSenderController); // for resend otp
router.post('/user/login',loginController);  // for login;


router.post('/user/forgotPassword',forgotPassword);
router.post('/user/forgotPassword/OTP_verification/:email',gettingOTP);

export default router;