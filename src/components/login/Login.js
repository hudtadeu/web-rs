import React, { useState, useRef } from "react";
import { Box, Card, CardContent, Typography, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const passwordRef = useRef(null);
  const navigate = useNavigate();

  const handleKeyDown = (e, ref) => {
    if (e.key === "Enter") {
      e.preventDefault(); 
      if (ref?.current) {
        ref.current.focus(); 
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (username === "admin" && password === "admin") {
      localStorage.setItem('isAuthenticated', 'true');
      onLogin(); 
      navigate("/dashboard"); // Redireciona para o Dashboard após login
    } else {
      setError("Usuário ou senha inválidos.");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#fff",
        backgroundImage: "url('/path-to-background-image.png')", 
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Card
        sx={{
          padding: 4,
          maxWidth: "400px",
          width: "100%",
          boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)",
          borderRadius: "12px",
          textAlign: "center",
          backgroundColor: "#ffffff",
        }}
      >
        <img
          src="logo-rsdata.png"
          alt="Logo RSData"
          style={{
            width: "150px",
            marginBottom: "20px",
          }}
        />
        <CardContent>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: "600", color: "#333" }}>
            Bem-vindo ao RSData
          </Typography>
          <Typography variant="body2" gutterBottom sx={{ color: "#666", mb: 3 }}>
            Faça login para continuar
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Username"
              variant="outlined"
              margin="normal"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, passwordRef)} 
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "8px",
                  "& fieldset": { borderColor: "#ccc" },
                  "&:hover fieldset": { borderColor: "#0078a3" },
                  "&.Mui-focused fieldset": { borderColor: "#0098c9" },
                },
              }}
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              variant="outlined"
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSubmit(e); 
                }
              }}
              inputRef={passwordRef}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "8px",
                  "& fieldset": { borderColor: "#ccc" },
                  "&:hover fieldset": { borderColor: "#0078a3" },
                  "&.Mui-focused fieldset": { borderColor: "#0098c9" },
                },
              }}
            />
            {error && (
              <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                {error}
              </Typography>
            )}
            <Button
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                backgroundColor: "#0098c9",
                color: "#fff",
                padding: "10px 16px",
                borderRadius: "8px",
                fontWeight: "600",
                "&:hover": {
                  backgroundColor: "#0078a3",
                },
              }}
              type="submit"
            >
              Entrar
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Login;
