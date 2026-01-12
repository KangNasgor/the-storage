import { prisma } from './prisma';

export async function getCategories(){
    const response = await fetch('http://localhost:3000/api/categories', {
        cache : 'no-store',
    })

    if(!response.ok){
        throw new Error('Failed to fetch categories, idk why.');
    }

    const data = await response.json();

    return data;
}