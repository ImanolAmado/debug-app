import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
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

    function handleOnClick(event){       
        event.preventDefault();
        console.log("Estoy en handleClick");
        let nombreValido = true;
        let apellidoValido = true;
        let emailValido = true;
        let nicknameValido = true;
        let passwordValido = true;
        let fechaValida = true;

        nombreValido = validarNombre(formulario.nombre);
        apellidoValido = validarApellido(formulario.apellido);
        nicknameValido = validarNickname(formulario.nickname);

    }

    // Función para validar nombre del formulario
    // Establece los estados de error y mensaje de error
    function validarNombre(nombre){
        if(nombre.length < 3 || nombre.length > 100){
            setError({...error, nombre:true});
            setMensajeError({...mensajeError, nombre:"Entre 3 y 100 caracteres"});
        return false;

        } else {
            setError({...error, nombre:false});
            setMensajeError({...mensajeError, nombre:""});           
        return true;
        }   
    }

    // Función para validar apellido del formulario
    // Establece los estados de error y mensaje de error
    function validarApellido(apellido){
        if(apellido.length < 3 || apellido.length > 100){
            setError({...error, apellido:true});
            setMensajeError({...mensajeError, apellido:"Entre 3 y 100 caracteres"});
        return false;

        } else {
            setError({...error, apellido:false});
            setMensajeError({...mensajeError, apellido:""});           
        return true;
        }   
    }

    // Función para validar nickname del formulario
    // Establece los estados de error y mensaje de error
    function validarNickname(nickname){
        if(nickname.length < 3 || nickname.length > 15){
            setError({...error, nickname:true});
            setMensajeError({...mensajeError, nickname:"Entre 3 y 15 caracteres"});
        return false;

        } else {
            setError({...error, nickname:false});
            setMensajeError({...mensajeError, nickname:""});           
        return true;
        }   
    }


    // Función para validar email del formulario
    // 
    function validarEmail(email){
    if(!email.includes('@')){
      setErrorEmail('El formato de email es incorrecto');
    return false;
    } else {
        if(email.length < 5 || email.length > 100){
            setErrorEmail("El email debe tener entre 5 y 100 caracteres");
          return false;
        } 
        else {
        setErrorEmail("");      
        return true;
        } 
    }
}






return(
<div>

<Box
      component="form"
      sx={{ '& .MuiTextField-root': { m: 1, width: '30ch' } }}
      noValidate
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
          error={error.apellido}  
          helperText={mensajeError.apellido}          
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
          error={error.email}  
          helperText={mensajeError.email}        
          id="email"              
          name="email" 
          label="Email" 
          placeholder='email'   
          size="small"     
          minLength={5}
          maxLength={200}
          onChange = {handleOnChange}
          value={formulario.nickname}    
        />           
        
        <TextField 
          required  
          error={error.nickname}  
          helperText={mensajeError.nickname}        
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

    <div className='tw-flex tw-flex-col tw-mt-10 tw-items-center'> 
        <Button className='tw-w-40' variant='contained' onClick={handleOnClick}>Enviar</Button>           
    </div> 


</div>

);
}