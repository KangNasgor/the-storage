'use client'

import { useEffect, useState, useReducer, useRef } from "react";
import Button from "./Button";
import { getCategories } from "../../../lib/getCategories";
import { useRouter } from "next/navigation";

export default function UpdateRecord({ id } : { id : number }){
    const router = useRouter();
    type RecordType = {
        id : number,
        name : string,
        amount : number | string,
        category : number
    }

    const [openModal, setOpenModal] = useState(false);
    const [record, setRecord] = useState<RecordType>({
        id,
        name : '',
        amount : '',
        category : 1,
    });
    const [loading, setLoading] = useState<boolean>(false);
    const openModalPrev = useRef(openModal);

    const getRecord = async () => {
        try{
            const response = await fetch(`/api/items/${id}`);
            const data = await response.json();
            setRecord(data.message);
        }
        catch(error){
            console.error(error);
            alert(`Error : ${error}`)
        }

    }

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
                console.error(error)
            }
        }

        loadCategories();
    }, []);

    type State = {
        id : number,
        name : string | undefined,
        amount : string | number | undefined,
        category : number | undefined,
    }

    type Action = 
    | {type : 'setName'; payload : string}
    | {type : 'setAmount'; payload : number | string}
    | {type : 'setCategory'; payload : number}
    | {type : 'reset';}

    const initialState : State = {
        id,
        name : record?.name,
        amount : record?.amount,
        category : record?.category, 
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
        dispatch({ type : 'setName', payload: record.name});
        dispatch({ type : 'setAmount', payload: record.amount});
        dispatch({ type : 'setCategory', payload: record.category});
    },[record])

    
    useEffect(() => {
        if(openModalPrev.current === true && openModal === false){
            dispatch({ type : 'reset' });
        }

        openModalPrev.current = openModal;
    }, [openModal])

    const onFormSubmit = async (e : React.FormEvent<HTMLFormElement>) => {
        setLoading(true);
        e.preventDefault();
        if(record.name.trim() === '') return alert('Name is required.');
        if(record.amount === '') record.amount = 0;

        try{
            const response : Response = await fetch('/api/items', {
                method: 'PUT',
                headers : {
                    "Content-Type" : "application/json"
                },
                body : JSON.stringify(state),
            });
            const data = await response.json();
            if(!response.ok){
                throw new Error(data.message)
            }            
            setOpenModal(false);
            router.refresh();

            
        }
        catch(error){
            return alert(error)
        }
        finally{
            setLoading(false);
        }
    }

    return(
        <>
        <Button text="Edit" background="bg-sky-600" color="white" onClick={ () => {
            setOpenModal(true)
            getRecord();
        }}/>
        <div className={`bg-black/75 min-w-full min-h-full absolute left-0 top-0 flex justify-center items-center ${openModal === true ? 'block' : 'hidden'}`} onClick={() => setOpenModal(false)}>
            <div className="w-6/12 bg-sky-600 rounded-md" onClick={(e) => e.stopPropagation()}>
            <form onSubmit={onFormSubmit} className="p-5 gap-3 flex flex-col items-center">
                    <div className="flex flex-col gap-1 w-6/12">
                        <label>Name</label>
                        <input className="w-full bg-white rounded-md text-black px-3 py-1" value={state.name} onChange={(e) => dispatch({ type : 'setName', payload : e.target.value})}></input>
                    </div>
                    <div className="flex flex-col gap-1 w-6/12">
                        <label>Amount</label>
                        <input className="w-full bg-white rounded-md text-black px-3 py-1" type="number" value={state.amount === 0 ? '' : state.amount} onChange={(e) => dispatch({ type : 'setAmount', payload : Number(e.target.value)})}></input>
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