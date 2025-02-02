import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Loading from 'react-simple-loading';


export default function Usuario(){

    const [stats, setStats] = useState([]); 
    const [cargando, setCargando] = useState(true);

    // Recuperar datos personales y token de sessionStorage
    let datosJson = sessionStorage.getItem("misdatos");
    let datos = JSON.parse(datosJson); 

    let miToken = sessionStorage.getItem("miToken");

    // formatear fecha
    // https://www.aluracursos.com/blog/como-formatear-fechas-horas-y-monedas-en-javascript
    let fechaCreada = new Date(datos.created_at);
    let fechaFormateada = fechaCreada.toLocaleDateString('es-BO', { timeZone: 'UTC',});
    

    useEffect(() => {    
       
        axios.get("http://127.0.0.1:8000/api/userstats",
            {
            headers: {
            Authorization: `Bearer ${miToken}`,
                },
            }
        )
        .then((response) => {                    
        console.log(response.data);
        setStats(response.data);                
            
        })
        .catch((error) => {            
            console.log(error.error);                    
        })   

        .finally(()=> {
        setCargando(false);
        })
    
    },[]);

    // Calcula el número de respuestas acertadas del usuario
    let respuestasAcertadas = 0;
    let numPartidas = stats.length;
    
    for(let i=0; i<numPartidas; i++){
        for(let j=0; j<10; j++){
            if(stats[i][j].pivot.acierto==true){
                respuestasAcertadas++;
            }
        }
    }

    let ratio= ((respuestasAcertadas * 100 / numPartidas)/10).toFixed(1);

    return(                

        <div className="tw-mt-10"> 
            {cargando ? <Loading  color={'#1976d2'}
            stroke={'10px'}
            size={'100px'}></Loading> : 
            <div>
            <div className="tw-bg-gray-200 tw-mr-8 tw-ml-8 tw-rounded-2xl tw-flex tw-flex-col tw-justify-center tw-items-center">
                <img className="tw-pt-4" src={datos.avatar} width="30%" alt="foto avatar"></img>
                <p className="tw-mt-2">{datos.nombre} {datos.apellido}</p>
                <p className="tw-pb-4">({datos.nickname})</p>
                <p className="tw-pb-4">{datos.email}</p>
            </div>
            <div className="tw-mt-2 tw-flex tw-flex-col tw-justify-center tw-items-center">
                <p className="tw-font-semibold">Total puntos: {respuestasAcertadas}</p>
                <p>Miembro de la comunidad desde:</p>
                <p>{fechaFormateada}</p>
                <p>Total partidas: {numPartidas}</p>
                <p>Ratio aciertos: {ratio}%</p>
            </div>
            <div className="tw-mt-10">
                <h3 className="tw-text-xl tw-text-center tw-text-blue-700 tw-underline"><Link to="/logout">Logout</Link></h3>
            </div>
            </div> }           
        </div>
    );

}