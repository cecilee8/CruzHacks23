import React from 'react';
import {useNavigate} from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
// import Link from '@mui/material/Link';
// import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';
// https://mui.com/material-ui/getting-started/templates/ sign in template
const theme = createTheme();
/**
 * @return {object} JSX Table
 */
function Login() {
  const [user, setUser] = React.useState({email: '', password: ''});
  const history = useNavigate();

  const handleInputChange = (event) => {
    const {value, name} = event.target;
    const u = user;
    u[name] = value;
    setUser(u);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    fetch('http://localhost:3010/v0/login', {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw res;
        }
        return res.json();
      })
      .then((json) => {
        localStorage.setItem('user', JSON.stringify(json));
        history('/');
      })
      .catch((err) => {
        console.log('hello');
        // if (err.status === 401) {
        // console.log('wrong password');
        alert('Username or password incorrect');
        // } else {
        //   console.log('unexpected error');
        //   alert('Unexpected Error logging in, please try again');
        // }
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={onSubmit} sx={{mt: 1}}>
            <TextField
              margin="normal"
              // required
              fullWidth
              // id="email"
              label="Email Address"
              name="email"
              type="email"
              // autoComplete="email"
              autoFocus
              onChange={handleInputChange}
            />
            <TextField
              margin="normal"
              // required
              fullWidth
              name="password"
              label="Password"
              type="password"
              // id="password"
              // autoComplete="current-password"
              onChange={handleInputChange}
            />
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
            <Button
              // onClick={onSubmit}
              aria-label='login'
              type="submit"
              fullWidth
              variant="contained"
              sx={{mt: 3, mb: 2}}
            >
              Sign In
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
    // <form onSubmit={onSubmit}>
    //   <h2 id='welcome'>Login</h2>
    //   <input
    //     type="email"
    //     name="email"
    //     placeholder="EMail"
    //     aria-label='Email Address'
    //     onChange={handleInputChange}
    //     required
    //   />
    //   <input
    //     type="password"
    //     name="password"
    //     placeholder="Password"
    //     aria-label='Password'
    //     onChange={handleInputChange}
    //     required
    //   />
    //   <input aria-label='login' type="submit" value="Sign In"/>
    // </form>
  );
}

export default Login;