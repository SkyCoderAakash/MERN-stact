import userModel from "../model/userSchema.js";
import bcrypt from 'bcrypt'

const renewPasswordController = async (req,res)=>{
    try {
        const {email} = req.params;
        const {password,confirm_password} = req.body;
        const userCheck = await userModel.findOne({email : email});
        const hashPassword = await bcrypt.hash(password,10);
        const hashConfirmPassword = await bcrypt.hash(confirm_password,10);
        if(userCheck){
            userCheck.password = hashPassword;
            userCheck.confirm_password = hashConfirmPassword;
            await userCheck.save();
            res.status(200).json({message : "password updated"});
        }else{
            res.status(404).json({message : "user not found"});
        };
    } catch (error) {
        console.log(error.message);
    };
};

export {renewPasswordController};