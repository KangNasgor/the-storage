import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';

export async function GET(){
    try{
        const categories = await prisma.categorys.findMany({
            select : {
                id : true,
                name : true,
            }
        });

        return NextResponse.json(categories, {
            status : 200
        })
    }
    catch(error){
        return NextResponse.json({ message : `Something unexpected happened. Error : ${error}`}, {
            status : 500
        })
    }
}