import { useEffect, useState } from "react";
import HomeNoLogin from "../pages/HomeNoLogin";
import { apiClient } from "./apiClient";
import { useNavigate } from "react-router-dom";


export default function Logout(){
    
const navigate = useNavigate();
let miToken = "";

if(sessionStorage.getItem('miToken')){
miToken = sessionStorage.getItem('miToken');
}

useEffect(() => {
       
    apiClient.post("/logout",  {},
        {
            headers: {
              Authorization: `Bearer ${miToken}`,
            },
        }
    )
    .then((response) => {         
        sessionStorage.removeItem("miToken");  
        sessionStorage.removeItem("misdatos");   
        navigate('/');     
                              
    })
    .catch((error) => {         
        console.log(error);               
    })
    
    .finally(() => {
       
    });

},[]);


return (
<HomeNoLogin/>
);

}
