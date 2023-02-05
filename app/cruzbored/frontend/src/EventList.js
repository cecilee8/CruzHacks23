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
          {(event).map((item) => (
            <ListItem disablePadding key={item.id}
            divider={true}
          >
            {console.log(item)}
            <ListItemButton
              aria-label={item.title}
              onClick={() => {
                console.log(item);
              }}
              sx={{
                display: 'flex',
                flex: 1,
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flex: 15,
                  flexDirection: 'column',
                  ml: 4,

                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    flex: '1',
                    width: '100%',
                    // mr: 100,
                    flexDirection: 'row',
                    marginRight: 'auto',
                  }}
                >
                  <ListItemText
                    sx={{
                      display: 'flex',
                      flex: 1,
                      // marginLeft: 'auto',
                      justifyContent: 'flex-end',
                    }}

                    primary = {item.time }
                  />
                </Box>

                <Box
                  sx={{
                    display: 'flex',
                    flex: 1,
                    width: '100%',
                  // mr: 1000,
                  // flexDirection: 'row',
                  }}
                >
                  {console.log(item.title)}
                  <ListItemText
                    primary = {item.title}
                    // aria-label= {item.title}
                    // primaryTypographyProps = {{
                    //   variant: 'subtitle1',
                    //   style: {
                    //     fontWeight: ((item.read) ? 'normal' : 'bold'),
                    //   // fontStyle: 'italic',
                    //   },
                    // }}
                  />
                </Box>
                <ListItemText
                  primary = {item.description}
                  sx={{
                  }}
                  primaryTypographyProps = {{
                    variant: 'subtitle2',
                    style: {
                      color: 'gray',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      WebkitLineClamp: '1',
                      WebkitBoxOrient: 'vertical',
                    },
                  }}
                />
              </Box>
            </ListItemButton>
          </ListItem>

          ))}
        </List>
      </Box>
    </Box>
  );
}

export default EventList;
