import express from 'express';
import dotenv from 'dotenv';
import roomRouter from './routes/rooms.router.js';
import mongoose from 'mongoose';
import appErrorHandler from './utils/app-error.util.js';
import userRouter from './routes/users.router.js';

dotenv.config();

const port = process.env.PORT || 5000;
const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', process.env.CLIENT_URL);
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-Requested-With, Content-Type, Authorization'
  );
  next();
});

app.use(express.json({ limit: '10mb' }));
app.use('/room', roomRouter);
app.use('/user', userRouter);

app.use('/', (req, res) =>
  res.json({
    message: 'Welcome to TraveLZ',
  })
);

app.use((req, res) =>
  res.status(400).json({
    success: false,
    message: 'Page Not Found',
  })
);

const startServer = async () => {
  try {
    // Connection to MongoDB
    mongoose.connect(process.env.MONGO_CONNECT);
    app.listen(port, () =>
      console.log(`Server is listening to port: ${port}.`)
    );
  } catch (error) {
    console.log(error);
  }
};

startServer();
