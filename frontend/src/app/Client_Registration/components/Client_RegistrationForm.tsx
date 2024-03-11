import styles from './RegistrationForms.module.css'
import Input from './form/input'
import SubmitButton from './form/submitButton'
import { useState } from 'react';
import APIService from '../../../shared/components/APIService/index';
import Modal from '../../restaurant_registration/components/AlertModal'
import { Snackbar } from "@mui/material";
import { useNavigate } from 'react-router-dom';


interface Client {

  password: string;
  name: string;
  cpf: string;
  email: String;
  address: string;
}


const Client_RegistrationForm = ({btnText}) => {
  

    const api = new APIService();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpen2, setIsModalOpen2] = useState(false);
    const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
    const [clientData, setClientData] = useState<Client>({
      name: "",
      address: "",
      cpf: "",
      email: "",
      password: "",

    });
    const navigate = useNavigate();
    const handleFormFieldChange = (event) => {
      const { name, value } = event.target;
      console.log('entrou');
      setClientData({ ...clientData, [name]: value });
  
    };
  
    const handleFormSubmit = async (e) => {
      e.preventDefault();
      if (
        clientData.name === "" ||
        clientData.email === "" ||
        clientData.cpf === "" ||
        clientData.password === "" ||
        clientData.address === ""
      ) {

        return;
      }
  
      console.log(clientData);
      api.createClient(clientData)
      .then((response) => {
        setIsModalOpen(true);
        console.log('entrei');
      })
      .catch((error) => {
        setIsModalOpen2(true)
        console.log(error.response.data.message);
      });
         
    };


  return (
    
    <>
    <div className={styles.fundao}>
    {isModalOpen && (
      <Modal
        setIsOpen={setIsModalOpen}
        title="User Criado "
        modalBody="Cliente cadastrado"
        leftButton={{
          backgroundColor: "rgb(0,0,0,0.2)",
          color: "black",
          text: "Ok",
          callback: () => {
            navigate("/clients/login");
          },
        }}
      />
    )}

  {isModalOpen2 && (
      <Modal
        setIsOpen={setIsModalOpen2}
        title="Erro"
        modalBody="Cliente já cadastrado"
        leftButton={{
          backgroundColor: "rgb(0,0,0,0.2)",
          color: "black",
          text: "Ok",
          callback: () => {
            navigate("/clients/registration");
          },
        }}
      />
    )}

    <form className={styles.form_control}
      action=""
      onSubmit={handleFormSubmit}
    >
    <div className={styles.questions}>
      <div className={styles.questionsleft}>
        <label htmlFor='name'>Name</label>
          <input
            type="text"
            placeholder="Nome"
            name="name"
            className={styles.form}
            onChange={handleFormFieldChange}    
          />
        <label htmlFor='cpf'>CPF</label>
          <input
            type="text"
            name="cpf"
            className={styles.form}
            onChange={handleFormFieldChange}
          placeholder= "Insira seu CPF"   
          />
      
      <label htmlFor='email'>E-mail</label>
          <input
            type="text"
            placeholder="E-mail"
            name="email"
            className={styles.form}
            onChange={handleFormFieldChange}  
          />
      </div>    
        <div>
        <label htmlFor='address'>Endereço</label>
        <input
        type="text"
        placeholder= "Insira seu Endereço" 
        name ="address"
        className={styles.form}
        onChange={handleFormFieldChange}           
        />
        
        <label htmlFor='password'>Senha</label>
        <input
            type="password"
            placeholder="Senha"
            name="password"
            className={styles.form}
            onChange={handleFormFieldChange}   
        />
        </div>

      </div>
      <div className={styles.botao}>
        <SubmitButton text={btnText} />
      </div>
      
    </form>
    </div>
    </>
  )
}


export default Client_RegistrationForm
