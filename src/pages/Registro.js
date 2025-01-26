import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { useState, useEffect } from 'react';



export default function Registro(){


    const [correcto, setCorrecto] = useState(false);
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

    useEffect(() => {

        // Evitar que se ejecute al renderizar
        if(correcto===false){
          return;
        }
      
          axios.post("http://127.0.0.1:8000/api/registro", formulario)
          .then((response) => {     
           
            

                      
          })
          .catch((error) => {                
              
            

          })
      
          .finally(() => {
            setCorrecto(false);
          });
      
      },[correcto, formulario]);

    // Actualiza el estado del formulario    
    function handleOnChange(event){        
        const { value, name } = event.target;    
        setFormulario({...formulario,
        [name]:value });
    }

    function handleOnClick(event){       
        event.preventDefault();       
        let nombreValido = true;
        let apellidoValido = true;
        let emailValido = true;
        let nicknameValido = true;
        let passwordValido = true;
        let fechaValida = true;
       
        nombreValido = validarNombre(formulario.nombre);        
        apellidoValido = validarApellido(formulario.apellido);
        nicknameValido = validarNickname(formulario.nickname);
        emailValido = validarEmail(formulario.email);
        fechaValida = validarFecha(formulario.fecha_nacimiento);
        passwordValido = validarPassword(formulario.password);

        if(nombreValido===true && apellidoValido===true && nicknameValido===true
            && emailValido===true && fechaValida===true && passwordValido===true) {
            setCorrecto(true);
        }
       


    }

    // Función para validar nombre del formulario
    // Establece los estados de error y mensaje de error
    function validarNombre(nombre){
        if(nombre.length < 3 || nombre.length > 100){
        setError((prevError) => ({ ...prevError, nombre: true }));
        setMensajeError((prevMensajeError) => ({ ...prevMensajeError, nombre: "Entre 3 y 100 caracteres" }));
        return false;

        } else {
        setError((prevError) => ({ ...prevError, nombre: false }));
        setMensajeError((prevMensajeError) => ({ ...prevMensajeError, nombre: "" }));           
        return true;
        }   
    }

    // Función para validar apellido del formulario
    // Establece los estados de error y mensaje de error
    function validarApellido(apellido){
        if(apellido.length < 3 || apellido.length > 100){
        setError((prevError) => ({ ...prevError, apellido: true }));
        setMensajeError((prevMensajeError) => ({ ...prevMensajeError, apellido: "Entre 3 y 100 caracteres" }));
        return false;

        } else {
        setError((prevError) => ({ ...prevError, apellido: false }));
        setMensajeError((prevMensajeError) => ({ ...prevMensajeError, apellido: "" }));            
        return true;
        }   
    }

    // Función para validar nickname del formulario
    // Establece los estados de error y mensaje de error
    function validarNickname(nickname){
        if(nickname.length < 3 || nickname.length > 15){
        setError((prevError) => ({ ...prevError, nickname: true }));
        setMensajeError((prevMensajeError) => ({ ...prevMensajeError, nickname: "Entre 3 y 15 caracteres" }));  
        return false;

        } else {
        setError((prevError) => ({ ...prevError, nickname: false }));
        setMensajeError((prevMensajeError) => ({ ...prevMensajeError, nickname: "" }));            
        return true;
        }   
    }


    // Función para validar email del formulario
    // // Establece los estados de error y mensaje de error
    function validarEmail(email){
        if(!email.includes('@')){
        setError((prevError) => ({ ...prevError, email: true }));
        setMensajeError((prevMensajeError) => ({ ...prevMensajeError, email: "Formato incorrecto" }));
        return false;
        } else {
        if(email.length < 5 || email.length > 200){
        setError((prevError) => ({ ...prevError, email: true }));
        setMensajeError((prevMensajeError) => ({ ...prevMensajeError, email: "Entre 5 y 200 caracteres" }));
        return false;
        } 
        else {
        setError((prevError) => ({ ...prevError, email: false }));
        setMensajeError((prevMensajeError) => ({ ...prevMensajeError, email: "" }));         
        return true;
        } 
        }
    }


    // Función para validar fecha del formulario
    // Usuario debe ser mayor de edad
    // Establece los estados de error y mensaje de error
    function validarFecha(fecha){       
        // Controlamos si la fecha está vacía
        if (!fecha) {
        setError((prevError) => ({ ...prevError, fecha_nacimiento: true }));
        setMensajeError((prevMensajeError) => ({ ...prevMensajeError, fecha_nacimiento: "El campo fecha es requerido" }));
        return false;
        }

        // Se comprueba si el usuario es mayor de edad        
        let hoy = new Date();
        let fechaNacimiento = new Date(fecha);

        let edad = hoy.getFullYear() - fechaNacimiento.getFullYear();        

        // Si el usuario es mayor de 18, devolvemos true
        if (edad > 18) {
        setError((prevError) => ({ ...prevError, fecha_nacimiento: false }));
        setMensajeError((prevMensajeError) => ({ ...prevMensajeError, fecha_nacimiento: "" }));         
        return true;
        }
    
        // Si es menor de 18, devolvemos false
        if (edad < 18) {
        setError((prevError) => ({ ...prevError, fecha_nacimiento: true }));
        setMensajeError((prevMensajeError) => ({ ...prevMensajeError, fecha_nacimiento: "Debes de ser mayor de edad" }));
        return false;
        }
    
        // Si es igual a 18, se comprueba mes y día
        if (edad === 18) {
            let mes = hoy.getMonth() - fechaNacimiento.getMonth();
    
            if (mes < 0) {
            setError((prevError) => ({ ...prevError, fecha_nacimiento: true }));
            setMensajeError((prevMensajeError) => ({ ...prevMensajeError, fecha_nacimiento: "Aún eres menor de edad" }));
            return false;
            }
    
            // Si el mes es igual, se comprueba el día
            if (mes === 0) {
            let dia = hoy.getDate() - fechaNacimiento.getDate();
                if (dia < 0) {
                setError((prevError) => ({ ...prevError, fecha_nacimiento: true }));
                setMensajeError((prevMensajeError) => ({ ...prevMensajeError, fecha_nacimiento: "Aún eres menor de edad" }));
                return false;
                }
            }
        }
    
        // Si llegamos hasta aquí, la fecha es válida
        setError((prevError) => ({ ...prevError, fecha_nacimiento: false }));
        setMensajeError((prevMensajeError) => ({ ...prevMensajeError, fecha_nacimiento: "" }));         
        return true;
    }


    // Función para validar password del formulario
    // Establece los estados de error y mensaje de error
    function validarPassword(password){
        if(password.length < 6 || password.length > 15){
        setError((prevError) => ({ ...prevError, password: true }));
        setMensajeError((prevMensajeError) => ({ ...prevMensajeError, password: "Entre 6 y 15 caracteres" }));
        return false;

        } else {
        setError((prevError) => ({ ...prevError, password: false }));
        setMensajeError((prevMensajeError) => ({ ...prevMensajeError, password: "" }));           
        return true;
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
          type="email"     
          id="email"              
          name="email" 
          label="Email" 
          placeholder='email'   
          size="small"     
          minLength={5}
          maxLength={200}
          onChange = {handleOnChange}
          value={formulario.email}    
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
          error={error.fecha_nacimiento}  
          helperText={mensajeError.fecha_nacimiento}         
          type="date"
          id="fecha_nacimiento"              
          name="fecha_nacimiento"                     
          size="small"          
          onChange = {handleOnChange}
          value={formulario.fecha_nacimiento}    
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