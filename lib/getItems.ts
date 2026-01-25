import { prisma } from "./prisma";

export async function getItems(query? : string) {
    return await prisma.items.findMany({
        where : {
            name : {
                contains : query
            }
        },
        include : {
            categorys : true,
        }
    });
}