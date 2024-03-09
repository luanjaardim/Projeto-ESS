import APIService from '../../../../shared/components/APIService/index';
import { useEffect, useState } from 'react';
import { UserContext } from '../../../../Provider';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import './styles.css'

export const InitialPage = () => {

  return (
    <div style={{backgroundColor: "#FFF13E"}}>
      <h1 className="title">Bem vindo ao iBreno ;)</h1>
      <h1 className="subtitle">O que deseja?</h1>
      <div className="button_group">
        <Link to = '/clients/login'>
          <button className="button">Login Cliente</button>
        </Link>

        <Link to = '/clients/registration'>
          <button className="button">Cadastro Cliente</button>
        </Link>

        <Link to = '/restaurants/login'>
          <button className="button">Login Restaurante</button>
        </Link>

        <Link to = '/restaurants/registration'>
          <button className="button">Cadastro Restaurante</button>
        </Link>
      </div>

    </div>
  );
};