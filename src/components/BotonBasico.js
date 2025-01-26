import * as React from 'react';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

export default function BotonBasico({tipo, texto, ruta}) {
  return (        
  <Button className="tw-w-64" component={Link} to={ruta} variant={tipo}>{texto}</Button>    
  );
}