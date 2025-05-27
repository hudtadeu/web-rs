import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: "'Poppins', sans-serif", // Fonte padrão para todo o projeto
    fontSize: 14, // Tamanho padrão do texto
    h1: {
      fontSize: "2.25rem", // Tamanho para títulos H1
      fontWeight: 700,
    },
    h2: {
      fontSize: "1.75rem",
      fontWeight: 600,
    },
    body1: {
      fontSize: "1rem", // Texto padrão (parágrafos)
      lineHeight: 1.5,
    },
    body2: {
      fontSize: "0.875rem", // Texto menor
    },
    button: {
      textTransform: "none", // Remove letras maiúsculas dos botões
      fontSize: "0.875rem",
      fontWeight: 500,
    },
  },
  palette: {
    primary: {
      main: "#0098c9", // Cor primária
    },
    secondary: {
      main: "#0078a3", // Cor secundária
    },
    text: {
      primary: "#333", // Cor padrão do texto
      secondary: "#555",
    },
  },
});

export default theme;
