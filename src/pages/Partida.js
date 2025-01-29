import { useState } from "react";



export default function Partidas({preguntas}){

    console.log(preguntas);
    const [contador, setContador] = useState(0);

 
    function handleOnClick(event){   
        
        if(contador < preguntas.length - 1) {
        setContador(contador + 1);
        console.log(event.target.id);
        console.log(event.target.name);
        }
        else {
            console.log("se acabó el juego");
            console.log(event.target.id);
            console.log(event.target.name);

        }
    }


return (  

    <div>
    <div className="tw-container tw-flex tw-flex-col tw-items-center">
        <p className="tw-text-gray-700 tw-text-center">{preguntas[contador].pregunta}</p>
        <img src={preguntas[contador].imagen} className="tw-flex tw-flex-col tw-mt-2 tw-items-center" alt="foto pregunta"></img>
    </div> 
    <div className="tw-flex tw-flex-col tw-mt-5 tw-items-center">         
        <button id={preguntas[contador].id} name={preguntas[contador].respuesta1} onClick={handleOnClick} className="tw-w-60 tw-bg-blue-500 hover:tw-bg-blue-900 tw-text-white tw-font-bold tw-py-2 tw-px-4 tw-rounded">{preguntas[contador].respuesta1}</button>
    </div>       
    <div className='tw-flex tw-flex-col tw-mt-5 tw-items-center'>
        <button id={preguntas[contador].id} name={preguntas[contador].respuesta2} onClick={handleOnClick} className="tw-w-60 tw-bg-blue-500 hover:tw-bg-blue-900 tw-text-white tw-font-bold tw-py-2 tw-px-4 tw-rounded">{preguntas[contador].respuesta2}</button>
    </div>
    <div className='tw-flex tw-flex-col tw-mt-5 tw-items-center'>
        <button id={preguntas[contador].id} name={preguntas[contador].respuesta_correcta} onClick={handleOnClick} className="tw-w-60 tw-bg-blue-500 hover:tw-bg-blue-900 tw-text-white tw-font-bold tw-py-2 tw-px-4 tw-rounded">{preguntas[contador].respuesta_correcta}</button>         
    </div>    
</div>

);

}