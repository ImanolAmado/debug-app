import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useState } from 'react';



export default function Registro(){


    // Estado del formulario
    const [formulario, setFormulario] = useState(
        {
         nombre: "",
         apellido: "",
         email: "",
         nickname: "",
         fecha_nacimiento:"",
         password: ""
        }
    );


    // Estado control de errores
    const [error, setError] = useState(
        {
         nombre: false,
         apellido: false,
         email: false,
         nickname: false,
         fecha_nacimiento: false,
         password: false
        }
    );


    // Mensajes de errores
    const [mensajeError, setMensajeError] = useState(
        {
         nombre: "",
         apellido: "",
         email: "",
         nickname: "",
         fecha_nacimiento: "",
         password: ""
        }
    );





    // Actualiza el estado del formulario    
    function handleOnChange(event){
        console.log(event.target.value);
        const { value, name } = event.target;    
        setFormulario({...formulario,
        [name]:value });
    }


return(
<div>

<Box
      component="form"
      sx={{ '& .MuiTextField-root': { m: 1, width: '30ch' } }}
      
      autoComplete="off"
    >
    <div className="tw-text-center tw-mt-4">
        <h1>Formulario de registro</h1>
    </div>

    
    <div className='tw-flex tw-flex-col tw-mt-10 tw-items-center tw-mt-2'>        
        <TextField 
          required
          error={error.nombre}  
          helperText={mensajeError.nombre}        
          id="nombre"              
          name="nombre" 
          label="Nombre" 
          placeholder='nombre'   
          size="small"     
          minLength={3}
          maxLength={100}
          onChange = {handleOnChange}
          value={formulario.nombre}    
        />       
        <TextField
          required         
          id="apellido"
          label="Apellido"
          name="apellido" 
          placeholder="apellido"    
          size="small"     
          minLength={3}
          maxLength={100}
          onChange = {handleOnChange}
          value={formulario.apellido}             
        />       
        
        <TextField 
          required         
          id="nickname"              
          name="nickname" 
          label="Nickname" 
          placeholder='nickname'   
          size="small"     
          minLength={3}
          maxLength={15}
          onChange = {handleOnChange}
          value={formulario.nickname}    
        />    

        <TextField 
          required          
          type="date"
          id="fecha_nacimiento"              
          name="fecha_nacimiento"                     
          size="small"          
          onChange = {handleOnChange}
          value={formulario.fecha_nacimiento}    
        />    

        <TextField
          required        
          id="password"
          label="Password"
          type="password"
          name="password"
          autoComplete="current-password"
          size="small"     
          minLength={6}
          maxLength={255}
          onChange = {handleOnChange}
          value={formulario.password} 
        />
    </div>
</Box>
</div>

);
}