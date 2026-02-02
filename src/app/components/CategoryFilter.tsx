'use client'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import Button from "./Button";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

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
    const searchParams = useSearchParams().toString();
    const [openCategory, setOpenCategory] = useState<boolean>(false);
    const [filterOn, setFilterOn] = useState<boolean>(false);

    const onChooseCategory = async (filter : string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('c', filter);
        router.push(`/?${params.toString()}`);
        setOpenCategory(false);
        setFilterOn(true);
    }

    const resetFilter = () => {
        setFilterOn(false);
        const params = new URLSearchParams(searchParams.toString());
        params.delete('c')
        router.push(`?${params.toString()}`)
    }

    return(
        <div className='w-4/12 flex flex-row gap-3 items-center justify-center'>
            <Button text='Category' background='bg-green-600' color='white' onClick={() => setOpenCategory(true)}/>
            <div className={`${filterOn === true ? 'block' : 'hidden'} cursor-pointer active:scale-90`} onClick={resetFilter}>
                <FontAwesomeIcon icon={faX} />
            </div>
            <div className={`${openCategory === true ? 'block' : 'hidden'} absolute bg-black/75 left-0 top-0 min-h-full min-w-full flex justify-center items-center`} onClick={() => setOpenCategory(false)}>
                <div className="rounded-md p-5 bg-sky-700 flex flex-row gap-5" onClick={(e) => e.stopPropagation()}>
                    {
                        openCategory && categories.map(category => (
                                <Button text={category.name} background="bg-green-600" color="white" key={category.id} onClick={() => {
                                    onChooseCategory(category.name)
                                }}/>
                            ))
                    }
                </div>
            </div>
        </div>
    );
}