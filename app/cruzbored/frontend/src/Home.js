
import React from 'react';
// import {useNavigate} from 'react-router-dom';

import './Home.css';
import EventList from './EventList';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import {Avatar, IconButton, ListItemButton,
  Toolbar, Tooltip} from '@mui/material';
  import Typography from '@mui/material/Typography';
  import CssBaseline from '@mui/material/CssBaseline';
  import Cookies from 'js-cookie';

  import Fab from '@mui/material/Fab';
  import AddIcon from '@mui/icons-material/Add';
import Login from './Login';

// const session = Cookies.get("userId");

export const UserContext = React.createContext()
  // {
  //   session : Cookies.get("userId"),
  //   // setSession: (session) => {}
  // }
// )


/**
 * @return {object} JSX Table
 */
function Home() {
  const [session, updateSession] = React.useState(Cookies.get("userId"));
  function setSession() {
    updateSession(undefined);
  }
  return (
    <UserContext.Provider value={{ session, setSession }}>
    <Box sx={{display: 'flex'}}>
      <script src="https://accounts.google.com/gsi/client" async defer></script>
      <AppBar
          position = 'fixed'
        >
                <CssBaseline />
          <Toolbar >
            <Typography variant = 'h6' noWrap component ='div'>
              {'SlugsAboard'}
            </Typography>
            <Tooltip title="Log Out">
              <IconButton

                color='inherit'
                aria-label='logout'
                // onClick={logout}
                edge='end'
                sx = {{
                  ml: 'auto',
                }}
              >

                  <Login></Login>
              </IconButton>
            </Tooltip>

          </Toolbar>
        </AppBar>
        <EventList/>
        
    </Box>
    </UserContext.Provider>

  );
}

export default Home;