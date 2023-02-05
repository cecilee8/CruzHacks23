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
import Paper from "@mui/material/Paper";
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';


const Transition = React.forwardRef(function Transition(
  props,
  ref,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});
// import Divider from '@mui/material/Divider';



const fetchEvents = (category, setEvent) => {
  // const user = JSON.parse(localStoage.getItem('user'));
  fetch('/api/posts', {
    method: 'GET',
    headers: new Headers({
      // 'Authorization': `Bearer ${???}`,
      'Content-Type': 'applicaton/x-www-form-urlencoded',
    }),
  })
    .then((response) => {
      console.log(response);
   
      // console.log('user: ' + user.name);
      return response.json();
    })
    .then((json) => {
      if (!json.ok) {
        throw json;
      }
      console.log('marker111')
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
  const [open, setOpen] = React.useState(false);
  const [newpost, setNew] = React.useState({"title":'', "description": ''})
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleInputChange = (event) => {
    const {value, name} = event.target;
    const u = newpost;
    u[name] = value;
    // console.log(u);
    setNew(u);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = (event) => {
    event.preventDefault();

    fetch('/api/post', {
      method: 'POST',
      body: "title=" + encodeURIComponent(newpost.title) + "&description=" + encodeURIComponent(newpost.description),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      },
    })
      .then((res) => {
        console.log(res);
        if (!res.ok) {
          console.log('not okay');
          throw res;
        }
        return res.json();
      })
      .then(() => {
        fetchEvents('Main', setEvent);
      })
      .catch((err) => {
        console.log('hello');
        
      });
      // .then((json) => {
      //   localStorage.setItem('user', JSON.stringify(json));
      //   history('/');
      // })
      console.log(newpost);
  }
  // const post = () => {
  //   localStorage.removeItem('user');
  //   // setName('');
  //   // setError('Logged Out');
  //   navigate('/login');
  // };
  // const user = JSON.parse(localStorage.getItem('user'));
  const [event, setEvent] = React.useState([]);
  const [category, setCategory] = React.useState('Main');
  const [loggedIn, log] = React.useState();
  React.useEffect(() => {
    fetchEvents('Main', setEvent);
  }, []);
  // React.useEffect(() => {
  //   ;
  // }, Boolean);
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
        <List sx={{
                display: "flex",
                alignContent: "space-evenly",
                flexWrap: "wrap",
                flexDirection: "row",
              }} >
          {(event)?.map((item) => (
            <Box
              sx={{
                marginLeft: 10,
                display: "flex",
                alignContent: "space-evenly",
                flexWrap: "wrap",
                flexDirection: "row",
              }}>
            <ListItem disablePadding key={item.id}
            // divider={true}
          >
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  "& > :not(style)": {
                    m: 1,
                    width: 312,
                    height: 352
                  }
                }}
              >
                <Paper elevation={3} >
                  
              <Toolbar  sx={{
              display: 'flex',
              flex: 1,
              backgroundColor: '#FAFAFA',
              color: '#3CB8A1'
              // marginLeft: 'auto',
            }}>
            
            <Typography variant = 'h5' noWrap component ='div'
            sx={{
              display: 'flex',
              flex: 1,
              // marginLeft: 'auto',
              justifyContent:'center',
            }}>
              {item.title}
            </Typography>

          </Toolbar>
          <Box
                    component="img"
 
            sx={{
              display: 'flex',
              flex: 1,
              marginLeft: 'auto',
              marginRight: 'auto',
              width: '100%',
              height: 'auto',
              maxHeight: '65%'
            }}
            src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2"
            />
                  <ListItemText
                      sx={{
                        display: 'flex',
                        flex: 1,
                        // marginLeft: 'auto',
                        justifyContent: 'flex-end',
                      }}
                      primary = { new Date(item.time * 1000).toLocaleString() }
                    />
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
                </Paper>
              </Box>
        </ListItem>
        </Box>

          ))}
        </List>
      </Box>
      <Fab color="primary" aria-label="add"
        onClick={handleClickOpen}
        sx={{
          margin: 0,
          top: 'auto',
          right: 20,
          bottom: 20,
          left: 'auto',
          position: 'fixed',
        }}>
        <AddIcon />
      </Fab>
      <div>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
        component="form"
          onSubmit={onSubmit}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Sound
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose} type = "submit">
              save
            </Button>
          </Toolbar>
        </AppBar>
        {/* <List> */}
          <Box
          onSubmit={onSubmit}
          sx={{
            '& .MuiTextField-root': { m: 1, width: '25ch' },
          }}
          >
            <TextField
          id="title"
          label="title"
          name = "title"
          type = "title"
          onChange={handleInputChange}

        />
        <TextField
          id="description"
          label="description"
          name="description"
              type="description"
          onChange={handleInputChange}

        />

          </Box>
          {/* <ListItem button>
            <ListItemText primary="Phone ringtone" secondary="Titania" />
          </ListItem> */}
          <Divider />
          {/* <ListItem button> */}
            {/* <ListItemText
              primary="Default notification ringtone"
              secondary="Tethys"
            /> */}
          {/* </ListItem> */}
        {/* </List> */}
      </Dialog>
    </div>
    </Box>
  );
}

export default EventList;
