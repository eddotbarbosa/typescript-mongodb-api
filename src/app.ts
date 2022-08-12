import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import userRoutes from './routes/user.route';
import authRoutes from './routes/auth.route';
import postRoutes from './routes/post.route';

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
