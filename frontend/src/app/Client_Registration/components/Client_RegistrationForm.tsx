import styles from './RegistrationForms.module.css'
import Input from './form/input'
import SubmitButton from './form/submitButton'
import { useState } from 'react';
import APIService from '../../../shared/components/APIService/index';
import Modal from './alert_modal/';



interface Client {

  password: string;
  name: string;
  cpf: string;
  email: String;
  address: string;
}


const Client_RegistrationForm = ({btnText}) => {
  

  //const ClientRegistration = () => {
    const api = new APIService();
    //const [isModalOpen, setIsModalOpen] = useState(false);
    //const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
    const [clientData, setClientData] = useState<Client>({
      name: "",
      address: "",
      cpf: "",
      email: "",
      password: "",

    });
    //const [snackbarMessage, setSnackbarMessage] = useState<string>("Erro!");
    //const [isEmailValid, setIsEmailValid] = useState(true);
    //const [isCPFValid, setIsCPFValid] = useState(true);
  
//    const handleSnackbarClose = () => {
//      setIsSnackbarOpen(false);
//    };
  
    const handleFormFieldChange = (event) => {
      const { name, value } = event.target;
      console.log('entrou');
      setClientData({ ...clientData, [name]: value });
  
  //    if (name === "email") {
   //     const emailRegex = /[^@\s]+@[^@\s]+\.[^@\s]+/;
   //     setIsEmailValid(emailRegex.test(value));
   //   }
  
 //     if (name === "cpf") {
  //      const cpfRegex = /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/;
   //     setIsCPFValid(cpfRegex.test(value));
    //  }
    };
  
    const handleFormSubmit = async (e) => {
      e.preventDefault();
      console.log('entrei');
      if (
        clientData.name === "" ||
        clientData.email === "" ||
        clientData.cpf === "" ||
        clientData.password === "" ||
        clientData.address === ""
      ) {
        //setSnackbarMessage("Todos os campos devem ser preenchidos!");
        //setIsSnackbarOpen(true);
        return;
      }
  
      console.log(clientData);
      api.createClient(clientData)
        .then((response) => {
          console.log("Cadastro realizado com sucesso");
        })
        .catch((error) => {
          //setIsSnackbarOpen(true);
          //setSnackbarMessage(error.response.data.message);
          console.log(error.response.data.message);
               });
                
    };


  return (
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
         // pattern="d{3}\.\d{3}\.\d{3}-\d{2}"     
          />
      
      <label htmlFor='email'>E-mail</label>
          <input
            type="text"
            placeholder="E-mail"
            name="email"
            className={styles.form}
            onChange={handleFormFieldChange}
            //pattern="[^@\s]+@[^@\s]+\.[^@\s]+"  
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
  )
}


export default Client_RegistrationForm
