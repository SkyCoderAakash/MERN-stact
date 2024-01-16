import userModel from "../model/userSchema.js";
import mailSender from "../MailSender.js";

const forgotPassword = async (req,res)=>{
    try {
        const {email} = req.body;
        const userCheck = await userModel.findOne({email : email});
        if(userCheck){
            const OTP = Math.floor(100000 + Math.random() * 900000).toString();
            const text = `your verification code is ${OTP} for forgot password`;
            mailSender(email,text);
            userCheck.verificationCode = {
                otp : OTP,
                timeStamp : Date.now(),
            };
            const data = await userCheck.save();
            res.status(200).json({ message: 'New Email has been send to your email Id'});
            // now we have to show a from with 2 fields that is for password and confirm password
        }else{
            res.status(404).json({ message: 'the email you have entered is not exist'});
        };
    } catch (error) {
        console.log(error.message);
    };
};

const gettingOTP = async (req,res)=>{
    try{
        const {email} = req.params;
        const {otp} = req.body;
        const userCheck = await userModel.findOne({email : email});
        if(userCheck){
            if(Date.now() - userCheck.verificationCode.timeStamp < 10*60*1000){
                if(userCheck.verificationCode.otp == otp){
                    console.log("show a from for update password");
                }else{
                    console.log("invaild OTP")
                }
            }else(
                cosole.log('req timeout please send mail again')
            );
        }else{
            console.log("404 not found");
        }
    } catch (error) {
        res.status(500).json({messgae : "internal server error"});
    };
}

export {forgotPassword,gettingOTP};