import jwt, { decode } from "jsonwebtoken";
import { User } from "../Models/Users.js";

export const userAuth = async (req,res,next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1] || req.headers.token;
        
        if (!token) {
            return res.status(401).json({
                success: false,
            });
        }

        // 2. Verify token
        const decoded = jwt.verify(token, process.env.jwt_Sec);
        // console.log(decoded);
        
        // 3. Check if decoded data is valid
        if (!decoded?._id) { // Note: Mongoose uses lowercase '_id'
            return res.status(401).json({
                success: false,
                message: "Invalid token format"
            });
        }

        // 4. Find user in database
        const user = await User.findById(decoded._id);
        
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        // 5. Attach user to request
        req.user = user;
        next();

    }
    catch (error) {
        return res.status(500).json({
            message: "Loging first",
            reason: error.message
        })
    }
}

