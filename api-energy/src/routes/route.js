import express from 'express';
import getPDFText from '../utils/PdfReader.js';
import invoice from '../../repository/invoice.js';


const routes = express.Router();



routes.get('/test', async (req, res) => {
  res.send('Hello World');
});

routes.get('/client-numbers', async (req, res) => {
	let messages = [];
    const { clientNumber } = req.params;

    try {
        const clientData = await invoice.getByClientNumber({ clientNumber });

        if (clientData.length > 0) {
            messages.push('Success');
        } else {
            messages.push('No data to show');
        }

        res.status(200).json({ messages, status: "ok", data: clientData });
    } catch (error) {
        if (error.constructor.name === "DatabaseError") {
            messages.push(error.constructor.name);
        } else {
            messages.push(`${error.constructor.name} - ${error.message}`);
        }

        res.status(500).json({ messages, status: "error" });
    }
})

routes.get('/client-number', async (req, res) => {
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
routes.post('/upload', async (req, res) =>{
	let messages = [];
    let pdfInfoArray = [];

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }

    try {
        const currentDir = process.cwd();
        const files = Array.isArray(req.files.files) ? req.files.files : [req.files.files];

        // Processamento assíncrono dos arquivos
        pdfInfoArray = files.map(async (file) => {
            const uploadPath = `${currentDir}/storage/${file.name}`;
            await file.mv(uploadPath);

            const pdfBuffer = new Uint8Array(file.data);
            const pdfInfo = await getPDFText(pdfBuffer);
            return pdfInfo;
        });

        pdfInfoArray = await Promise.all(pdfInfoArray);
        const result = await invoice.insertMany(pdfInfoArray);

        messages.push('Files uploaded!');
        res.status(200).json({ messages, status: "ok", data: result });
    } catch (error) {
        if (error.constructor.name === "DatabaseError") {
            messages.push(error.constructor.name);
        } else {
            messages.push(`${error.constructor.name} - ${error.message}`);
        }

        console.log(messages);
        res.status(500).json({ messages, status: "error" });
    }
})

routes.get('/document', async (req, res) => {
    let messages = [];
    const { documentName } = req.params;

    try {
        const currentDir = process.cwd();
        const downloadFile = `${currentDir}/storage/${documentName}.pdf`;
        res.header({ "Cache-Control": "no-cache" });
        res.download(downloadFile);
    } catch (error) {
        if (error.constructor.name === "DatabaseError") {
            messages.push(error.constructor.name);
        } else {
            messages.push(`${error.constructor.name} - ${error.message}`);
        }

        res.status(500).json({ messages, status: "error" });
    }
})
export default routes;
