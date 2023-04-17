import path              from 'path';
import express           from 'express';
import multer            from 'multer';
import cors              from 'cors';
import dotenv            from 'dotenv';
import items             from './routes/itemsRoutes.js';
import auth              from './routes/authRoutes.js';
import users             from './routes/userRoutes.js';
import errorHandler      from './middleware/errorHandler.js';
import connectDB         from './config/db.js';
import { fileURLToPath } from 'url';
import fs                from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

dotenv.config();

connectDB();

const app = express();

app.use(express.json());
app.use(cors());

const storage = multer.diskStorage({
  destination: function(req, file, callback) {
    callback(null, __dirname + "/uploads");
  },
  filename: function(req, file, callback) {
    callback(null, file.originalname);
  }
});

const uploads = multer({storage: storage});

app.delete("/uploads", uploads.array("files"), (req, res) => {
  console.log(req.body);
  console.log(req.files);
  
  if (req.files.length === 0) {
    const uploadsDir = __dirname + "/uploads";
    fs.readdir(uploadsDir, function(err, files) {
      for (let i = 0; i < files.length; i++) {
        if (files[i].startsWith(req.body.name)) {
          fs.rm(`${uploadsDir}/${files[i]}`, (err) => {
            if (err) {
              console.error(err);
            } else {
              console.log(`${files[i]} was deleted successfully!`);
            }
          });
        }
      }
    })
  }
})

app.post("/uploads", uploads.array("files"), (req, res) => {
  console.log(req.body);
  console.log(req.files);
  res.json({status: "files received"});
});

app.use('/uploads', express.static('uploads'));

app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Lost & Found'
  });
});

app.use('/items', items);
app.use('/auth',  auth);
app.use('/users', users);
app.use(errorHandler);

const PORT   = process.env.PORT || 5000;

const server = app.listen(PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));