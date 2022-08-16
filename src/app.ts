import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import userRoutes from './routes/userRoute';
import authRoutes from './routes/authRoute';
import postRoutes from './routes/postRoute';

export const app = express();

// add cors
app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));

// parse application/json
app.use(bodyParser.json());

// routes
app.use('/users', userRoutes);
app.use('/auth', authRoutes);
app.use('/posts', postRoutes);

app.get('/', (req, res) => {
  return res.send('Hello world!');
});

export default app;
