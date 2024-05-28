import {prisma as db} from '../db/index.js'

const invoiceRepository = {
    addInvoices: async (invoices) => {
        try {
            return await db.invoice.createMany({ data: invoices });
        } catch (error) {
            handleDatabaseError(error);
        }
    },


    findInvoicesByClientNumber: async (data) => {
        try {
            return await db.invoice.findMany({
                where: {
                    clientNumber: data.clientNumber
                },
                orderBy: {
                    referenceMonth: 'asc',
                }
            });
        } catch (error) {
            handleDatabaseError(error);
        }
    },

    listClientNumbers: async () => {
        try {
            return await db.invoice.groupBy({
                by: ['clientNumber']
            });
        } catch (error) {
            handleDatabaseError(error);
        }
    }
};

const handleDatabaseError = (error) => {
    // Adicione qualquer lógica de tratamento de erro personalizada aqui, se necessário
    console.error('Database error:', error);
    throw error; // Re-lançar o erro após o log
};

export default invoiceRepository;
