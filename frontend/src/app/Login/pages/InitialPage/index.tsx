import APIService from '../../../../shared/components/APIService/index';
import { useEffect, useState } from 'react';
import { UserContext } from '../../../../Provider';
import { useContext } from 'react';
import { Link } from 'react-router-dom';

export const InitialPage = () => {

  return (
    <div>
      <h1>Bem vindo ao iBreno ;)</h1>
      <div>

        <Link to = '/clients/login'>
          <button >Login Cliente</button>
        </Link>

        <Link to = '/clients/registration'>
          <button >Cadastro Cliente</button>
        </Link>

        <Link to = '/restaurants/login'>
          <button >Login Restaurante</button>
        </Link>

        <Link to = '/restaurants/registration'>
          <button >Cadastro Restaurante</button>
        </Link>

      </div>
    </div>
  );
};