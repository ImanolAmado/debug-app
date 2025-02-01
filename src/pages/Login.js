import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Home from "./Home";



export default function Login(){

    const navigate = useNavigate();
    
    const [error, setError] = useState({
        email: false,
        password: false
    });
    const [mensajeError, setMensajeError] = useState({
        email: "",
        password: ""
    });
    const [hacerLogin, setHacerLogin] = useState(false);
    const [formularioLogin, setFormularioLogin] = useState(
        {     
         email: "",
         password: ""
        }
    );

         
    let logueado = false;
    if (sessionStorage.getItem("miToken")){   
        logueado = true;       
    } 

      
    useEffect(() => {
    
        // Para evitar que se ejecute al renderizar la página
        if (hacerLogin === false) return;
    
        axios.post("http://127.0.0.1:8000/api/login", formularioLogin)
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
            navigate(0); 
        })
        .catch((error) => {             
            if (error != "AxiosError: Request failed with status code 422")
            {  
            setError((prevError) => ({ ...prevError, email: true, password: true }));
            setMensajeError((prevMensajeError) => ({ ...prevMensajeError, password: "Usuario o password incorrecto" }));
            }          
        })   
    
        // reseteamos a "false" 
        .finally(() => {
            setHacerLogin(false);
        });
    
    },[hacerLogin, formularioLogin]);
    
    
    
        function handleOnChange(event){
            const { value, name } = event.target;    
            setFormularioLogin({...formularioLogin,
            [name]:value });
        }
    
    
        function handleOnClick(event){
            event.preventDefault();        
            setHacerLogin(true);
        }



if(!logueado) {

return (

<div>
<Box
      component="form"
      sx={{ '& .MuiTextField-root': { m: 1, width: '30ch' } }}
      noValidate
      autoComplete="off"
    >
    <div className="tw-text-center tw-mt-4">
        <h1>Login</h1>        
    </div>
    
    <div className='tw-flex tw-flex-col tw-mt-5 tw-items-center tw-mt-2'>        
        
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