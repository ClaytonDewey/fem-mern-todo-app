import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import { connectDB } from './db/connectDB.js';

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5050;

app.use(cors({ origin: 'http://localhost:5173', credentials: true }));

app.use(express.json()); // allows us to parse incoming requests:req.body
app.use(cookieParser()); // allows us to parse incoming cookies

app.listen(PORT, () => {
  connectDB();
  console.log(`App running on ${PORT}`);
});
