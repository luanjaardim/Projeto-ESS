import { Snackbar } from "@mui/material";
import Slide from "@mui/material/Slide";
import Alert from "@mui/material/Alert";

import APIService from '../../shared/components/APIService/index';
import { useEffect, useState } from 'react';
import { UserContext } from '../../Provider';
import { useContext } from 'react';
import { Link , Navigate } from 'react-router-dom';
//import './styles.css';
import IconButton from "../../shared/components/IconButton";
import { FaCheck } from "react-icons/fa6";

export const RecoverPasswordPage = () => {
  const api = new APIService();
  const [email, setEmail] = useState("");
  const [redirectToHome, setRedirectToHome] = useState(false);
  const [redirectToCode, setRedirectToCode] = useState(false);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("Erro!");


  const handleSnackbarClose = () => {
    setIsSnackbarOpen(false);
  };

  const handlePasswordRecovery = async (email) => {
    if (!email) {
      setSnackbarMessage("O email é obrigatório para recuperar a senha!");
      setIsSnackbarOpen(true);
      return;
    }
  
    try {
      // Call the API endpoint for password recovery
      const response = await api.postPasswordRecovery(email);
      
      // Handle success response
      setSnackbarMessage("Um email de recuperação de senha foi enviado.");
      setIsSnackbarOpen(true);
    } catch (error) {
      // Handle error response
      console.error('Erro ao recuperar senha:', error);
      setSnackbarMessage("Ocorreu um erro ao tentar recuperar a senha. Tente novamente mais tarde.");
      setIsSnackbarOpen(true);
    }
  };

  return (
    <div style={{backgroundColor:"#fff13e", width: "100%", height: "100%"}}>
      <div style={{backgroundColor:"#fff13e", padding: "2rem"}}>
          <Link to = '/*'>
            <button className="backButton">Voltar</button>
          </Link>
      <h1 className="titleLogin">Recuperar Senha</h1>
      </div>
      <div className="containerForm">
      <form className="loginForm">
        <div>
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            className="formFieldLogin"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="containerButtonForm">
        <Link to = '/restaurants/recover/code'>
            <IconButton
            onClick={() => handlePasswordRecovery}
            icon={FaCheck}
            color="#54b544"
            text="Recuperar senha"
            type="submit"
            id="excluir"
  /> 
  </Link>
        </div>
      </form>
      </div>
      <Snackbar
          open={isSnackbarOpen}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          TransitionComponent={(props) => <Slide {...props} direction="up" />}
        >
          <Alert
            onClose={handleSnackbarClose}
            severity="info"
            variant="filled"
            sx={{ width: "100%" }}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
    </div>
  );
};
