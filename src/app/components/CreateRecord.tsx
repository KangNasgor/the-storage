'use client'

import { useState, useReducer, useEffect } from "react";
import Button from "./Button";
import { getCategories } from '../../../lib/getCategories';
import { useRouter } from "next/navigation";

export default function CreateRecord(){
    const router = useRouter();

    interface Categories{
        id : number,
        name : string,
    }
    const [categories, setCategories] = useState<Categories[]>([])

    useEffect(() => {
        getCategories().then(setCategories);
    }, []);

    const [openModal, setOpenModal] = useState(false);

    const [record, setRecord] = useState({
        name : '',
        amount : 0,
        category : '',
    });

    type State = {
        name : string,
        amount : number,
        category : number,
    }

    type Action = 
    | {type : 'setName'; payload : string}
    | {type : 'setAmount'; payload : number}
    | {type : 'setCategory'; payload : number}

    function reducer(state : State, action : Action){
        switch(action.type){
            case 'setName' :
                return {...state, name : action.payload};
            
            case 'setAmount' :
                return {...state, amount : action.payload};
            case 'setCategory' :
                return {...state, category : action.payload}

        }
    }

    const[state, dispatch] = useReducer(reducer, {
        name: '',
        amount: 0,
        category : 1
    })
    
    const onFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try{
            const response : Response = await fetch('http://localhost:3000/api/items', {
                method : 'POST',
                headers : {
                    "Content-Type" : "application/json"
                },
                body : JSON.stringify(state),
            })

            const data = await response.json();

            if(!response.ok){
                throw new Error(await data.message)
            }

            router.refresh();
            return data.status;
        }
        catch(error){
            if(error instanceof Error) return error.message;

            return `Something unexpected happened. Error : ${error}`
        }
        finally{
            setOpenModal(false)
        }
    }

    return(
        <>
        <Button text='Create' background='bg-sky-600' color='white' onClick={() => setOpenModal(prev => !prev)}/>
        <div className={`${openModal === true ? 'block' : 'hidden'} bg-black/75 absolute w-full h-full left-0 top-0 flex justify-center items-center`} id="modal" onClick={() => setOpenModal(false)}>
            <div className="bg-sky-800 w-6/12 min-h-4/12 rounded-3xl py-5" onClick={(e) => e.stopPropagation()}>
                <form onSubmit={onFormSubmit} className="p-5 gap-3 flex flex-col items-center">
                    <div className="flex flex-col gap-1 w-6/12">
                        <label>Name</label>
                        <input className="w-full bg-white rounded-md text-black px-3 py-1" onChange={(e) => dispatch({ type : 'setName', payload : e.target.value})}></input>
                    </div>
                    <div className="flex flex-col gap-1 w-6/12">
                        <label>Amount</label>
                        <input className="w-full bg-white rounded-md text-black px-3 py-1" type="number" onChange={(e) => dispatch({ type : 'setAmount', payload : Number(e.target.value)})}></input>
                    </div>
                    <div className="flex flex-col gap-1 w-6/12">
                        <label>Category</label>
                        {/* <input className="w-full bg-white rounded-md text-black px-3 py-1" onChange={(e) => dispatch({ type : 'setCategory', payload : e.target.value})}></input> */}
                        <select className="w-full bg-white rounded-md text-black px-3 py-1" onChange={(e) => dispatch({type : 'setCategory', payload : Number(e.target.value)})}>
                            {
                                categories.map(category => (
                                    <option key={category.id} value={category.id}>{category.name}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className="flex gap-5 mt-5">
                        <Button type="submit" text="Submit" background="#0aa314" color="white"/>
                        <Button type="reset" text="Reset" background="#cc1215" color="white"/>
                        <Button onClick={() => setOpenModal(false)} text="Close" background="white" color="black"/>
                    </div>
                </form>
            </div>
        </div>
        </>
    )
}