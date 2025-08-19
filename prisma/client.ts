import { PrismaClient } from "@/app/generated/prisma"; //install @prisma/client by running 'npm install @prisma/client' and then 'npx prisma generate'

const prisma = new PrismaClient();

export default prisma;