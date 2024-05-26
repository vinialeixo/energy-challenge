import express from 'express';
import getPDFText from '../utils/PdfReader.js';
import fileUpload from 'express-fileupload'
import invoice from '../repository/invoice.js';
import cors from 'cors'


const app = express();

// Middleware para fazer o upload dos arquivos
app.use(fileUpload());

app.use(cors({
	origin: '*',
	methods: ['GET','POST','DELETE','PUT'],
  }));

app.get('/test', async (req, res) => {
  res.send('Hello World');
});

app.get('/client-numbers', async (req, res) => {
	let msgs = [];
	try {
		const result = await invoice.getClientNumbers()

		if (result.length > 0)
			msgs.push('Success')
		else msgs.push('No data to show')

		res.status(200).json({msgs, status: "ok", data: result});
	} catch (e) {
		if (e.constructor.name == "DatabaseError")
			// When DatabaseError supress the details msg by security.
			msgs.push(e.constructor.name)
		else msgs.push(e.constructor.name + " - " + e.message)

		res.status(500).json({msgs, status: "error"});
	}
})

app.get('/client-number', async (req, res) => {
	let msgs = [];
	const { clientNumber } = req.query

	try {
		const result = await invoice.getByClientNumber({clientNumber})

		if (result.length > 0)
			msgs.push('Success')
		else msgs.push('No data to show')
		res.status(200).json({msgs, status: "ok", data: result});
	} catch (e) {
		if (e.constructor.name == "DatabaseError")
			msgs.push(e.constructor.name)
		else msgs.push(e.constructor.name + " - " + e.message)

		res.status(500).json({msgs, status: "error"});
	}
})
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

		console.log(msgs)
		res.status(500).json({msgs, status: "error"});
	}
})

app.get('/document', async (req, res) => {
	let msgs = [];
	const { documentName } = req.query

	try {
		const currentDir = process.cwd()
		const downloadFile = `${currentDir}/storage/${documentName}.pdf` ;
		res.header({ "Cache-Control": "no-cache" })
		res.download(downloadFile)
	} catch (e) {
		 if (e.constructor.name == "DatabaseError")
			msgs.push(e.constructor.name)
		else msgs.push(e.constructor.name + " - " + e.message)

		res.status(500).json({msgs, status: "error"});
	}
})
export default app;