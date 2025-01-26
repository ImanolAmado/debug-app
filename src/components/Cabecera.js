import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';



export default function Cabecera() {

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>         
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <img src="/debugLogo.png" width={100} alt="imagen logo"></img>
          </Typography>
          <Button color="inherit"><Link to="/usuario">Login</Link></Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}