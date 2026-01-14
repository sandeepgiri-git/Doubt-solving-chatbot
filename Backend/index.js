import express from 'express'; 
import dotenv from 'dotenv'; 
// 1. Config dotenv IMMEDIATELY
dotenv.config(); 

import connectDb from './DataBase/db.js';
import cors from 'cors';
import UserRoutes from './Routes/UserRoutes.js'
import chatRoutes from './Routes/ChatRoute.js';

const app = express();

// 2. Enhanced CORS
app.use(cors({
    origin: ['http://localhost:5173', 'https://doubt-solving-chatbot.vercel.app'],
    credentials: true, // Required if sending tokens/cookies
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization", "token"] // Add your custom 'token' header here
}));

app.use(express.json());

// 3. Health Check for Render
app.get('/', (req, res) => {
    res.send("Server is running smoothly!");
});

// Routes
app.use('/api/user', UserRoutes);
app.use('/api/chat', chatRoutes);

// 4. Correct Port Logic
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is working on port ${PORT}`);
    connectDb();
});