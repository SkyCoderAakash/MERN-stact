import mailSender from "../MailSender.js";
import userModel from "../model/userSchema.js";

const mailVerification = async (req,res)=>{
    try {
        const email = req.params.email;
        const userCheck = await userModel.findOne({email : email});
        if(userCheck){
            if(Date.now()-userCheck.verificationCode.timeStamp < 10*60*1000){
                if(req.body.otp==userCheck.verificationCode.otp){
                    userCheck.isVarified = 1
                    const newData = await userCheck.save();
                    if(newData){
                        res.status(200).json({ message: 'User registration successful' });
                        console.log('welcome to our app');
                    }
                }else{
                    res.status(401).json({ message: 'Please enter correct OTP' });
                };
            }else{
                res.status(408).json({ message: 'Request time out please resend the OTP' });
            };
        }else{
            res.status(404).json({ message: "404 not found" });
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal server error in mailVerification' });
    };
};

const otpSenderController = async (req,res)=>{
    try {
        const OTP = Math.floor(100000 + Math.random() * 900000).toString();
        const text = `your verification code is ${OTP}`;
        const email = req.params.email;
        const userCheck = await userModel.findOne({email : email});
        if(userCheck){
            if(userCheck.isVarified != 1){
                if(Date.now() - userCheck.verificationCode.timeStamp > 2*60*1000){
                    mailSender(email,text);
                    userCheck.verificationCode = {
                        otp : OTP,
                        timeStamp : Date.now(),
                    };
                    await userCheck.save();
                    res.status(200).json({ message: 'Email sent again to', email });
                }else(
                    res.status(429).json({ message: 'Please wait for 2 minutes' })
                );
            }else{
                res.status(400).json({ message : "this user is verified"});
            }
        }else{
            res.status(404).json({ message: "User does not match" });
        };
    } catch (error) {
        res.status(500).json({ message: 'Internal server error in otpSenderController' });
    };
};

export {mailVerification,otpSenderController};