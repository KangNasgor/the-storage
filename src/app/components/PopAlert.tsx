'use client'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import { faCircleExclamation, faCheckCircle } from "@fortawesome/free-solid-svg-icons";

interface Props {
    text : string,
    color : string,
    bg : string,
    addText? : boolean,
    type : 'info' | 'warning' | 'success',
}

export default function PopAlert({text, color, bg, addText, type} : Props){
    switch(type){
        case 'success' :
            return(
                <div className="bg-black/75 absolute left-0 top-0 w-full h-full flex justify-center items-center">
                    <div className="w-4/12 rounded-[14px] p-5 bg-white flex flex-col gap-5 justify-center">
                        <h1 className={`text-green-500 text-center text-3xl font-semibold ${addText === false ? 'hidden' : 'block'}`}>Success</h1>
                        <FontAwesomeIcon icon={faCheckCircle} className={`text-green-500 text-5xl mx-auto`}/>
                        <h1 className="text-green-600 text-center">Error : Lorem ipsum icikiwir</h1>
                        <button className="bg-green-500 max-w-fit mx-auto rounded-md px-3 py-2">Close</button>
                    </div>
                </div>
            );
        
        case 'info' :
            return(
                <div className="w-4/12 rounded-[14px] p-5 bg-white flex flex-col gap-5 justify-center">
                    <h1 className={`text-cyan-500 text-center text-3xl font-semibold ${addText === false ? 'hidden' : 'block'}`}>Info</h1>
                    <FontAwesomeIcon icon={faCircleExclamation} className={`text-cyan-500 text-5xl mx-auto`}/>
                    <h1 className="text-cyan-600 text-center">Error : Lorem ipsum icikiwir</h1>
                    <button className="bg-cyan-500 max-w-fit mx-auto rounded-md px-3 py-2">Close</button>
                </div>
            )

        case 'warning' : 
            return(
                <div className="w-4/12 rounded-[14px] p-5 bg-white flex flex-col gap-5 justify-center">
                    <h1 className={`text-red-500 text-center text-3xl font-semibold ${addText === false ? 'hidden' : 'block'}`}>Warning</h1>
                    <FontAwesomeIcon icon={faCircleXmark} className={`text-red-500 text-5xl mx-auto`}/>
                    <h1 className="text-red-600 text-center">Error : Lorem ipsum icikiwir</h1>
                    <button className="bg-red-500 max-w-fit mx-auto rounded-md px-3 py-2">Close</button>
                </div>
            )
    }
}