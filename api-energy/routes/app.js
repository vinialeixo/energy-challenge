import express from 'express';
import getPDFText from '../utils/PdfReader.js';
import fileUpload from 'express-fileupload'
import invoice from '../repository/invoice.js';


const app = express();


// Middleware para fazer o upload dos arquivos
app.use(fileUpload());

app.get('/test', async (req, res) => {
  res.send('Hello World');
});

app.post('/import', async (req, res) =>{
  let msgs = [];
	let PDFInfoArray = []

	if (!req.files || Object.keys(req.files).length === 0) {
		return res.status(400).send('No files were uploaded.');
	}
  

	try {
    const currentDir = process.cwd()
		const files = Array.isArray(req.files.files) ? req.files.files : [req.files.files]
   
    // Processamento assíncrono dos arquivos
		PDFInfoArray = files.map(async (file) => {
			const uploadPath = currentDir + '/storage/' + file.name;
			await file.mv(uploadPath)

      const pdfBuffer = new Uint8Array(file.data);
      const PDFInfo = await getPDFText(pdfBuffer);
      console.log(PDFInfo)
			return PDFInfo
		})

		PDFInfoArray = await Promise.all(PDFInfoArray)
		const result = await invoice.insertMany(PDFInfoArray)

		msgs.push('Files uploaded!')
		res.status(200).json({msgs, status: "ok", data: result});
	} catch (e) {
		 if (e.constructor.name == "DatabaseError")
			msgs.push(e.constructor.name)
		else msgs.push(e.constructor.name + " - " + e.message)

		res.status(500).json({msgs, status: "error"});
	}
})

export default app;
