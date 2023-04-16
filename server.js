import path              from 'path';
import express           from 'express';
import multer            from 'multer';
import cors              from 'cors';
import dotenv            from 'dotenv';
import morgan            from 'morgan';
import items             from './routes/itemsRoutes.js';
import auth              from './routes/authRoutes.js';
import users             from './routes/userRoutes.js';
import errorHandler      from './middleware/errorHandler.js';
import connectDB         from './config/db.js';
import { fileURLToPath } from 'url';
import fs                from 'fs';
import { rimraf }        from 'rimraf';
import https             from 'https';

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

dotenv.config({ path: './config/config.env' });

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

if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

// Serve files in the "uploads" directory on a GET request to "/uploads"
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

// const server = https.createServer(app).listen(PORT, console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`));

const options ={
  // key:fs.readFileSync(__dirname + '/config/ssl/key.pem'),
  // cert:fs.readFileSync(__dirname + '/config/ssl/cert.pem') 
  key:`MIIEowIBAAKCAQEAnAjapXQQkpVvuChpDYypnFKXUNGxnTUGiwa+pnci+j22c5aW
  m8pf9dQB1npaRYBGjJl+Oes2fj2ME0SPJNAP80blHzJKlRIbtTalJR2uRkVOieKA
  UETAdaQ6WSz9yFFpg4bLhSqQOjdv2jsXHMWb1JXibTQUl3Y776hD7yxPlG2p5EP1
  2m1JNwCBC1Q1e3DNB1LsobKhkTiUwZ17V5NhkVNtugkvRCkPi95V2V/s/l+gAGC+
  onukdOnZSa+/nAmS0h3wKpHoGBKeM2j53d2auLLwRWQzy8O3odXL6OFhXbg48ZB1
  5AVuvZF4ME2lWV+ltG7KeVd7Td4f2bNZB68r2wIDAQABAoIBAGHJar2mL3yuCoXv
  TWcgcGt3lz0fLaDISoF2iKTqpREO+/kUtu6LtffqFfzEUS6dZZlX2LOTpWMYT2ED
  5nG7s0NTeuRCMFucLaEzzeuk3kNLzBy9xoyHidYwRiD9AU85NlcncwTR1/GkLIUn
  4yQ086QXCwBFU2JYxtc7LNgHfRgXZ3nLHv4XpvayCzXfPftnaUC+W66uxMt5tXb1
  SEADYYo1bX2vo3KF2en0G1kGWxjO5je8cfzjjFZmPFPDLnu7W7rWjj8nA1wMNu+w
  2Vzl/LQk0/C7EAHbdqTa0LdDMvyM5exGWbNMqrcgUOJcscBF1wWYF5Bed7TZ4nMj
  Lr84K4ECgYEAzQx5cSCSc3Dx5x7v+WIkzWEc5/LT8HDEAUqrSn90plT2nH1wIkem
  sNduH0SaqgFXkesRKjIIWqF4aQ4yvRYzR6uiMMXJGnpcmieHACa3b9Nik+7RtUiv
  STsnWczuNvFB8DwD8ZRcA9aFv2wQEQvGCoVF7fJwuOWhJMOks9Fqw60CgYEAws6A
  ES8xRGGs20uQ43mABvpu4phEMU/vVaEp1/RFN2lL0NGCNMObUvAv9K3kJsVSQhl7
  mUSJK777pLnyE2IsT8yD3l+Q1yu5r+bvYdhDOmPbuqVDZ+SkL18X0qHb9xDQOP6s
  F9jyVKPCxWpNNfrg9ylH/nsyGliSM7/1GnnwXqcCgYEAxZvLAbopSXXEuz82d/kc
  jI2VpPeBRwv16WTDlUUl7xKcpA3DXlX9EBpdt2aPQ12NvkNzRF35bRaGC4CyZ0YY
  325KHYTPHWRlD+8eDIhDalKmgvi6Q2IsA4AtmT6FKI/zQwkjp9KZpt08AlGrXjIh
  howP65QlDBvI47xkYyNkJ/UCgYBN4C1UMVB5rK5kcD34ob6ri3u+e+5u5CyiR64p
  lY4CC8byMH7jxvqV2kzhfI6DbUhoAjXl3H8VjOCeRnNeilV6hSCGSh/l1KYDisdR
  jxm5Auh5Ic3jf4SfJ12np2r+xqrmzfBQDDs72MdpEgjRtnwuckNEmU07OQMhSvCZ
  5/tOawKBgGOOdrnH477YCi3b5HkiIW42PbaYqPgHjIitCQMex3d8kTAwgJbxLRi6
  UuJe2gqYsyAe+CxscegFYiv7aGAUvIERTFaNYKGtHzYHvL0uE3FjzAx5Gijay6vf
  mvMtkTJbdJfGkNwydvxijPA3uzl8i9XzqRytx249pS+/UcNRRQDt`,
  cert:`MIIDjTCCAnUCFB7v57xtUKV/t2lR3M47T4/YT9PXMA0GCSqGSIb3DQEBCwUAMIGC
  MQswCQYDVQQGEwJJTDERMA8GA1UECAwIVGVsLUF2aXYxETAPBgNVBAcMCFRlbC1B
  dml2MRMwEQYDVQQKDApBcHBsZXNlZWRzMQswCQYDVQQLDAJGUzELMAkGA1UEAwwC
  RlMxHjAcBgkqhkiG9w0BCQEWD2Jlbm55QGdtYWlsLmNvbTAeFw0yMzA0MTYwNzI3
  MTJaFw0yNDA0MTUwNzI3MTJaMIGCMQswCQYDVQQGEwJJTDERMA8GA1UECAwIVGVs
  LUF2aXYxETAPBgNVBAcMCFRlbC1Bdml2MRMwEQYDVQQKDApBcHBsZXNlZWRzMQsw
  CQYDVQQLDAJGUzELMAkGA1UEAwwCRlMxHjAcBgkqhkiG9w0BCQEWD2Jlbm55QGdt
  YWlsLmNvbTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAJwI2qV0EJKV
  b7goaQ2MqZxSl1DRsZ01BosGvqZ3Ivo9tnOWlpvKX/XUAdZ6WkWARoyZfjnrNn49
  jBNEjyTQD/NG5R8ySpUSG7U2pSUdrkZFTonigFBEwHWkOlks/chRaYOGy4UqkDo3
  b9o7FxzFm9SV4m00FJd2O++oQ+8sT5RtqeRD9dptSTcAgQtUNXtwzQdS7KGyoZE4
  lMGde1eTYZFTbboJL0QpD4veVdlf7P5foABgvqJ7pHTp2Umvv5wJktId8CqR6BgS
  njNo+d3dmriy8EVkM8vDt6HVy+jhYV24OPGQdeQFbr2ReDBNpVlfpbRuynlXe03e
  H9mzWQevK9sCAwEAATANBgkqhkiG9w0BAQsFAAOCAQEANRXpmTtYAeKI8Tgc5njP
  gpOscogNciC75eOlpQ1fz0dTDFyTZtwoFPpTaHa2rUKP7Oc5qv2LoGhNajNkITtp
  +kQI1IWbc2GfNCMejmextpBWLaOWLxG1Z57K2SrjTJ5X51fYQjSaa25LTfYwAyEn
  WWaZrmJ1pykoAPmheb8hroIaXT3lRGTn008rnbUKlYaf7vqx+6GrxV9sz1mMmHeX
  Dmlt5m5kC5a5GZqQHEbdQxP5yTM358oLWjNUw6Z3S2gfMKk2jSdMXhauLcvjY61P
  0OxaPOCfKXQe4Oj4sWPFPwWzTM6rWY9cDkPHivwCapEZEpWQC/pVG1dybIqS1PB7
  fQ==` 
}

const sslserver =https.createServer(options,app)

sslserver.listen(PORT,()=>{console.log(`Secure Server is listening on port ${PORT}`)});

// https.createServer(sslOptions, app).listen(PORT, () => {
//   console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`);
// });