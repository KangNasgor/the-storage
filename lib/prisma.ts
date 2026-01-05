import "dotenv/config";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "@/generated/prisma/client";

const globalPrisma = globalThis as unknown as { // Double type assertion
    prisma : PrismaClient | undefined
}

export const prisma = globalPrisma.prisma ?? new PrismaClient({
    log : process.env.NODE_ENV === "development" ? ['info', 'query', 'warn', 'error'] : ['error']
});

if(process.env.NODE_ENV !== "production"){
    globalPrisma.prisma = prisma;
}