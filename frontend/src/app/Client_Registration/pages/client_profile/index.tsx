//import APIService from '../../../../shared/components/APIService/index';
//import { useEffect, useState } from 'react';
//import { useContext } from 'react';
import styles from './index.module.css'
import Input from '../../components/form/input';
import SubmitButton from '../../components/form/submitButton';
import DeleteButton from '../../components/form/deleteButton'
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../../../Provider';
import APIService from '../../../../shared/components/APIService';
import { useNavigate } from 'react-router-dom';
import IconButton from '../../../../shared/components/IconButton';
import { FaRegTrashAlt, FaSave } from 'react-icons/fa';
import { MdEdit } from 'react-icons/md';
import  Modal from '../../components/alert_modal'

const client_profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedData, setEditedData] = useState({});
  const { user, setUserContext } = useContext<any>(UserContext);
  //const [isEmailValid, setIsEmailValid] = useState(true);
  //const [isCPFValid, setIsCPFValid] = useState(true);
  //const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  //const [snackbarMessage, setSnackbarMessage] = useState<string>("Erro!");
  //const [snackBarSeverity, setSnackBarSeverity] = useState<any>("error");
  const api = new APIService();

  useEffect(() => {
    setUserContext({
      id: "1",
      name: "Joao",
      email: "user1@gmail.com",
      cpf: "123.865.154-87",
    });
  }, []);

  const handleToggleEdit = () => {
    if (isEditing) {
      api
        .updateClient(parseInt(user.id), editedData)
        .then((response) => {
          console.log(response);
          setEditedData({});
          //setSnackbarMessage(response.data.message);
          //setSnackBarSeverity("success");
          //setIsSnackbarOpen(true);
           setUserContext({ ...user, ...editedData });
        })
        .catch((error) => {
          //setSnackbarMessage(error.response.data.message);
          //setSnackBarSeverity("error");
          //setIsSnackbarOpen(true);
          setIsEditing(true);
          console.log(error.response.data.message);
          return;
        });
    }

    setIsEditing(!isEditing);
  };

  const navigate = useNavigate();

  const handleConfirmDelete = () => {
    console.log("Excluir usuário");
    console.log(user);
    if (user) {
      api.deleteClient(parseInt(user.id)).then((response) => {
        console.log(response);
        navigate("/client/registration");
      });
    }
  };

  const handleFieldEdition = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedData({ ...editedData, [name]: e.target.value });

 //   if (name === "email") {
 //     const emailRegex = /[^@\s]+@[^@\s]+\.[^@\s]+/;
  //    setIsEmailValid(emailRegex.test(value));
  //  }

 //   if (name === "CNPJ") {
 //     const cnpjRegex = /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/;
  //    setIsCNPJValid(cnpjRegex.test(value));
 //   }
  };

  //const handleSnackbarClose = () => {
 //   setIsSnackbarOpen(false);
 // };

    return (
      <>
      {isModalOpen && (
        <Modal
          setIsOpen={setIsModalOpen}
          title="Excluir uusário"
          modalBody="Tem certeza que deseja excluir a conta? Todos os dados cadastrados serão excluídos permanentemente"
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
        <div className={styles.index_container}>
          <div>
            <h1>Perfil do Usuário</h1>

            <div className={styles.index_forms}>
              <Input
                type="text"
                text="Nome"
                name="name"
                id='name'
                placeholder={user?.name || "Nome do restaurante"}
                disabled={!isEditing}
                onChange={handleFieldEdition} />
              <Input
                type="text"
                text="CPF"
                name="cpf"
                id='cpf'
                placeholder={user?.cpf || "CPF"}
                disabled={!isEditing}
                onChange={handleFieldEdition} />


              <Input
                type="text"
                text="E-mail"
                name="email"
                id='email'
                placeholder={user?.email || "E-mail"}
                disabled={!isEditing}
                onChange={handleFieldEdition} />

              <IconButton
                icon={isEditing ? FaSave : MdEdit}
                text={isEditing ? "Salvar" : "Editar dados"}
                color={isEditing ? "#54b544" : "#251fa5"}
                id={isEditing ? "salvar" : "editar"}
                type='button'
                onClick={handleToggleEdit} />

              <IconButton
                icon={FaRegTrashAlt}
                color={isEditing ? "rgb(0,0,0,0.2)" : "#FD3939"}
                text="Excluir restaurante"
                type="button"
                onClick={() => setIsModalOpen(true)}
                disabled={isEditing}
                id="excluir" />

            </div>
          </div>
        </div>
        
       </>
    );
};

export default client_profile;
