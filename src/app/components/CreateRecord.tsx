'use client'

import { useState, useReducer, useEffect, useRef } from "react";
import Button from "./Button";
import { getCategories } from '../../../lib/getCategories';
import { useRouter } from "next/navigation";

export default function CreateRecord(){
    const router = useRouter();
    const [errorMessage, setErrorMessage] = useState<string | null>('');
    const [loading, setLoading] = useState<boolean>(false);

    interface Categories{
        id : number,
        name : string,
    }

    const [categories, setCategories] = useState<Categories[]>([])

    useEffect(() => {
        const loadCategories = async () => {
            try{
                const data = await getCategories();
                setCategories(data);
            }
            catch(error){
                setErrorMessage(`${error}`)
                console.error(errorMessage)
            }
        }

        loadCategories();
    }, []);

    const [openModal, setOpenModal] = useState(false);
    const openModalPrev = useRef(openModal);

    type State = {
        name : string,
        amount : string | number,
        category : number,
    }

    type Action = 
    | {type : 'setName'; payload : string}
    | {type : 'setAmount'; payload : string}
    | {type : 'setCategory'; payload : number}
    | {type : 'reset';}

    const initialState : State = {
        name : '',
        amount : '',
        category : 1, 
    }

    function reducer(state : State, action : Action){
        switch(action.type){
            case 'setName' :
                return {...state, name : action.payload};
            case 'setAmount' :
                return {...state, amount : action.payload};
            case 'setCategory' :
                return {...state, category : action.payload};
            case 'reset' :
                return initialState;
            default :
                return state;
        }
    }

    const[state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        if(openModalPrev.current === true && openModal === false){
            dispatch({ type : 'reset' });
        }

        openModalPrev.current = openModal;
    }, [openModal])
    
    const onFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        if(!state.name.trim()) return alert('Name is required');
        if(state.amount === 0 || state.amount === '') return alert('Invalid amount.');

        try{
            const response : Response = await fetch('/api/items', {
                method : 'POST',
                headers : {
                    "Content-Type" : "application/json"
                },
                body : JSON.stringify(state),
            })

            const data = await response.json();

            if(!response.ok){
                throw new Error(data.message)
            }            
            setOpenModal(false);
            router.refresh();
            return data.status;
        }
        catch(error){
            if(error instanceof Error) setErrorMessage(error.message);
            const message = setErrorMessage(`Something unexpected happened. Error : ${error}`);
            alert(errorMessage)
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
                        <input className="w-full bg-white rounded-md text-black px-3 py-1" value={state.name} onChange={(e) => dispatch({ type : 'setName', payload : e.target.value})}></input>
                    </div>
                    <div className="flex flex-col gap-1 w-6/12">
                        <label>Amount</label>
                        <input className="w-full bg-white rounded-md text-black px-3 py-1" type="number" value={state.amount} onChange={(e) => dispatch({ type : 'setAmount', payload : e.target.value})}></input>
                    </div>
                    <div className="flex flex-col gap-1 w-6/12">
                        <label>Category</label>
                        <select className="w-full bg-white rounded-md text-black px-3 py-1" value={state.category} onChange={(e) => dispatch({type : 'setCategory', payload : Number(e.target.value === '' ? '' : Number(e.target.value))})}>
                            {
                                categories.map(category => (
                                    <option key={category.id} value={category.id}>{category.name}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className="flex gap-5 mt-5">
                        <Button disabled={loading} type="submit" text="Submit" background="#0aa314" color="white"/>
                        <Button type="reset" text="Reset" background="#cc1215" color="white"/>
                        <Button type={'button'} onClick={() => setOpenModal(false)} text="Close" background="white" color="black"/>
                    </div>
                </form>
            </div>
        </div>
        </>
    )
}