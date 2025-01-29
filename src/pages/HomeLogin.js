import CuentaAtras from "../components/CuentaAtras";
import Partida from "./Partida";
import axios from "axios";
import { useEffect, useState } from "react";



export default function HomeLogin(){

// Formateo de fecha:
//https://es.stackoverflow.com/questions/49370/c%C3%B3mo-dar-formato-a-una-fecha-en-javascript
let opciones = { year: 'numeric', month: 'short', day: 'numeric' };
let fecha = new Date().toLocaleDateString('es',opciones).replace(/ /g,'-')
.replace('.','')
.replace(/-([a-z])/, function (x) {return '-' + x[1].toUpperCase()});
    

const [verBoton, setVerBoton] = useState(true);
const [verCuentaAtras, setVerCuentaAtras] = useState(false);
const [verPartida, setVerPartida] = useState(false);
const [preguntas, setPreguntas] = useState([{}]);
    
// Recuperar datos personales de localStorage
let datosJson = localStorage.getItem("misdatos");
let datos = JSON.parse(datosJson); 
console.log(datos);

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
        if (error != "AxiosError: Request failed with status code 422")
        {  
       
        }          
    })   

},[]);



function handleOnClick(){
    setVerBoton(false);
    setVerCuentaAtras(true);
}


return (

<div className="tw-container">
    <div className="tw-mt-4 tw-text-center">
        <p>Bienvenido otra vez {datos.nombre}</p>
        <h1 className="tw-text-2xl tw-mt-3">{fecha}</h1>    
    </div>

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

</div>      

);

}