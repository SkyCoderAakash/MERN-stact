import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name : {
        required:true,
        type:String,
    },
    email : {
        required:true,
        type:String,
    },
    contact : {
        required:true,
        type:Number,
    },
    password : {
        required:true,
        type:String,
    },
    confirm_password : {
        required:true,
        type:String,
    },
    isVarified : {
        default : 0,
        type:Number,
    },
    isAdmin : {
        default : 0,
        type:Number,
    },
    verificationCode : {
        otp : { type : Number },
        timeStamp : {},
    },
});

const userModel = mongoose.model('USER DATA',userSchema);
export default userModel;