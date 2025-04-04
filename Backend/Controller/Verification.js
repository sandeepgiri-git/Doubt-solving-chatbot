import  jwt  from "jsonwebtoken";

const verifyUser = async (req,res) => {
    try{
        const {otp, verifyToken} = req.body;

        const verify = await jwt.verify(verifyToken, process.env.Activation_Sec);

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

        const token = jwt.sign({_Id: verify._id}, process.env.jwt_Sec, {expiresIn: "7d"})
        
        res.json({
            message: "Logged in Successfully",
            userId: verify.userId,
            email: verify.email,
            token
        })
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            message: err
        })
    }
}

export default verifyUser;