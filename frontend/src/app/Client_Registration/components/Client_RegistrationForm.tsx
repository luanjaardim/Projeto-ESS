import styles from './RegistrationForms.module.css'

function Client_RegistrationForm(){
  return (
    <form className={styles.form}>
      <div>
        <input type="text" placeholder="Insira seu Nome"/>
      </div>
      <div>
        <input type="text" placeholder="Insira seu CPF"/>
      </div>
      <div>
      <input type="text" placeholder="Insira seu E-mail"/>  
      </div>
      <div>
      <input type="text" placeholder="Insira seu Endereço"/>
      </div>
      <div>
        <input type="text" placeholder="Insira sua Senha "/>
      </div>      
      <div>
        <input type="text" placeholder="Confirme sua Senha"/>
      </div>

      <div>
        <input type="submit" value="Cadastrar Usuário" />
      </div>
      
    </form>
  )
}

export default Client_RegistrationForm