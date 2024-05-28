// test/routes.test.js
const request = require('supertest');
const express = require('express');
const routes = require('../routes/controller.js');
const invoiceRepository = require('../repository/invoiceRepository.js');
const { getPDFText } = require('../utils/PdfReader.js')
// Mock the invoiceRepository and getPDFText modules
// jest.mock('../src/controllers/invoiceRepository');
// jest.mock('../src/utils/pdfParser');

const app = express();
app.use(express.json());
app.use(routes);

describe('API Endpoints', () => {
    describe('GET /client-numbers', () => {
        it('should return client data for a valid clientNumber', async () => {
            const mockClientData = [{ id: 1, name: 'Client A' }];
            invoiceRepository.getByClientNumber.mockResolvedValue(mockClientData);

            const response = await request(app).get('/clients/123');
            expect(response.status).toBe(200);
            expect(response.body).toEqual({
                messages: ['Success'],
                status: 'ok',
                data: mockClientData
            });
        });

        it('should return no data message for an invalid clientNumber', async () => {
            invoiceRepository.getByClientNumber.mockResolvedValue([]);

            const response = await request(app).get('/clients/999');
            expect(response.status).toBe(200);
            expect(response.body).toEqual({
                messages: ['No data to show'],
                status: 'ok',
                data: []
            });
        });

        it('should handle errors', async () => {
            const mockError = new Error('Something went wrong');
            invoiceRepository.getByClientNumber.mockRejectedValue(mockError);

            const response = await request(app).get('/clients/123');
            expect(response.status).toBe(500);
            expect(response.body).toEqual({
                messages: ['Error - Something went wrong'],
                status: 'error'
            });
        });
    });

    describe('POST /upload', () => {
        it('should upload files and return success message', async () => {
            const mockResult = { insertedCount: 1 };
            invoiceRepository.insertMany.mockResolvedValue(mockResult);
            getPDFText.mockResolvedValue({ text: 'PDF content' });

            const response = await request(app)
                .post('/documents/upload')
                .attach('files', Buffer.from('test file'), 'test.pdf');

            expect(response.status).toBe(200);
            expect(response.body).toEqual({
                messages: ['Files uploaded!'],
                status: 'ok',
                data: mockResult
            });
        });

        it('should return error if no files are uploaded', async () => {
            const response = await request(app).post('/documents/upload');
            expect(response.status).toBe(400);
            expect(response.text).toBe('No files were uploaded.');
        });

        it('should handle errors during file upload', async () => {
            const mockError = new Error('Upload failed');
            invoiceRepository.insertMany.mockRejectedValue(mockError);

            const response = await request(app)
                .post('/upload')
                .attach('files', Buffer.from('test file'), 'test.pdf');

            expect(response.status).toBe(500);
            expect(response.body).toEqual({
                messages: ['Error - Upload failed'],
                status: 'error'
            });
        });
    });

    describe('GET /document', () => {
        it('should download the document', async () => {
            const response = await request(app).get('/document/test');
            expect(response.status).toBe(200);
            expect(response.header['content-disposition']).toContain('attachment; filename="test.pdf"');
        });

        it('should handle errors during document download', async () => {
            const mockError = new Error('File not found');
            invoiceRepository.getDocument.mockRejectedValue(mockError);

            const response = await request(app).get('/document/invalid');
            expect(response.status).toBe(500);
            expect(response.body).toEqual({
                messages: ['Error - File not found'],
                status: 'error'
            });
        });
    });
});
