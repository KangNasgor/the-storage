import { prisma } from "./prisma";

export async function getItems() {
    return await prisma.items.findMany({
        include : {
            categorys : true,
        }
    });
}