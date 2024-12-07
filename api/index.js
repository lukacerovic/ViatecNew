import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors'; 
import User from './models/user.model.js'; 

dotenv.config();

mongoose.connect(process.env.MONGO).then(() => {
    console.log('Connected to Mongo DB');
}).catch((err) => {
    console.log(err);
});

const app = express();

app.use(cors({
    origin: 'http://localhost:3001',  
    methods: ['GET', 'POST'],      
    allowedHeaders: ['Content-Type'], 
}));

app.use(express.json());

app.post('/api/users', async (req, res) => {
    try {
        const { username, lastName, email, dateOfBirth, phone, state } = req.body;

        if (!username || !lastName || !email || !dateOfBirth || !phone || !state) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const newUser = new User({ username, lastName, email, dateOfBirth, phone, state });
        await newUser.save();

        res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
        res.status(500).json({ message: 'Error creating user', error });
    }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
