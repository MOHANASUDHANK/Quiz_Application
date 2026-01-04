import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import User from "../models/user.js"

export const register = async(req , res, next)=>{
        try{

        const {userName, password, email} = req.body;
        const hashedPassword = await bcrypt.hash(password,10);

        const user = new User({
                userName,
                password:hashedPassword,
                email,
                role : "user"
        });

        await user.save();

        res.status(200).json(user);

        }catch(err){

                res.status(500).json({message : "error while registering",error : err.message})

        }

}

export const login = async(req, res) =>{
        try {
                console.log(req.body);
                
                const{email,password} = req.body;
                console.log("entered");

                const user = await User.findOne({email});
                                console.log("entered");

                if(!user){
                        return res.status(400).json({message : "user not found"});
                                        console.log("entered");

                }

                const match = await bcrypt.compare(password,user.password);
                                console.log("entered");

                if(!match){
                        return res.status(400).json({message : "invalid username"});
                                        console.log("entered");

                }
                console.log("entered");

                const token = jwt.sign(
                        {id : user._id},
                        process.env.JWT_SECRET,
                        {expiresIn:"1d"}
                )
                                console.log("entered");


                res.status(200).json({token});
                                console.log("entered");


        } catch (err) {
                res.status(500).json({message:"error while login",error:err.message});
        }
}