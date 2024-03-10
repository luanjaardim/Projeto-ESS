import { useState, useContext, useEffect } from "react";

import { UserContext } from "../../../../Provider";

import { FaRegTrashAlt } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { FaSave } from "react-icons/fa";

import { Snackbar } from "@mui/material";
import Slide from "@mui/material/Slide";
import Alert from "@mui/material/Alert";

import IconButton from "../../../../shared/components/IconButton";
import styles from "./index.module.css";
import Modal from "../../components/AlertModal";

import APIService from "../../../../shared/components/APIService";
import { useNavigate } from "react-router-dom";

const RestaurantProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedData, setEditedData] = useState({});
  const { user, setUserContext } = useContext<any>(UserContext);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isCNPJValid, setIsCNPJValid] = useState(true);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("Erro!");
  const [snackBarSeverity, setSnackBarSeverity] = useState<any>("error");
  const api = new APIService();

  useEffect(() => {
    //TODO: Remove this mock
    console.log(user);
    // setUserContext({
    //   id: "1",
    //   name: "Luquinhas",
    //   email: "quentinhas@gmail.com",
    //   cnpj: "24.134.488/0001-08",
    // });
  }, []);

  const handleToggleEdit = () => {
    if (isEditing) {
      api
        .updateRestaurant(parseInt(user.id), editedData)
        .then((response) => {
          console.log(response);
          setEditedData({});
          setSnackbarMessage(response.data.message);
          setSnackBarSeverity("success");
          setIsSnackbarOpen(true);
          // setUserContext({ ...user, ...editedData });
        })
        .catch((error) => {
          setSnackbarMessage(error.response.data.message);
          setSnackBarSeverity("error");
          setIsSnackbarOpen(true);
          setIsEditing(true);
          return;
        });
    }

    setIsEditing(!isEditing);
  };

  const navigate = useNavigate();

  const handleConfirmDelete = () => {
    console.log("Excluir restaurante");
    console.log(user);
    if (user) {
      api.deleteRestaurant(parseInt(user.id)).then((response) => {
        console.log(response);
        navigate("/restaurant/registration");
      });
    }
  };

  const handleFieldEdition = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedData({ ...editedData, [name]: e.target.value });

    if (name === "email") {
      const emailRegex = /[^@\s]+@[^@\s]+\.[^@\s]+/;
      setIsEmailValid(emailRegex.test(value));
    }

    if (name === "CNPJ") {
      const cnpjRegex = /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/;
      setIsCNPJValid(cnpjRegex.test(value));
    }
  };

  const handleSnackbarClose = () => {
    setIsSnackbarOpen(false);
  };

  return (
    <>
      {isModalOpen && (
        <Modal
          setIsOpen={setIsModalOpen}
          title="Excluir restaurante"
          modalBody="Tem certeza que deseja excluir o restaurante? Todos os dados cadastrados serão excluídos permanentemente"
          leftButton={{
            backgroundColor: "rgb(0,0,0,0.2)",
            color: "black",
            text: "Cancelar",
            callback: () => {},
          }}
          rightButton={{
            backgroundColor: "#FD3939",
            color: "white",
            text: "Excluir",
            callback: handleConfirmDelete,
          }}
        />
      )}
      <h1 className={styles.title}>Meu perfil</h1>
      <div className={styles.pageWrapper}>
        <div className={styles.profileDataContainer}>
          <IconButton
            icon={isEditing ? FaSave : MdEdit}
            color={isEditing ? "#54b544" : "#251fa5"}
            text={isEditing ? "Salvar" : "Editar dados"}
            disabled={!(isCNPJValid && isEmailValid)}
            type="button"
            id={isEditing ? "salvar" : "editar"}
            onClick={handleToggleEdit}
          />
          <input
            type="text"
            name="name"
            id="nome"
            placeholder={user?.name || "Nome do restaurante"}
            className={styles.formField}
            disabled={!isEditing}
            onChange={handleFieldEdition}
          />
          <input
            type="text"
            name="email"
            id="email"
            placeholder={user?.email || "Email"}
            className={styles.formField}
            disabled={!isEditing}
            onChange={handleFieldEdition}
            pattern="[^@\s]+@[^@\s]+\.[^@\s]+"
          />
          <input
            type="text"
            name="CNPJ"
            id="CNPJ"
            placeholder={user?.cnpj || "CNPJ"}
            className={styles.formField}
            disabled={!isEditing}
            onChange={handleFieldEdition}
            pattern="\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}"
          />
          <IconButton
            icon={FaRegTrashAlt}
            color={isEditing ? "rgb(0,0,0,0.2)" : "#FD3939"}
            text="Excluir restaurante"
            type="button"
            onClick={() => setIsModalOpen(true)}
            disabled={isEditing}
            id="excluir"
          />
        </div>
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
          severity={snackBarSeverity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default RestaurantProfilePage;
