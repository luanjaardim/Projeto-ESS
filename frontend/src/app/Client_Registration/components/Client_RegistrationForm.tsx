import styles from './RegistrationForms.module.css'
import Input from './form/input'
import SubmitButton from './form/submitButton'

function Client_RegistrationForm({btnText}){
  
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