import styles from './RegistrationForms.module.css'
import Input from './form/input'
import SubmitButton from './form/submitButton'
import { useState } from 'react';
import APIService from '../../../shared/components/APIService/index';

function Client_RegistrationForm({btnText}){
  const [formData, setFormData] = useState({
    name: '',
    CPF: '',
    email: '',
    address: '',
    password: '',
    confirmPassword: ''
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const clientData = {
        password: formData.password,
        name: formData.name,
        CPF: formData.CPF,
        email: formData.email,
        address: formData.address
    };
      // Chame a função do serviço API para enviar os dados para o backend
      await APIService.createClients(clientData);
      alert('Usuário cadastrado com sucesso!');
      // Limpe os campos do formulário após o envio bem-sucedido
      setFormData({
        name: '',
        CPF: '',
        email: '',
        address: '',
        password: '',
        confirmPassword: ''
      });
    } catch (error) {
      console.error('Erro ao cadastrar usuário:', error);
      // Trate o erro conforme necessário (ex: exibir mensagem de erro)
    }
  };

  return (
    <form className={styles.form}>
    <div className={styles.questions}>
      <div className={styles.questionsleft}>
          <Input
          type="text"
          text ="Nome"
          name ="name"
          placeholder= "Insira seu nome Completo"     
          />
          <Input
          type="text"
          text ="CPF"
          name ="CPF"
          placeholder= "Insira seu CPF"     
          />
      
      
          <Input
          type="text"
          text ="E-mail"
          name ="E-mail"
          placeholder= "Insira seu E-mail"     
          />
      </div>
        <div>
        <Input
        type="text"
        text ="Endereço"
        name ="Endereço"
        placeholder= "Insira seu Endereço"     
        />
        
        
        <Input
        type="password"
        text ="Senha"
        name ="Senha"
        placeholder= "Insira sua Senha"     
        />  
        <Input
        type="password"
        text ="Confirmar Senha"
        name ="ConfirmaSenha"
        placeholder= "Confirme sua Senha"     
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