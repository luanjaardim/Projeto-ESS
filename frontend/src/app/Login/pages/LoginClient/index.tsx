import APIService from '../../../../shared/components/APIService/index';
import { useEffect, useState } from 'react';
import { UserContext } from '../../../../Provider';
import { useContext } from 'react';
import { Link } from 'react-router-dom';

export const LoginClientPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Lógica de login aqui, pode chamar sua API ou realizar validações
    alert(`Login do cliente com email: ${email} e senha: ${password}`);
  };

  const handleVoltar = () => {
    alert('Voltando para a página inicial');
  };

  const handleEsqueciSenha = () => {
    alert('Redirecionando para a página de recuperação de senha');
  };

  return (
    <div>
      <h1>Login Cliente</h1>
      <form>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Senha:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <Link to = '*'>
            <button type="button" onClick={handleVoltar}>Voltar</button>
          </Link>
          <button type="button" onClick={handleLogin}>Login</button>
          <Link to = 'recover/client'>
            <button type="button" onClick={handleEsqueciSenha}>Esqueci a Senha</button>
          </Link>
        </div>
      </form>
    </div>
  );
};