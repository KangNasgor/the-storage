'use client'

import { useState, useReducer } from "react";
import Button from "./Button";

export default function CreateRecord(){
    const [openModal, setOpenModal] = useState(false);
    const [record, setRecord] = useState({
        name : '',
        amount : 0,
        category : '',
    });

    type State = {
        name : string,
        amount : number,
        category : string,
    }

    type Action = 
    | {type : 'setName'; payload : string}
    | {type : 'setAmount'; payload : number}
    | {type : 'setCategory'; payload : string}

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
        category : ''
    })
    
    const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    }
    return(
        <>
        <Button text='Create' background='bg-sky-600' color='black' onClick={() => setOpenModal(prev => !prev)}/>
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
                        <input className="w-full bg-white rounded-md text-black px-3 py-1" onChange={(e) => dispatch({ type : 'setCategory', payload : e.target.value})}></input>
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