import { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Home from "./Home";
import { apiClient } from "../components/apiClient";
import { useNavigate } from "react-router-dom";


export default function Login(){

    let logueado = false;
    const [hacerLogin, setHacerLogin] = useState(false);
    const navigate = useNavigate();
    

    const [error, setError] = useState({
        email: false,
        password: false
    });
    const [mensajeError, setMensajeError] = useState({
        email: "",
        password: ""
    });
  
    const [formularioLogin, setFormularioLogin] = useState(
        {     
         email: "",
         password: ""
        }
    );
         

    if (sessionStorage.getItem("miToken")) {   
    logueado = true;      
    } 
   

      
    useEffect(() => {

        if(hacerLogin===false) return;
        
        apiClient.post('/login', formularioLogin)
        .then((response) => {                
            // guardamos token en localStorage                    
            sessionStorage.setItem("miToken", response.data.token);            
            // creamos objeto "datos" con los datos de usuario 
            // y lo pasamos a localStorage
            let datos = {
                id: response.data.user.id,
                nombre: response.data.user.nombre,
                apellido:response.data.user.apellido,
                email:response.data.user.email,
                avatar:response.data.user.avatar,
                fecha_nacimiento:response.data.user.fecha_nacimiento,
                role:response.data.user.role,
                created_at:response.data.user.created_at,
                nickname:response.data.user.nickname
            };                  
            sessionStorage.setItem("misdatos", JSON.stringify(datos));  
            navigate("/");              
           
        })
        .catch((error) => {             
            if (error != "AxiosError: Request failed with status code 422")
            {  
            setError((prevError) => ({ ...prevError, email: true, password: true }));
            setMensajeError((prevMensajeError) => ({ ...prevMensajeError, password: "Usuario o password incorrecto" }));
            }          
        })   
          
        .finally(() => {
                 
        });
    
    },[hacerLogin]);
    
        
        function handleOnChange(event){
            const { value, name } = event.target;    
            setFormularioLogin({...formularioLogin,
            [name]:value });
        }
    
    
        function handleOnClick(event){
            event.preventDefault();        
            setHacerLogin(true);
        }


if(logueado==false) {

return (

<div>
<Box
      component="form"
      sx={{ '& .MuiTextField-root': { m: 1, width: '30ch' } }}
      noValidate
      autoComplete="off"
    >
    <div className="tw-mr-5 tw-ml-5 tw-text-center tw-mt-20 tw-border">
        <h1 className="tw-pt-5">Login</h1>            
        <div className='tw-flex tw-flex-col tw-items-center tw-mb-5'>      
         <TextField          
          required  
          error={error.email}  
          helperText={mensajeError.email}   
          type="email"     
          id="email"              
          name="email" 
          label="Email" 
          placeholder='email'   
          size="small"     
          minLength={5}
          maxLength={200}
          onChange = {handleOnChange}
          value={formularioLogin.email}    
        />        
         
        <TextField
          required    
          error={error.password}  
          helperText={mensajeError.password}     
          id="password"
          label="Password"
          type="password"
          name="password"
          autoComplete="current-password"
          size="small"     
          minLength={6}
          maxLength={15}
          onChange = {handleOnChange}
          value={formularioLogin.password} 
        />
    </div>
    </div>
</Box>

    <div className='tw-flex tw-flex-col tw-mt-10 tw-items-center'> 
        <Button className='tw-w-40' variant='contained' onClick={handleOnClick}>Enviar</Button>           
    </div> 
</div>

);

} else {
    return (
        <Home></Home>
    );
}

}