import { prisma } from '../../../../lib/prisma'
import { NextRequest, NextResponse } from 'next/server';

interface Items {
    id : number,
    name : string,
    amount : number,
    category : number, // Category is a number because it's a foreign key
}

export async function GET(req : NextRequest){
    const params = req.nextUrl.searchParams;
    const query = params.get("query")
    console.log(query);
    if(!query){
        try{
            const item = await prisma.items.findMany({
                select : {
                    id: true,
                    name: true,
                    amount: true,
                    created_at: true,
                    updated_at: true,
                    categorys : {
                        select : {
                            name : true
                        }
                    }
                }
            });
    
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
                name : query
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

        return NextResponse.json({ message : 'Table created successfully.', data : item}, {
            status : 201
        })
    }
    catch(error){
        return NextResponse.json({ message : `Something unexpected happened. Error : ${error}`}, {
            status : 500
        })
    }
} 

export async function PUT(req: NextRequest){
    const {id, name, amount, category} : Items = await req.json();

    console.log(req.json())

    if(!id){
        return NextResponse.json({ message : 'ID is required.'}, {
            status : 400
        })
    }

    const data : any = {}

    if(name !== undefined) data.name = name;
    if(amount !== undefined) data.amount = amount;
    if(category !== undefined) data.category = category;

    try{
        const item = await prisma.items.update({
            where : {
                id
            },
            data
        })

        return NextResponse.json({ message : 'Record updated successfully.'}, {
            status : 200
        })
    }
    catch(error){   
        return NextResponse.json({ message : `Something unexpected happenned. Error : ${error}`}, {
            status : 500
        })
    }
}

export async function DELETE(req: NextRequest){
    const { id } : Items = await req.json();
    if(!id){
        console.log(req)
        return NextResponse.json({ message : 'Invalid ID'}, {
            status : 400
        })
    }
    try{
        const item = await prisma.items.delete({
            where : {
                id,
            }
        })

        return NextResponse.json({ message : 'Record deleted successfully.'}, {
            status : 200
        })
    }
    catch(error){
        return NextResponse.json({message : `Something unexpected happened. Error : ${error}`}, {
            status: 500
        })
    }
}