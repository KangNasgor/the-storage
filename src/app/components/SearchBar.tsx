'use client'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from './Button';
import { faMagnifyingGlass, faX } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function SearchBar({ defaultValue } : { defaultValue : string }){
    const router = useRouter();
    const searchParams = useSearchParams();
    const params = new URLSearchParams(searchParams.toString());

    const [searchValue, setSearchValue] = useState(defaultValue);

    useEffect(() => {
        setSearchValue(defaultValue)
    }, [defaultValue]);
    
    const onInputChange = (e : React.ChangeEvent<HTMLInputElement>) => { // This function watch over the search input, if a value is detected it will push/write that value on the url
        const value = e.target.value;
        setSearchValue(value);
        params.set('q', value)
        if(value.trim() === ''){
            router.push('/')
        }
        else{
            router.push(`/?${params.toString()}`)
        }
    }

    const reset = () => {
        router.push('/')
    }

    return(
        <div className='flex flex-row items-center gap-3 w-full justify-end'>
            <FontAwesomeIcon icon={faMagnifyingGlass} className='w-5 h-5'/>
            <input className='rounded-md px-3 py-2 text-black bg-white' placeholder='Search for items' value={searchValue} onChange={onInputChange}/>
            <Button type='button' text='Reset' background='bg-sky-600' color='white' onClick={reset}/>
        </div>
    );
}