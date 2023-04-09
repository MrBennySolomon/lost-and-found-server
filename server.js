// import multer            from 'multer';
import path              from 'path';
import express           from 'express';
import cors              from 'cors';
import dotenv            from 'dotenv';
import morgan            from 'morgan';
import items             from './routes/itemsRoutes.js';
import errorHandler      from './middleware/errorHandler.js';
import connectDB         from './config/db.js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

dotenv.config({ path: './config/config.env' });

connectDB();

const app = express();

// const upload = multer({});

// app.post('/items/upload', upload.single('file'), async (req, res) => {
//   req.file = req.file.buffer;
//   await req.item.save();
//   res.send();
// }, (error, req, res, next) => {
//   res.status(400).send({error: error.message});
// });

app.use(express.json());
app.use(cors());

if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

//Set static folder
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Lost & Found'
  });
});

app.use('/items', items);
app.use(errorHandler);

const PORT   = process.env.PORT || 5000;
const server = app.listen(PORT, console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`));