import APIService from '../../../../shared/components/APIService/index';
import { useEffect, useState } from 'react';
import { UserContext } from '../../../../Provider';
import { useContext } from 'react';
import { Link , Navigate } from 'react-router-dom';
import './styles.css';

export const LoginClientPage = () => {
  const api = new APIService;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirectToHome, setRedirectToHome] = useState(false);

  const handleLogin = (req: Request, res: Response) => {
  alert(`Tentativa de login do cliente com email: ${email} e senha: ${password}`);

  const userData = {
    email: email,
    password: password
  };

  api.postLoginClient(userData.email, userData.password)
    .then(response => {
      const token = response.data.header;
      console.log('Token recebido:', token);

      api.postTokenClient(token)
        .then(tokenResponse => {
          console.log('Dados do cliente:', tokenResponse.data);
          
          setRedirectToHome(true);
        })
        .catch(tokenError => {
          console.log(token);
          console.error('Erro ao obter token:', tokenError);
        });
    })
    .catch(error => {
      console.error('Erro:', error);
      
      alert('Erro ao fazer login');
    });
  };

  if (redirectToHome) {
    return <Navigate to = "/client/home"/>;
  }

  return (
    <div style={{backgroundColor:"#fff13e"}}>
      <div style={{backgroundColor:"#eff1ed"}}>
          <Link to = '/*'>
            <button className="backButton">Voltar</button>
          </Link>
      <h1 className="titleLogin">Login Cliente</h1>
      </div>
      <div className="containerForm">
      <form className="loginForm">
        <div>
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            className="formFieldLogin"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Senha"
            value={password}
            className="formFieldLogin"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="containerButtonForm">
          <button type="button" onClick={handleLogin}>Login</button>
          <Link to = '/recover/client'>
            <button className="recPasswordButton">Esqueci a Senha</button>
          </Link>
        </div>
      </form>
      </div>
    </div>
  );
};