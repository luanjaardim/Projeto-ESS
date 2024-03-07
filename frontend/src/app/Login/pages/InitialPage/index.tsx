import APIService from '../../../../shared/components/APIService/index';
import { useEffect, useState } from 'react';
import { UserContext } from '../../../../Provider';
import { useContext } from 'react';
import { Link } from 'react-router-dom';

export const InitialPage = () => {
  const handleClick = (buttonName) => {
    alert(`Você clicou no botão: ${buttonName}`);
  };

  return (
    <div>
      <h1>Bem vindo ao iBreno ;)</h1>
      <div>

        <Link to = '/clients/login'>
          <button onClick={() => handleClick("Login Cliente")}>Login Cliente</button>
        </Link>

        <Link to = '/clients/registration'>
          <button onClick={() => handleClick("Cadastro Cliente")}>Cadastro Cliente</button>
        </Link>

        <Link to = '/restaurants/login'>
          <button onClick={() => handleClick("Login Restaurante")}>Login Restaurante</button>
        </Link>

        <Link to = '/restaurants/registration'>
          <button onClick={() => handleClick("Cadastro Restaurante")}>Cadastro Restaurante</button>
        </Link>

      </div>
    </div>
  );
};