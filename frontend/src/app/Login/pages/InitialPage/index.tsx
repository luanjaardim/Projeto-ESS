import APIService from '../../../../shared/components/APIService/index';
import { useEffect, useState } from 'react';
import { UserContext } from '../../../../Provider';
import { useContext } from 'react';

export const InitialPage = () => {
  const handleClick = (buttonName) => {
    alert(`Você clicou no botão: ${buttonName}`);
  };

  return (
    <div>
      <h1>Bem vindo ao iBreno ;)</h1>
      <div>
        <button onClick={() => handleClick("Login Cliente")}>Login Cliente</button>
        <button onClick={() => handleClick("Cadastro Cliente")}>Cadastro Cliente</button>
        <button onClick={() => handleClick("Login Restaurante")}>Login Restaurante</button>
        <button onClick={() => handleClick("Cadastro Restaurante")}>Cadastro Restaurante</button>
      </div>
    </div>
  );
};