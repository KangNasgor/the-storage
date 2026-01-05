import { prisma } from '../../../../lib/prisma'
import { NextRequest, NextResponse } from 'next/server';

export async function GET(){
    try{
        const item = await prisma.items.findMany();

        return NextResponse.json({ message : item }, {
            status : 200
        })
    }
    catch(error){
        return NextResponse.json({ message : `Something unexpected happened. Error : ${error}`}, {
            status : 500
        })
    }
}

export async function POST(){
    
} 