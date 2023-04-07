import express      from 'express';
import cors         from 'cors';
import dotenv       from 'dotenv';
import morgan       from 'morgan';
import items        from './routes/itemsRoutes.js';
import errorHandler from './middleware/errorHandler.js';
import connectDB    from './config/db.js';
import bcrypt       from 'bcryptjs';

dotenv.config({ path: './config/config.env' });

connectDB();

const app = express();

app.use(express.json());
app.use(cors());

if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Lost & Found'
  });
});

app.use('/items', items);
app.use(errorHandler);

const PORT   = process.env.PORT || 5000;
const server = app.listen(PORT, console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`));