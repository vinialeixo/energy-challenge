import { PrismaClient } from "prisma/prisma-client/index.js";

export const prisma = new PrismaClient({ log: ['query']})