import sendMail from "../Middlewares/sendMail.js";
import { User } from "../Models/Users.js";
import   jwt  from "jsonwebtoken";
// const jwt = require('jsonwebtoken');
// const verify = require('jsonwebtoken');

export const loginUser = async (req, res) => {
    try {
        const { email } = req.body;
        console.log("Login attempt for:", email);

        // 1. Check DB Connection
        let user = await User.findOne({ email }).lean();
        console.log("Database check complete");

        if (!user) {
            console.log("Creating new user...");
            user = new User({ email });
            await user.save();
            console.log("New user saved");
        }

        const otp = Math.floor(Math.random() * 1000000);

        const tokenPayload = {
            userId: user._id,
            email: user.email,
            otp,
        };

        const verifyToken = jwt.sign(tokenPayload, process.env.Activation_Sec, {
            expiresIn: "10m",
        });

        // 2. The critical point
        console.log("Attempting to send email...");
        await sendMail(email, "Chatbot", otp);
        console.log("Email sent successfully");

        res.json({
            message: "OTP sent to your mail",
            verifyToken
        });
    } catch (err) {
        console.error("DETAILED LOGIN ERROR:", err); // Look for this in Render Logs
        res.status(500).json({
            message: err.message,
        });
    }
};

export const verifyUser = async (req,res) => {
    try{
        const {otp, verifyToken} = req.body;

        const verify = jwt.verify(verifyToken, process.env.Activation_Sec);

        if(!verify){
            return res.status(400).json({
                message: "OTP Expired",
            })
        }

        if(verify.otp !== otp){
            return res.status(400).json({
                message: "Wrong OTP",
            })
        }

        const token = jwt.sign(
            {
              _id: verify.userId,  // MUST include this
              email: verify.email,
            },
            process.env.jwt_Sec,
            { expiresIn: '7d' }
          );

        // console.log(verify);
        
        res.json({
            message: "Logged in Successfully",
            user: verify.userId,
            email: verify.email,
            token
        })
    }
    catch(err){
        // console.log(err);
        res.status(500).json({
            message: err
        })
    }
}

export const myProfile = async (req,res) => {
    try{
        const user = await User.findById(req.user._Id);
        // console.log("request profile: ",req.body);
        res.json({
            user: req.user
        });
    }catch(err){
        res.status(500).json({
            message: err.message
        })
    }
} 