import userModel from "../model/userSchema.js";
import bcrypt from 'bcrypt';
import mailSender from "../MailSender.js";
// import { otpSenderController } from "./userMailVerifier.js";

// const registerController = async (req,res)=>{
//     try {
//         const {name,email,contact,password,confirm_password} = req.body;
//         const passwordHash = await bcrypt.hash(password,10);
//         const cPasswordHash = await bcrypt.hash(confirm_password,10);

//         if(!name || !email || !contact || !password || !confirm_password){
//             res.status(400).json({ message: 'Please fill all the fields properly' });
//         }else{
//             const userInfo = await userModel.findOne({email : email});
//             if(!userInfo){
//                 if(password===confirm_password){
//                     const OTP = Math.floor(100000 + Math.random() * 900000);
//                     const text = `your verification code is ${OTP} and this code is valid for 10 min only`;
//                     const data = await userModel({
//                         name,
//                         email,
//                         contact,
//                         password:passwordHash,
//                         confirm_password:cPasswordHash,
//                         verificationCode : {
//                             timeStamp : Date.now(),
//                             otp : OTP,
//                         },
//                     });
//                     mailSender(email, text);
//                     const save_user = await data.save();
//                     res.status(201).json({ message: "User registered successfully and a verifiaction main is send to" ,email });
//                     console.log("1 from regsiterController");
//                 }else{
//                     res.status(400).json({ message: 'Please fill the password properly' });
//                     console.log("2 from regsiterController");
//                 }
//             }else{
//                 res.status(409).json({ message: 'This email is already registered. Please use another email or login' });
//                 console.log("3 from regsiterController");
//             };
//         };
//     } catch (error) {
//         res.status(500).json({ message: 'Internal server error in registerController' });
//     };
// };

const registerController = async (req,res)=>{
    try {
        const {name,email,contact,password,confirm_password} = req.body;
        const passwordHash = await bcrypt.hash(password,10);
        const cPasswordHash = await bcrypt.hash(confirm_password,10);

        if(!name || !email || !contact || !password || !confirm_password){
            res.status(400).json({ message: 'Please fill all the fields properly' });
        }else{
            const userInfo = await userModel.findOne({email : email});
            if(!userInfo){
                if(password===confirm_password){
                    const OTP = Math.floor(100000 + Math.random() * 900000);
                    const text = `your verification code is ${OTP} and this code is valid for 10 min only`;
                    const data = await userModel({
                        name,
                        email,
                        contact,
                        password:passwordHash,
                        confirm_password:cPasswordHash,
                        verificationCode : {
                            timeStamp : Date.now(),
                            otp : OTP,
                        },
                    });
                    mailSender(email, text);
                    const save_user = await data.save();
                    const user_id = save_user._id.toString();
                    res.status(201).json({ message: "User registered successfully and a verifiaction main is send", id: user_id });
                }else{
                    res.status(400).json({ message: 'Please fill the password properly' });
                }
            }else{
                res.status(409).json({ message: 'This email is already registered. Please use another email or login' });
            };
        };
    } catch (error) {
        res.status(500).json({ message: 'Internal server error in registerController' });
    };
};

const loginController = async (req,res)=>{
    try {
        const {email,password} = req.body;
        const userCheck = await userModel.findOne({email : email});
        if(userCheck){
            const passwordCheck = await bcrypt.compare(password,userCheck.password);
            if(passwordCheck){
                if(userCheck.isVarified === 1){
                    res.status(201).json({message : "user login successfully"});
                }else{
                    if(Date.now() - userCheck.verificationCode.timeStamp > 2*60*1000){
                        const OTP = Math.floor(100000 + Math.random() * 900000).toString();
                        const text = `your verification code is ${OTP}`;
                        mailSender(email,text);
                        userCheck.verificationCode = {
                            otp : OTP,
                            timeStamp : Date.now(),
                        };
                        const data = await userCheck.save();
                        // const user_id = data._id.toString();
                        res.status(202).json({ message: 'Email sent again to '+email+' because user is registerd but not verified'});
                    }else{
                        res.status(429).json({ message: 'Please wait for 2 minutes' });
                    };
                };
            }else{
                res.status(404).json({ message: 'invalid data'});
            };
        }else{
            res.status(404).json({ message: 'invalid data' });
        };
    } catch (error) {
        res.ststus(500).json({message : "internal server error"});
    };
};

export {registerController,loginController};