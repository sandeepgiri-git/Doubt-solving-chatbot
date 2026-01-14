import {Chat} from "../Models/Chat.js";
import { Conversation } from "../Models/Conversation.js";

export const createChat = async (req,res) => {
    try{    
        const userId = req.user._id;
        const chat = await Chat.create({
            user: userId,
        })

        res.json(chat)
    }catch(err){
        res.status(500).json({
            message: err.message,
        })
    }

}

export const getAllChats = async (req,res) => {
    try {
        const chats = await Chat.find({user: req.user._id}).sort({createdAt: -1});// fetch all chats in sorted order old to new
        res.json(chats);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        })
    }
}

export const addConversation = async (req,res) => {
    try {
        const chat = await Chat.findById(req.params.id); //find chat by id
        
        if(!chat){  // if not found
            return res.status(404).json({
                message:"No chats found"
            })
        }
        
        const conversation = await Conversation.create({ // if found then create conversation 
            chat: chat._id,
            question: req.body.question,
            answer: req.body.answer
        }) 
        
        const updatedChat = await Chat.findByIdAndUpdate( // update latest chat 
            req.params.id, 
            {latestMessage: req.body.question},
            {new: true}
        )
        // console.log(conversation);

        res.json({conversation, updatedChat}); 
    } 
    catch (err) {
        console.log(err.message);
        res.status(500).json({
            message: err.message,
        })
    }
}

export const getConversation = async (req,res) => {
    try {
        const conversation = await Conversation.find({chat: req.params.id});
        // console.log(conversation);
        if(!conversation){
            return res.status(404).json({
                message:"No Conversation found"
            })
        }

        res.json(conversation);
    } 
    catch (err) {
        // console.log(err.message);
        res.status(500).json({
            message: err.message,
        })
    }
}

export const deleteChat = async (req,res) => {
    try{
        const chat = await Chat.findById(req.params.id).lean();
        // console.log(chat);
        if(!chat){
            return res.status(404).json({
                message:"No Chat found"
            })
        }

        if(chat.user.toString() !== req.user._id.toString()){
            return res.status(403).json({
                message:"Unauthorized User"
            })
        }

        await Chat.findByIdAndDelete(req.params.id);

        res.json({
            message: "Chat is deleted"
        })

    }
    catch (err) {
        // console.log(err.message);
        res.status(500).json({
            message: err.message,
        })
    }
}