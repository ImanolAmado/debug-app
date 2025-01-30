import { useState, useEffect} from "react";
import axios from "axios";



export default function Partidas({preguntas}){

    const [envio, setEnvio] = useState(false);
    const [juegoActivo, setJuegoActivo] = useState(true);
    const [contador, setContador] = useState(0);
    const [respuestasUsuario, setRespuestasUsuario] = useState([]);
    const [resumen, setResumen] = useState([]);

   
    let miToken="";
    if(localStorage.getItem("miToken")){
        miToken = localStorage.getItem('miToken'); 
    }


    useEffect(() => {     
        
        if (!envio) {
        return;
        }

        axios.post("http://127.0.0.1:8000/api/partida", respuestasUsuario,
            {
            headers: {
            Authorization: `Bearer ${miToken}`,
                },
            }
        )
        .then((response) => {                    
         
        // Si la respuesta es ok, cambiamos el estado de
        // juegoActivo para mostrar resumen del juego. Pasamos
        // la respuesta recibida a resumen.
            console.log(response.data);
            console.log(response.status);           
            setResumen(response.data);
            setJuegoActivo(false);
                           
            
        })
        .catch((error) => {             
            if (error != "AxiosError: Request failed with status code 422")
            {  
           
            }          
        })   
    
    },[envio]);


 // Función que maneja los botones, se guarda
 // en un estado las respuestas
    function handleOnClick(event){   
        event.preventDefault(); 
        
        setRespuestasUsuario(prevRespuestas => [
            ...prevRespuestas, 
            { id_pregunta: event.target.id, respuesta: event.target.name }
        ]);
                      
            
        if(contador < preguntas.length-1) {                                                
            setContador(contador + 1); 
        }

        // Si acaba la partida, se activa el envío
        else {
            console.log("se acabó el juego");
            setEnvio(true);
        }
    }

// Si el juego está activo, se muestran las preguntas. Después de enviar
// juego, ponemos el estado en false para pintar resumen juego.
    if(juegoActivo) {
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
        <button id={preguntas[contador].id} name={preguntas[contador].respuesta3} onClick={handleOnClick} className="tw-w-60 tw-bg-blue-500 hover:tw-bg-blue-900 tw-text-white tw-font-bold tw-py-2 tw-px-4 tw-rounded">{preguntas[contador].respuesta3}</button>         
    </div>    
    </div>
);


    } else {

// Resumen de partida
    return (

        <div>
        <div className="tw-text-center">
            <h1>Resumen partida</h1>
        </div>
        
        </div>
    );

    }

}