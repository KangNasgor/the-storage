import { prisma } from "./prisma";

export async function getItems(query? : string, category? : string) {
    const filteredCategoryByParameter = await prisma.categorys.findFirst({
        select : {
            id : true,
            name : true,
        },
        where : {
            name : category === undefined ? '' : category,
        }
    });

    return await prisma.items.findMany({
        where : {
            name : {
                contains : query // Return records that the name matches the query parameter, if query is empty it will return every records
            },
            category : filteredCategoryByParameter?.id
        },
        include : {
            categorys : true,
        }
    });
}