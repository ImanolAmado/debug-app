import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import HomeNoLogin from "../pages/HomeNoLogin";


export default function Logout(){
    
const navigate = useNavigate();
const [hacerLogout, setHacerLogout] = useState(true);
let miToken = "";

if(sessionStorage.getItem('miToken')){
miToken = sessionStorage.getItem('miToken');
}

useEffect(() => {

    // Para evitar que se ejecute multiples veces
    if (!hacerLogout) {
        return; 
    }
    
    axios.post("http://127.0.0.1:8000/api/logout",  {},
        {
            headers: {
              Authorization: `Bearer ${miToken}`,
            },
        }
    )
    .then((response) => {         
        sessionStorage.removeItem("miToken");  
        sessionStorage.removeItem("misdatos"); 
        setHacerLogout(false); 
        navigate(0);
                       
    })
    .catch((error) => {         
        console.log(error);               
    })
    
    .finally(() => {
       setHacerLogout(false);
    });

},[hacerLogout, miToken]);


return (
<HomeNoLogin/>
);

}
