'use client'

import Button from "./Button";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getCategories } from "../../../lib/getCategories";

type Categories = {
    id : number,
    name : string,
}

export default function CategoryFilter(){
    const [categories, setCategories] = useState<Categories[]>([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try{
                const response = await fetch('/api/categories', {
                    method : 'GET',
                })
                const data = await response.json();
                setCategories(data);
            }
            catch(error){
                return alert(`Failed to fetch categories for filter. Caused by : ${error}`);
            }
        }
    
        fetchCategories();
    }, [])

    const router = useRouter();
    const searchParams = useSearchParams();
    const params = searchParams.toString();
    const [openCategory, setOpenCategory] = useState<boolean>(false);

    return(
        <div className='flex flex-row gap-5 justify-center w-4/12'>
            <Button text='Category' background='bg-green-600' color='white' onClick={() => setOpenCategory(prev => !prev)}/>
            <div>
                {
                    categories.map(category => (
                        <Button text={category.name} background="bg-green-600" color="white" key={category.id}/>
                    ))
                }
            </div>
        </div>
    );
}