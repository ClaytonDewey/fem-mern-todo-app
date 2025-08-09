import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import connectDB from './db/connectDB.js';
import { APP_ORIGIN, PORT } from './constants/env.js';
import cookieParser from 'cookie-parser';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: APP_ORIGIN,
    credentials: true,
  })
);
app.use(cookieParser());

app.listen(PORT, async () => {
  console.log(`App running on ${PORT}`);
  await connectDB();
});
