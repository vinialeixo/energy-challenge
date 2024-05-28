import routes from './routes/route.js'
import express from 'express'
import fileUpload from 'express-fileupload'
// import bodyParser from 'body-parser'
import cors from 'cors'
// import dotenv from 'dotenv';

const app = express();

// Middleware para fazer o upload dos arquivos
app.use(fileUpload());

app.use(cors({
	origin: '*',
	methods: ['GET','POST','DELETE','PUT'],
  }));

  app.use('/invoice',routes)

export default app