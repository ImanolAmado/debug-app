import CuentaAtras from "../components/CuentaAtras";
import Partida from "./Partida";
import { apiClient } from "../components/apiClient";
import { useEffect, useState } from "react";
import Loading from 'react-simple-loading';
import Patrocinador from "../components/Patrocinador";



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


// Array para pasarle al componente "Patrocinadores"
let lista_patrocinadores = [
    {
    id: 1,
    url: "https://www.fpeuskadidual.eus/",
    imagen: "images/patrocinadores/patrocinador3.jpg",
    texto: "La combinación de la formación entre el centro educativo y el aprendizaje en la empresa facilita la incorporación de la juventud al mercado laboral, y genera importantes beneficios para las 3 partes."
    },  
    {
    id: 2,
    url: "https://www.lhusurbil.eus/web/default.aspx?lng=es",
    imagen: "images/patrocinadores/patrocinador1.jpg",
    texto: "USURBILGO LANBIDE ESKOLA está profundamente arraigado en su entorno, desde 1975 han pasado por sus aulas e instalaciones un gran número de alumnos/as y empresas que han contribuido al desarrollo de la comarca desde sus empresas. Tenemos una estrecha relación con el mundo laboral, colaboramos con más de 300 empresas para la realización del módulo de Formación en Centros de Trabajo."
    },    
    {
    id: 3,
    url: "https://www.birt.eus/",
    imagen: "images/patrocinadores/patrocinador2.jpg",
    texto: "BIRTLH es el único centro público dependiente del Departamento de Educación del Gobierno Vasco que ofrece titulaciones de formación profesional en las modalidades telemática y semipresencial, con ámbito de actuación en los tres territorios históricos de la Comunidad Autónoma."
    }, 
    {
    id: 4,
    url: "https://www.ikaslangipuzkoa.eus/es",
    imagen: "images/patrocinadores/patrocinador4.jpg",
    texto: "Ikaslan Gipuzkoa es una Asociación de Directores/as de 27 centros de Formación Profesional Públicos. En los centros pertenecientes a Ikaslan Gipuzkoa cursan 11.272 alumnos/as en formación inicial repartidos entre los 118 Ciclos de Grado Medio, Grado Superior,  Formación Básica y Especializaciones dando respuesta a 22 familias profesionales."
    }, 
];     


let patrocinadores = [];
let indiceAleatorio;
let primerElemento = -1;

// Obtener dos elementos aleatorio diferentes de lista_patrocinadores
// y añadirlos al array patrocinadores para pintarlo en pantalla
for(let i=0; i<2; i++){
    
    indiceAleatorio = Math.floor(Math.random() * lista_patrocinadores.length);
    
    if(i==0){
    primerElemento = indiceAleatorio;
    patrocinadores.push(lista_patrocinadores[indiceAleatorio]);
    } else {
        if(indiceAleatorio==primerElemento){
            i=0;
        } else patrocinadores.push(lista_patrocinadores[indiceAleatorio]);
    }
}


// Recuperar datos personales de localStorage
let datosJson = sessionStorage.getItem("misdatos");
let datos = JSON.parse(datosJson); 


// Recuperar token de localStorage para llamada Api
let miToken = "";
if(sessionStorage.getItem('miToken')){
miToken = sessionStorage.getItem('miToken');    
}

useEffect(() => {       

    apiClient.get("/partida",
        {
        headers: {
        Authorization: `Bearer ${miToken}`,
            },
        }
    )
    .then((response) => {            
        setPreguntas(response.data);      
        
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
    <div> 
    <div className="tw-flex tw-flex-col tw-mt-5 tw-items-center">         
        <button onClick={handleOnClick} className="tw-mb-10 tw-w-60 tw-bg-blue-500 hover:tw-bg-blue-900 tw-text-white tw-font-bold tw-py-2 tw-px-4 tw-rounded">¡Practica!</button>
        <p className="tw-text-center">Nuestros colaboradores</p>
    </div> 
    {patrocinadores.map((patrocinador) => (<Patrocinador key={patrocinador.id} patrocinador={patrocinador}></Patrocinador>))} 
    </div>    
    :  <></> }     

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
    <div className="tw-text-center">
        <p className="tw-mb-10">Lo siento, ya has practicado hoy.<br></br> 
        ¡Vuelve mañana!</p>
        <p className="tw-text-center">Nuestros colaboradores</p>
    {patrocinadores.map((patrocinador) => (<Patrocinador key={patrocinador.id} patrocinador={patrocinador}></Patrocinador>))} 
    </div> : <></>
    }    
    </div>}

</div>      

);

}