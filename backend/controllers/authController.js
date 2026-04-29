import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import User from "../models/user.js"

export const register = async(req , res, next)=>{
        try{

        const {userName, password, email, role} = req.body;
        const hashedPassword = await bcrypt.hash(password,10);

        // Public registration defaults to student
        const userRole = "student";

        const user = new User({
                userName,
                password:hashedPassword,
                email,
                role: userRole
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

                }

                const match = await bcrypt.compare(password,user.password);
                                console.log("entered");

                if(!match){
                        return res.status(400).json({message : "invalid credentials"});

                }
                console.log("entered");

                const token = jwt.sign(
                        {id : user._id,
                        role : user.role || "student"
                        },
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

export const addStaff = async(req, res) => {
        try {
                const {userName, password, email, role} = req.body;
                const hashedPassword = await bcrypt.hash(password, 10);

                const validRoles = ["teacher", "admin"];
                const userRole = validRoles.includes(role) ? role : "teacher";

                const user = new User({
                        userName,
                        password: hashedPassword,
                        email,
                        role: userRole
                });

                await user.save();

                res.status(200).json(user);

        } catch (err) {
                res.status(500).json({message: "error while adding staff", error: err.message});
        }
}