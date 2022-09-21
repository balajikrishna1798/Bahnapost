import mongoose from "mongoose";

const OtpSchema = new mongoose.Schema({

    email:{type:String},
    code:{type:String},
    expiresIn:{type:Number},
},{
    //@ts-expect-error
    timeStamps:{type:Boolean,default:true}
})
export const Otp = mongoose.model("Otp",OtpSchema)