import controller from './routes/controller.js'
import express from 'express'
import fileUpload from 'express-fileupload'


const app = express();

// Middleware para fazer o upload dos arquivos
app.use(fileUpload());


  app.use('/invoice',controller)

export default app