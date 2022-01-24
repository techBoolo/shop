import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import logger from 'morgan';
const PORT = process.env.PORT || 3001

const app = express();

app.use(logger('dev'));

app.use('/', (req, res, next) => {
  res.status(200).json({ message: 'it works!'});
})

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
})

