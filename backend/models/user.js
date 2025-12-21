import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
        userName : String,
        password : String,
        email : String,
        role: String,
},        {timestamps:true}
)
export default mongoose.model("User",userSchema)