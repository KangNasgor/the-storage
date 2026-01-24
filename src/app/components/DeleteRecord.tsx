'use client'

import { useState } from "react";
import Button from "./Button";
import { useRouter } from "next/navigation";

export default function DeleteRecord({ id, name } : { id : number, name : string | null }){
    const [openModal, setOpenModal] = useState<boolean>(false);
    const router = useRouter();
    const deleteRecord = async () => {
  
        try{
            const response = await fetch('/api/items', {
                method : 'DELETE',
                headers : {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify({ id }),
            });
            router.refresh();
        }
        catch(error){
            return alert(error)
        }
        finally{
            console.log(JSON.stringify(id))
        }
    }

    return(
        <>
        <Button text="Delete" background="bg-sky-600" color="white" onClick={() => setOpenModal(true)}/>
        <div className={`${openModal === true ? 'block' : 'hidden'} bg-black/75 absolute w-full h-full left-0 top-0 flex justify-center items-center`} onClick={() => setOpenModal(false)}>
            <div className="bg-sky-600 rounded-md w-3/12 py-5" onClick={(e) => e.stopPropagation()}>
                <h1 className="text-xl">Delete {name}?</h1>
                <div className="mt-10 flex flex-row gap-5 justify-center">
                    <Button text="Cancel" background="bg-red-500" color="white" onClick={() => setOpenModal(false)}/>
                    <Button text="Delete" background="bg-green-500" color="white" onClick={() => {
                        deleteRecord();
                        setOpenModal(false)
                    } }/>
                </div>
            </div>
        </div>
        </>
    );
}