import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ListItemButton from '@mui/material/ListItemButton';
import { Box } from '@mui/material';






export default function Lista({persona, contador, handleOnClick}) {
  return (
  
    <List sx={{ width: '100%', maxWidth: '100%', bgcolor: 'background.paper' }}>
      <ListItem alignItems="flex-start">
      <ListItemButton sx={{ display: 'flex', 
        justifyContent: 'space-between', width: '100%' }}

        // función onClick que manejaremos en 'Ranking'
        onClick={function() {
          handleOnClick(persona.id)}
        } >                     


          <Box sx={{ display: 'flex', alignItems: 'center', gap:0 , minWidth: '40%' }}>
            <ListItemAvatar>
              <Avatar alt="avatar usuario" src={persona.avatar} />
            </ListItemAvatar>
            <ListItemText primary={contador} />
          </Box>


          <Box sx={{ minWidth: '30%', flexShrink: 0 }}>
            <ListItemText primary={persona.nickname} />
          </Box>

       
          <ListItemText primary={persona.total} sx={{ textAlign: 'right', minWidth: '30%' }} />
        </ListItemButton>
      </ListItem>
      <Divider variant="inset" component="li" />
    </List>
  );
}