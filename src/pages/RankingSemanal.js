import Lista from "../components/Lista";
import { useState, useEffect } from "react";
import Loading from 'react-simple-loading';
import axios from "axios";
import MenuRanking from "../components/MenuRanking";
import { Link } from "react-router-dom";



export default function RankingSemanal(){


    const [cargando, setCargando] = useState(true);
    const [personas, setPersonas] = useState([]);
    let contador = 1;


    useEffect(() => {     

        axios.get("http://127.0.0.1:8000/api/rankingsemanal")           
        
        .then((response) => {            
            console.log(response.data); 
            setPersonas(response.data);    
            
        })
        .catch((error) => {     
            if(error.response.status){
                  
            } 
        })   
        .finally(() => {
            setCargando(false);
        })
    
    },[]);


    function handleOnClick(event){
        console.log(event);
    }

    
    return(
        <div>
        <MenuRanking></MenuRanking>
        {personas.map((persona)=>(<Lista key={contador} handleOnClick={handleOnClick} persona={persona} contador={contador++} ></Lista>))}        
        </div>
    );

}







