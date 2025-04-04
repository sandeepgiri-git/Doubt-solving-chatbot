import mongoose from "mongoose";

const schema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        require: true
    }, 

    latestMessage: {
        type: String,
        default: "New chat"
    },

    },
    {
        timestamps: true,
    }
)

export const Chat = mongoose.model("Chat", schema);