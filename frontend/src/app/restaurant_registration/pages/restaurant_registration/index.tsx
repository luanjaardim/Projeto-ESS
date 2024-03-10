import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Snackbar } from "@mui/material";
import Slide from "@mui/material/Slide";
import Alert from "@mui/material/Alert";

import { FaCheck } from "react-icons/fa6";
import { FiCheckCircle } from "react-icons/fi";

import styles from "./index.module.css";
import IconButton from "../../../../shared/components/IconButton";
import Modal from "../../components/AlertModal";

import APIService from "../../../../shared/components/APIService";

interface Restaurant {
  name: string;
  email: String;
  CNPJ: string;
  password: string;
}

const RestaurantRegistration = () => {
  const api = new APIService();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [restaurantData, setRestaurantData] = useState<Restaurant>({
    name: "",
    email: "",
    CNPJ: "",
    password: "",
  });
  const [snackbarMessage, setSnackbarMessage] = useState<string>("Erro!");
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isCNPJValid, setIsCNPJValid] = useState(true);
  const navigate = useNavigate();

  const handleSnackbarClose = () => {
    setIsSnackbarOpen(false);
  };

  const handleFormFieldChange = (event) => {
    const { name, value } = event.target;
    setRestaurantData({ ...restaurantData, [name]: value });

    if (name === "email") {
      const emailRegex = /[^@\s]+@[^@\s]+\.[^@\s]+/;
      setIsEmailValid(emailRegex.test(value));
    }

    if (name === "CNPJ") {
      const cnpjRegex = /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/;
      setIsCNPJValid(cnpjRegex.test(value));
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (
      restaurantData.name === "" ||
      restaurantData.email === "" ||
      restaurantData.CNPJ === "" ||
      restaurantData.password === ""
    ) {
      setSnackbarMessage("Todos os campos devem ser preenchidos!");
      setIsSnackbarOpen(true);
      return;
    }

    console.log(restaurantData);
    api
      .createRestaurant(restaurantData)
      .then((response) => {
        setIsModalOpen(true);
      })
      .catch((error) => {
        setIsSnackbarOpen(true);
        setSnackbarMessage(error.response.data.message);
        console.log(error.response.data.message);
      });
  };

  return (
    <>
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
              callback: () => {
                navigate("/restaurants/login");
              },
            }}
          />
        )}
        <form
          action=""
          className={styles.registrationForm}
          onSubmit={handleFormSubmit}
        >
          <input
            type="text"
            placeholder="Nome"
            name="name"
            id="nome"
            className={styles.formField}
            onChange={handleFormFieldChange}
          />
          <input
            type="text"
            placeholder="E-mail"
            name="email"
            id="email"
            className={styles.formField}
            onChange={handleFormFieldChange}
            pattern="[^@\s]+@[^@\s]+\.[^@\s]+"
          />
          <input
            type="text"
            placeholder="CNPJ"
            name="CNPJ"
            id="CNPJ"
            className={styles.formField}
            onChange={handleFormFieldChange}
            pattern="\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}"
          />
          <input
            type="password"
            placeholder="Senha"
            name="password"
            id="senha"
            className={styles.formField}
            onChange={handleFormFieldChange}
          />
          <IconButton
            icon={FaCheck}
            color={
              !(isCNPJValid && isEmailValid) ? "rgb(0,0,0,0.2)" : "#54b544"
            }
            text="Cadastrar"
            type="submit"
            id="cadastrar"
            disabled={!(isCNPJValid && isEmailValid)}
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
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </div>
    </>
  );
};

export default RestaurantRegistration;
