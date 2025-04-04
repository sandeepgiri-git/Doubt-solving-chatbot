import express from 'express';
import { userAuth } from '../Middlewares/userAuth.js';
import { addConversation, createChat, deleteChat, getAllChats, getConversation } from '../Controller/ChatControllers.js';

const router = express.Router() ;

router.post("/new",userAuth, createChat);
router.get("/all",userAuth, getAllChats);

router.post("/:id",userAuth, addConversation);
router.get("/:id",userAuth, getConversation);

router.delete('/:id', userAuth, deleteChat);
export default router;