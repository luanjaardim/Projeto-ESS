import { useState } from "react";

import { Snackbar } from "@mui/material";
import Slide, { SlideProps } from "@mui/material/Slide";
import Alert from "@mui/material/Alert";

import styles from "./index.module.css";
import IconButton from "../../../../shared/components/IconButton";
import CheckIcon from "../../../../shared/assets/whiteCheck.svg";
import Modal from "../../components/LoginSucceededModal";

const RestaurantRegistration = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);

  const handleSnackbarClose = () => {
    setIsSnackbarOpen(false);
  };

  return (
    <div className={styles.pageWrapper}>
      {isModalOpen && <Modal setIsOpen={setIsModalOpen} />}
      <form
        action=""
        className={styles.registrationForm}
        onSubmit={(e) => {
          setIsSnackbarOpen(true);
          e.preventDefault();
        }}
      >
        <input type="text" placeholder="Nome" className={styles.formField} />
        <input type="text" placeholder="E-mail" className={styles.formField} />
        <input type="text" placeholder="CNPJ" className={styles.formField} />
        <input
          type="password"
          placeholder="Senha"
          className={styles.formField}
        />
        <IconButton
          icon={CheckIcon}
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
  );
};

export default RestaurantRegistration;
