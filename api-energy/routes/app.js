import express from 'express';
import getPDFText from '../utils/PdfReader.js';
const app = express();

// Definir a rota
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
		
		PDFInfoArray = files.map(async (file) => {
			const uploadPath = currentDir + '/storage/' + file.name;
			await file.mv(uploadPath)

			const PDFInfo = await getPDFText(new Uint8Array(file.data))
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
