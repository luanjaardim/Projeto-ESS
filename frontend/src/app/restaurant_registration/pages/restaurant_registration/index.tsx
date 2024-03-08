import { useState } from "react";

import { Helmet } from "react-helmet";

import { Snackbar } from "@mui/material";
import Slide from "@mui/material/Slide";
import Alert from "@mui/material/Alert";

import { FaCheck } from "react-icons/fa6";

import styles from "./index.module.css";
import IconButton from "../../../../shared/components/IconButton";
import { FiCheckCircle } from "react-icons/fi";
import Modal from "../../components/AlertModal";

const RestaurantRegistration = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);

  const handleSnackbarClose = () => {
    setIsSnackbarOpen(false);
  };

  return (
    <>
      <Helmet>
        <title>Cadastrar restaurante - iBreno ;)</title>
      </Helmet>
      <h1 className={styles.title}>Cadastre seu restaurante</h1>
      <div className={styles.pageWrapper}>
        {isModalOpen && (
          <Modal
            title="Cadastro realizado com sucesso"
            setIsOpen={setIsModalOpen}
            modalBody={FiCheckCircle}
            bodyStyle={{ color: "#54b544", width: "50px", height: "50px" }}
            leftButton={{
              color: "white",
              backgroundColor: "#54b544",
              text: "Fazer login",
              callback: () => {},
            }}
          />
        )}
        <form
          action=""
          className={styles.registrationForm}
          onSubmit={(e) => {
            setIsModalOpen(true);
            e.preventDefault();
          }}
        >
          <input type="text" placeholder="Nome" className={styles.formField} />
          <input
            type="text"
            placeholder="E-mail"
            className={styles.formField}
          />
          <input type="text" placeholder="CNPJ" className={styles.formField} />
          <input
            type="password"
            placeholder="Senha"
            className={styles.formField}
          />
          <IconButton
            icon={FaCheck}
            color="#54b544"
            text="Cadastrar"
            type="submit"
          />
        </form>

        <Snackbar
          open={isSnackbarOpen}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          TransitionComponent={(props) => <Slide {...props} direction="up" />}
        >
          <Alert
            onClose={handleSnackbarClose}
            severity="error"
            variant="filled"
            sx={{ width: "100%" }}
          >
            Erro! Restaurante já cadastrado
          </Alert>
        </Snackbar>
      </div>
    </>
  );
};

export default RestaurantRegistration;
