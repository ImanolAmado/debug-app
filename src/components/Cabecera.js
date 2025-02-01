import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';



export default function Cabecera() {


// Si existen datos en localStorage, el usuario está
// autenticado
if (sessionStorage.getItem("miToken")){

  // Recuperar datos personales de localStorage
let datosJson = sessionStorage.getItem("misdatos");
let datos = JSON.parse(datosJson); 
  
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>         
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <img src="/debugLogo.png" width={100} alt="Logo debug-academia"></img>
          </Typography>
          <Link to={"/usuario"}><button><img className="tw-mr-3 tw-mt-2" src={datos.avatar} width={40} alt="imagen avatar"></img></button></Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

else {

 return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>         
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <img src="/debugLogo.png" width={100} alt="imagen logo"></img>
          </Typography>
          <Button color="inherit"><Link to="/login">Login</Link></Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

}