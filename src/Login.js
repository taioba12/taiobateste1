import React, { useState } from 'react';
import { Button, TextField, Paper } from '@mui/material';
import './Login.css';

function Login({ setIsLoggedIn }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    if (username === 'admin' && password === 'admin') {
      setIsLoggedIn(true);
    }
  };

  return (
    <div className="loginContainer">
      <Paper elevation={3} className="loginBox">
        <TextField label="Username" variant="outlined" onChange={e => setUsername(e.target.value)} />
        <TextField label="Password" variant="outlined" type="password" onChange={e => setPassword(e.target.value)} />
        <Button variant="contained" onClick={handleSubmit}>
          Login
        </Button>
      </Paper>
    </div>
  );
}

export default Login;
