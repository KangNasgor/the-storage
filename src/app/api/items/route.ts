import { prisma } from '../../../../lib/prisma'
import { NextRequest, NextResponse } from 'next/server';

interface Items {
    name : string,
    amount : number,
    category : string,
}

export async function GET(req : NextRequest){
    const params = req.nextUrl.searchParams;
    const name = params.get("name")

    if(!name){
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

    try{
        const items = await prisma.items.findMany({
            where : {
                name : name
            }
        });
        
        return NextResponse.json({ message : items }, {
            status : 200
        })
    }
    catch(error){
        return NextResponse.json({ message : `Something unexpected happened. Error : ${error}`}, {
            status : 500
        })
    }

}

export async function POST(req : NextRequest){
    const {name, amount, category} : Items = await req.json();
    if(!name || amount == null || !category){
        return NextResponse.json({ message : 'Invalid inputs.'}, {
            status : 400
        })
    }
    try{
        const item = await prisma.items.create({
            data : {
                name : name,
                amount: amount,
                category : category
            }
        })

        return NextResponse.json({ message : 'Table created successfully.'}, {
            status : 201
        })
    }
    catch(error){
        return NextResponse.json({ message : `Something unexpected happened. Error : ${error}`}, {
            status : 500
        })
    }
} 

export async function UPDATE(req: NextRequest){
    const {name, amount, category} : Items = await req.json();
}