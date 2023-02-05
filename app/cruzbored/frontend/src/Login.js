
import React from 'react';
import './App.css';
import LogoutIcon from '@mui/icons-material/Logout';
import IconButton from '@mui/material/IconButton';
import Cookies from 'js-cookie';
import Box from '@mui/material/Box';

var google;

function Login() {
  const [session, setSession] = React.useState(Cookies.get("userId"));
  const divRef = React.useRef(null);

  React.useEffect(() => {
    if (divRef.current && google) {
      console.log("rendering");
      google.accounts.id.renderButton(divRef.current, {
        theme: 'filled_blue',
        size: 'medium',
        type: 'standard',
        text: 'continue_with',
      });
    }
  }, [divRef.current]);

  // React.useEffect(() => {
  //   fetchEvents('Main', setEvent);
  // }, []);
  // const session = Cookies.get("userId");
  const logout = () => {
    console.log('logging out');
    fetch('http://localhost:8080/api/logout', {
    method: 'GET',
    headers: new Headers({
      'Content-Type': 'applicaton/x-www-form-urlencoded',
    }),
  })
    .then((response) => {
      console.log(response);
         return response.json();
    })
    .then((json) => {
      if (!json.ok) {
        throw json;
      }
      setSession(undefined);
    })
  };
  return (
    <div>
      <div style={{ display: session ? "inline-block" : "none" }}>
        <IconButton onClick={logout}>
          <LogoutIcon />
        </IconButton>
      </div>
      <div style={{ display: session ? "none" : "inline-block" }}>
        <div id="g_id_onload"
            data-client_id="1056207747085-pu7fir7t5q7c4g7k0fq2ss8a6jh9ke0t.apps.googleusercontent.com"
            data-context="signin"
            data-ux_mode="popup"
            data-login_uri="http://localhost:8080/oauth2"
            data-auto_prompt="false">
        </div>

        <div class="g_id_signin"
            data-type="standard"
            data-shape="pill"
            data-theme="outline"
            data-text="signin_with"
            data-size="large"
            data-logo_alignment="left">
        </div>
      </div>
    </div>
  );
}

export default Login;