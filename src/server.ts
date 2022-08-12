import dotenv from 'dotenv';
import mongoose from 'mongoose';
import app from './app';
dotenv.config();

const port = process.env.PORT || 5000;

// database connection
mongoose.connect(process.env.DB_URI)
  .then(() => {
    console.log('database successfully connected!');
  }).catch((err) => {
    console.log(err);
  });

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
