import Lista from "../components/Lista";
import { useState, useEffect } from "react";
import MenuRanking from "../components/MenuRanking";
import { apiClient } from "../components/apiClient";




export default function Rankings(){

   
    const [personas, setPersonas] = useState([]);
    let contador = 1;


    useEffect(() => {     

        apiClient.get("/ranking")           
        
        .then((response) => {            
            console.log(response.data); 
            setPersonas(response.data);    
            
        })
        .catch((error) => {     
            if(error.response.status){
                  
            } 
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