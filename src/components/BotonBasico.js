import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

export default function BotonBasico({tipo, texto}) {
  return (
    <Stack spacing={2} direction="row">      
      <Button variant={tipo}>{texto}</Button>      
    </Stack>
  );
}