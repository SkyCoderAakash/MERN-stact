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
            const user_id = data._id.toString();
            res.status(200).json({ message: 'New Email has been send to your email Id',id:user_id });
        }else{
            res.status(404).json({ message: 'the email you have entered is not exist'});
            console.log('user not found');
        };
    } catch (error) {
        console.log(error.message);
        console.log('server internal error');
    };
};

const gettingOtpForgotPassword = async (req,res)=>{
    try{
        const {email} = req.params;
        const {otp} = req.body;
        const userCheck = await userModel.findOne({email : email});
        const user_id = userCheck._id.toString();
        if(userCheck){
            if(Date.now() - userCheck.verificationCode.timeStamp < 10*60*1000){
                if(userCheck.verificationCode.otp == otp){
                    userCheck.isVarified = 1;
                    const newData = await userCheck.save();
                    if(newData){
                        res.status(200).json({message : "user authenticate",id:user_id });
                    }
                }else{
                    res.status(400).json({message : "invalid otp"});
                };
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

export {forgotPassword,gettingOtpForgotPassword};