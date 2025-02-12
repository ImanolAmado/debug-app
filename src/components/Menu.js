import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeIcon from '@mui/icons-material/Home';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import { Link } from 'react-router-dom';

export default function Menu() {
  const [value, setValue] = React.useState(0);

  return (
    <div className="tw-flex tw-items-center tw-justify-center tw-border-t-2 border-blue-900">
    <Box 
    sx={{width: { xs: 375, sm: 550, md: 700, lg: 992, xl: 1200, xxl: 1400 } }}>      
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);       
          
        }}
      >
        <BottomNavigationAction label="Home" icon={<HomeIcon/>} component={Link} to="/"/> 
        <BottomNavigationAction label="Rankins" icon={<EmojiEventsIcon/>} component={Link} to="/rankings" />
        <BottomNavigationAction label="Partidas" icon={<SportsEsportsIcon/>} component={Link} to="/partidas"/>      
      </BottomNavigation>     
    </Box>
    </div>
  );
}