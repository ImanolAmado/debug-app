import CuentaAtras from "../components/CuentaAtras";
import Partida from "./Partida";
import axios from "axios";
import { useEffect, useState } from "react";
import Loading from 'react-simple-loading';



export default function HomeLogin(){

// Formateo de fecha:
//https://es.stackoverflow.com/questions/49370/c%C3%B3mo-dar-formato-a-una-fecha-en-javascript
let opciones = { year: 'numeric', month: 'short', day: 'numeric' };
let fecha = new Date().toLocaleDateString('es',opciones).replace(/ /g,'-')
.replace('.','')
.replace(/-([a-z])/, function (x) {return '-' + x[1].toUpperCase()});
    

const [verBoton, setVerBoton] = useState(true);
const [hasJugado, setHasJugado] = useState(false);
const [verCuentaAtras, setVerCuentaAtras] = useState(false);
const [verPartida, setVerPartida] = useState(false);
const [preguntas, setPreguntas] = useState([{}]);
const [cargando, setCargando] = useState(true);
    

// Recuperar datos personales de localStorage
let datosJson = localStorage.getItem("misdatos");
let datos = JSON.parse(datosJson); 


// Recuperar token de localStorage para llamada Api
let miToken = "";
if(localStorage.getItem('miToken')){
miToken = localStorage.getItem('miToken');    
}

useEffect(() => {       

    axios.get("http://127.0.0.1:8000/api/partida",
        {
        headers: {
        Authorization: `Bearer ${miToken}`,
            },
        }
    )
    .then((response) => {            
        setPreguntas(response.data);
        console.log(preguntas);
        
    })
    .catch((error) => {     
        if(error.response.status){
        setHasJugado(true);
        setVerBoton(false);       
        } 
    })   
    .finally(() => {
        setCargando(false);
    })

},[]);


function handleOnClick(){
    setVerBoton(false);
    setVerCuentaAtras(true);
}


return (

<div className="tw-container">
    <div className="tw-mt-4 tw-text-center">
        <p>Bienvenid@ otra vez {datos.nombre}</p>
        <h1 className="tw-text-2xl tw-mt-3">{fecha}</h1>    
    </div>

    {/* Para evitar que se vea el botón de jugar mientras se espera respuesta
    de la API 
    https://www.npmjs.com/package/react-simple-loading*/}

    {cargando ? <Loading  color={'#1976d2'}
    stroke={'10px'}
    size={'100px'}></Loading> : 
    <div>    

    {/* Hacemos visible / invisible el botón */}
    {verBoton ?   
    <div className="tw-flex tw-flex-col tw-mt-5 tw-items-center">         
        <button onClick={handleOnClick} className="tw-w-60 tw-bg-blue-500 hover:tw-bg-blue-900 tw-text-white tw-font-bold tw-py-2 tw-px-4 tw-rounded">¡Practica!</button>
    </div> :  <></> }     

     {/* Hacemos visible / invisible componente cuenta atrás */}
    {verCuentaAtras ?
    <div>
        <CuentaAtras setVerCuentaAtras={setVerCuentaAtras} setVerPartida={setVerPartida}></CuentaAtras>
    </div> : <></> }
     
    {/* Una vez termina la cuenta atrás, hacemos visible la partida */}
    {verPartida ?
    <div>
        <Partida preguntas={preguntas}></Partida>
    </div> : <></>
    }

    {/* En caso de que el usuario ya haya jugado */}
    {hasJugado ?
    <div>
        <p>Lo siento, ya has practicado hoy. ¡Vuelve mañana!</p>
    </div> : <></>
    }
    
    </div>}

</div>      

);

}