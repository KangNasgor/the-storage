import { NextRequest, NextResponse } from "next/server";
import { prisma } from '../../../../../lib/prisma';

export async function GET(req : NextRequest, { params } : { params : Promise<{ id : string }> }){
    const { id } = await params;
    const IDnumber = Number(id);

    if(Number.isNaN(IDnumber)){
        return NextResponse.json({ message : 'Invalid item ID' }, {
            status : 400
        })
    }

    const item = await prisma.items.findUnique({
        where : {
            id : IDnumber
        }
    })

    if(!item){
        return NextResponse.json({ message : 'Item not found' }, {
            status : 404
        })
    }

    return NextResponse.json({ message : item }, {
        status : 200
    })
}