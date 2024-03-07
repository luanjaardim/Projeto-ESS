//import APIService from '../../../../shared/components/APIService/index';
//import { useEffect, useState } from 'react';
//import { useContext } from 'react';
import styles from './index.module.css'
import Input from '../../components/form/input';
import SubmitButton from '../../components/form/submitButton';
import DeleteButton from '../../components/form/deleteButton'

export const client_profile = () => {

    return (
        
        <div className={styles.index_container}>
          <div>
              <h1>Perfil do Usuário</h1>

              <div className={styles.index_forms}>
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
                 
            <div className={styles.botoes}>

            <div className={styles.btn}>
              <SubmitButton text={"Salvar"} />
            </div>

            <div className={styles.botao}>
              <DeleteButton text={"Excluir Conta"} />
            </div>

          </div>
        </div>  
          </div>
        </div>

    );
};
