'use client'
import { useState } from "react";
import Button from "./Button";

export default function CreateRecord(){
    const [openModal, setOpenModal] = useState(false);
    const [record, setRecord] = useState({
        name : '',
        amount : 0,
        category : '',
    });
    
    const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    }
    return(
        <>
        <Button text='Create' background='bg-sky-600' color='black' onClick={() => setOpenModal(prev => !prev)}/>
        <div className={`${openModal === true ? 'block' : 'hidden'} bg-black/75 absolute w-full h-full left-0 top-0 flex justify-center items-center`} id="modal" onClick={() => setOpenModal(false)}>
            <div className="bg-sky-800 w-6/12 min-h-4/12 rounded-3xl" onClick={(e) => e.stopPropagation()}>
                <form onSubmit={onFormSubmit}>
                    <input></input>
                </form>
            </div>
        </div>
        </>
    )
}