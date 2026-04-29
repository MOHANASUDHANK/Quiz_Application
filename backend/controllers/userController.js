import User from "../models/user.js"

export const addUser = async (req,res)=>{
        try{
                const data = req.body;
                const user = new User(data);
                await user.save();
                console.log(data);
                res.status(200).json(data);
        }catch(err){
                res.status(500)
                .json({message : "Error while adding user",error : err.message});
        }
}

export const getUserById = async (req,res) =>{
        try {
                const {id} = req.params;
                const data = await User.findById(id);
                console.log(data);
                res.status(200).json(data);
        } catch (err) {
                res.status(500)
                .json({message : "Error while fetching user",error : err.message});
        }
}

export const getStaff = async (req, res) => {
        try {
                const data = await User.find({ role: { $in: ["admin", "teacher"] } }).select("-password");
                res.status(200).json(data);
        } catch (err) {
                res.status(500).json({message: "Error while fetching staff", error: err.message});
        }
}

export const deleteUser = async (req, res) => {
        try {
                const {id} = req.params;
                await User.findByIdAndDelete(id);
                res.status(200).json({message: "User deleted successfully"});
        } catch (err) {
                res.status(500).json({message: "Error while deleting user", error: err.message});
        }
}