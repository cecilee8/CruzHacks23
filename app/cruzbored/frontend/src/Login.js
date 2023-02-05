

import React from 'react';
import './App.css';


function Login() {
  return (
    <div className="App">
      <script src="https://accounts.google.com/gsi/client" async defer></script>
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
  );
}

export default Login;