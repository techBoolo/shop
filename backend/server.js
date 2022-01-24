import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import logger from 'morgan';
import { dbConnect, getDB } from './config/db.js';

const PORT = process.env.PORT || 3001

const app = express();

app.use(logger('dev'));

app.use('/', async (req, res, next) => {
  res.status(200).json({ message: 'it works!', ...response});
})

app.listen(PORT, () => {
  dbConnect()
    .then( conn => console.log('db connected'))
    .catch( (err) => console.log(err.message))
  console.log(`Server listening on port ${PORT}`);
})

