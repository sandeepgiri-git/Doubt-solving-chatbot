import express from 'express';
import {loginUser,myProfile,verifyUser} from '../Controller/userController.js';
import { userAuth } from '../Middlewares/userAuth.js';

const router = express.Router()

router.post('/login', loginUser);
router.post('/verify', verifyUser);
router.get("/me", userAuth, myProfile);

export default router;