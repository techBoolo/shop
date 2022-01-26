import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import logger from 'morgan';
import cors from 'cors';
import { dbConnect, getDB } from './config/db.js';
import errorHandler from './middlewares/errorHandler.js';
import ErrorResponse from './utils/errorResponse.js';
import userRoute from './routes/user.js';

const PORT = process.env.PORT || 3001
const app = express();

// middlewares
app.use(logger('dev'));
app.use(cors());
app.use(express.json());

// routes
app.use('/users', userRoute);

//app.use('/', (req, res, next) => {
//  res.status(200).json({ message: 'it works!'});
//})

app.use((req, res, next) => {
  const error = new ErrorResponse('route not found.', 404);
  next(error);
})

app.use(errorHandler);
app.listen(PORT, () => {
  dbConnect()
    .then( conn => console.log('db connected'))
    .catch( (err) => console.log(err.message))
  console.log(`Server listening on port ${PORT}`);
})

