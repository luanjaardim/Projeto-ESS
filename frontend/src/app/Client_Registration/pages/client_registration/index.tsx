//import APIService from '../../../../shared/components/APIService/index';
//import { useEffect, useState } from 'react';
//import { useContext } from 'react';
import Client_RegistrationForm from '../../components/Client_RegistrationForm';
import styles from './index.module.css'

export const Client_RegistrationPage = () => {

    return (
        <div className={styles.index_container}>
            <h1>Cadastrar Usuário</h1>
            <p>Preencha com seus dados</p>
            <Client_RegistrationForm />
        </div>

    );
};
