'use client'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from './Button';
import { faMagnifyingGlass, faX } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function SearchBar(){
    const router = useRouter();
    const searchParams = useSearchParams();
    
    const query = searchParams.get('q') ?? '';
    const [value, setValue] = useState(query);

    useEffect(() => {
        const timeout = setTimeout(() => {
            if(value.trim() === ''){
                router.push('')
            }
            else{
                router.push(`/items?q=${encodeURIComponent(value)}`)
            }
        }, 300)

        return () => clearTimeout(timeout)
    }, [value, router])

    const clearSearch = () => {
        setValue('');
        router.push('');
    }
    return(
        <div className='flex flex-row items-center gap-3 w-full justify-end'>
            <FontAwesomeIcon icon={faMagnifyingGlass} className='w-5 h-5'/>
            <input className='rounded-md px-3 py-2 text-black bg-white' placeholder='Search for items' value={value} onChange={e => setValue(e.target.value)}/>
            <Button text='Search' background='bg-sky-600' color='white'/>
        </div>
    );
}