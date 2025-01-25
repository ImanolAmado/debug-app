import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import { Link } from 'react-router-dom';

export default function Menu() {
  const [value, setValue] = React.useState(0);

  return (
    <Box sx={{width: { xs: 375, sm: 550, md: 700, lg: 992, xl: 1200, xxl: 1400 } }}>      
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
          console.log(value);
          
        }}
      >
        <BottomNavigationAction label="Home" icon={<HomeIcon/>} component={Link} to="/"/> 
        <BottomNavigationAction label="Rankins" icon={<EmojiEventsIcon/>} component={Link} to="/rankings" />
        <BottomNavigationAction label="Partidas" icon={<SportsEsportsIcon/>} component={Link} to="/partidas"/>
        <BottomNavigationAction label="Usuario" icon={<PersonIcon/>} component={Link} to="/usuario"/>
      </BottomNavigation>     
    </Box>
  );
}