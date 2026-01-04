import jwt from "jsonwebtoken"

export const protect = async (req,res,next) => {
        const authHeader = req.headers.authorization;

        if(!authHeader || !authHeader.startsWith("Bearer")){
                console.log(req.headers)
                return res.status(401).json({message:"No token provided"});
        }

        const token = authHeader.split(" ")[1];

        try {
                const decoded = jwt.verify(token,process.env.JWT_SECRET)
                req.userId = decoded.id;
                next();
        } catch (err) {
                console.log(authHeader)
                return res.status(401).json({message:"Invalid token provided"});

        }
} 

export const authorize = (...roles) => {
        return (req,res,next) => {
                if(!roles.includes(req.body.role)){
                        return res.status(403).json({message : "Access denied"})
                }
                next();
        }
}