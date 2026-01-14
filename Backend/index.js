import express from 'express'; 
import dotenv from 'dotenv'; 
import connectDb from './DataBase/db.js';
import cors from 'cors';

import UserRoutes from './Routes/UserRoutes.js'
import chatRoutes from './Routes/ChatRoute.js';

const app = express();
app.use(express.json());

app.use(cors({
    origin: ['http://localhost:5173', 'https://doubt-solving-chatbot.vercel.app'],
}));

dotenv.config();

app.use('/api/user', UserRoutes);
app.use('/api/chat', chatRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Server is working on ${process.env.PORT}`);
    connectDb();
})
