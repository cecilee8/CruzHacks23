import React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import AppBar from '@mui/material/AppBar';
import {Avatar, IconButton, ListItemButton,
  Toolbar, Tooltip, useRadioGroup} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';

// import Divider from '@mui/material/Divider';


import Typography from '@mui/material/Typography';

const fetchEvents = (category, setEvent) => {
  // const user = JSON.parse(localStoage.getItem('user'));
  fetch('http://localhost:8080/api/posts', {
    method: 'GET',
    headers: new Headers({
      // 'Authorization': `Bearer ${???}`,
      'Content-Type': 'applicaton/x-www-form-urlencoded',
    }),
  })
    .then((response) => {
      console.log(response);
      if (!response.ok) {
        throw response;
      }
      // console.log('user: ' + user.name);
      return response.json();
    })
    .then((json) => {
      console.log(json);
      setEvent(json.posts);
    })
    .catch((error) => {
      setEvent([]);
    });


}

/**
 * @return {object} JSX Table
 */
function EventList() {
  // const user = JSON.parse(localStorage.getItem('user'));
  const [event, setEvent] = React.useState([]);
  const [category, setCategory] = React.useState('Main');
  React.useEffect(() => {
    fetchEvents('Main', setEvent);
  }, []);
  // const navigate = useNavigate();
  // const logout = () => {
  //   localStorage.removeItem('user');

  //   navigate('/login');
  // };


  return (

    <Box sx={{display: 'flex'}}>
      <CssBaseline />
      <Box
        component='main'
        sx={{
          flexGrow: 1,
          mt: 10,
          ml: '2%',
        }}
      >
        <List >
          {}
        </List>
      </Box>
    </Box>
  );
}

export default EventList;
