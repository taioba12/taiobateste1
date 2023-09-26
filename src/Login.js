import React, { useState, useEffect, useCallback } from 'react';
import { Button, TextField, Paper, Typography } from '@mui/material';
import './Login.css';

function Login({ setIsLoggedIn }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [incorrectPassword, setIncorrectPassword] = useState(false); // Estado para controlar o aviso

  // Use useCallback para memoizar a função handleSubmit
  const handleSubmit = useCallback(() => {
    if (username === 'admin' && password === 'admin') {
      setIsLoggedIn(true);
    } else {
      setIncorrectPassword(true); // Define o aviso como verdadeiro se as credenciais estiverem incorretas
    }
  }, [username, password, setIsLoggedIn]);

  // Adicione um evento de teclado para detectar a tecla "Enter"
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === 'Enter') {
        handleSubmit(); // Chame a função handleSubmit ao pressionar "Enter"
      }
    };

    // Adicione o ouvinte de evento de teclado ao campo de senha
    document.addEventListener('keydown', handleKeyPress);

    // Remova o ouvinte de evento quando o componente for desmontado
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleSubmit]); // Inclua handleSubmit no array de dependências

  return (
    <div className="loginContainer">
      <Paper elevation={3} className="loginBox">
        <TextField label="Username" variant="outlined" onChange={e => setUsername(e.target.value)} />
        <TextField label="Password" variant="outlined" type="password" onChange={e => setPassword(e.target.value)} />
        <Button variant="contained" onClick={handleSubmit}>
          Login
        </Button>
        {incorrectPassword && <Typography color="error">Senha incorreta</Typography>} {/* Renderiza o aviso */}
      </Paper>
    </div>
  );
}

export default Login;
