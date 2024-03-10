import styles from './RegistrationForms.module.css'
import Input from './form/input'
import SubmitButton from './form/submitButton'
import { useState } from 'react';
import APIService from '../../../shared/components/APIService/index';

const Client_RegistrationForm = ({btnText}) => {
 
  interface Client {
    name: string;
    password: string;
    CPF: string;
    email: String;
    address: string;
  }
  
  //const ClientRegistration = () => {
    const api = new APIService();
    //const [isModalOpen, setIsModalOpen] = useState(false);
    //const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
    const [clientData, setClientData] = useState<Client>({
      name: "",
      address: "",
      CPF: "",
      email: "",
      password: "",

    });
    //const [snackbarMessage, setSnackbarMessage] = useState<string>("Erro!");
    const [isEmailValid, setIsEmailValid] = useState(true);
    const [isCPFValid, setIsCPFValid] = useState(true);
  
//    const handleSnackbarClose = () => {
//      setIsSnackbarOpen(false);
//    };
  
    const handleFormFieldChange = (event) => {
      const { name, value } = event.target;
      setClientData({ ...clientData, [name]: value });
  
      if (name === "email") {
        const emailRegex = /[^@\s]+@[^@\s]+\.[^@\s]+/;
        setIsEmailValid(emailRegex.test(value));
      }
  
      if (name === "CNPJ") {
        const cnpjRegex = /^\d{2}\.\d{3}\.\d{3}\-\d{2}$/;
        setIsCPFValid(cpfRegex.test(value));
      }
    };
  
    const handleFormSubmit = async (e) => {
      e.preventDefault();
  
      if (
        clientData.name === "" ||
        clientData.email === "" ||
        clientData.CPF === "" ||
        clientData.password === "" ||
        clientData.address === ""
      ) {
        //setSnackbarMessage("Todos os campos devem ser preenchidos!");
        //setIsSnackbarOpen(true);
        return;
      }
  
      console.log(clientData);
      api
        .createClients(clientData)
        .then((response) => {
          setIsModalOpen(true);
        })
        .catch((error) => {
          //setIsSnackbarOpen(true);
          //setSnackbarMessage(error.response.data.message);
          console.log(error.response.data.message);
        });
    };


  return (
    <form className={styles.form_control}>
    <div className={styles.questions}>
      <div className={styles.questionsleft}>
        <label htmlFor='name'>Name</label>
          <input
            type="text"
            placeholder="Nome"
            name="name"
            id = "name"
            className={styles.form}
            onChange={handleFormFieldChange}    
          />
        <label htmlFor='CPF'>CPF</label>
          <input
            type="text"
            name="CPF"
            className={styles.form}
            onChange={handleFormFieldChange}
          placeholder= "Insira seu CPF"     
          />
      
      <label htmlFor='email'>E-mail</label>
          <input
            type="text"
            placeholder="E-mail"
            name="email"
            id = "email"
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
        <label htmlFor='confirmpassword'>Confirmar Senha</label>  
        <input
            type="password"
            placeholder="Senha"
            name="confirmpassword"
            className={styles.form}
            onChange={handleFormFieldChange}    
        /> 
        </div>

      </div>
      <div className={styles.botao}>
        <SubmitButton text={btnText} />
      </div>
      
      
    </form>
  )
}


export default Client_RegistrationForm
