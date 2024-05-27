import {prisma as db} from '../db/index.js'


const invoice = {
    insertMany: async (data) => {
        try {
            return await db.invoice.createMany({data: data})
        } catch (e) {
            throw e
        }
    },
    getByClientNumber: async (data) => {
        try {
            const result = await db.invoice.findMany({
                where: {
                    clientNumber: data.clientNumber
                },
                orderBy: {
                    referenceMonth: 'asc',
                }
            })
            return result
        } catch (e) {
            throw e
        }
    },
    getClientNumbers: async () => {
        try {
            const result = await db.invoice.groupBy({
                by: ['clientNumber']
            })
            return result
        } catch (e) {
            throw e
        }
    },
}

export default invoice