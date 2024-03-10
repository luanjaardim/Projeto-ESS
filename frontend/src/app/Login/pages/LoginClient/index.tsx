import APIService from "../../../../shared/components/APIService/index";
import { useState } from "react";
import { UserContext } from "../../../../Provider";
import { useContext } from "react";
import { Link, Navigate } from "react-router-dom";

export const LoginClientPage = () => {
  const api = new APIService();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirectToHome, setRedirectToHome] = useState(false);
  const { user, setUserContext } = useContext<any>(UserContext);

  const handleLogin = (req: Request, res: Response) => {
    const userData = {
      email: email,
      password: password,
    };

    api
      .postLoginClient(userData.email, userData.password)
      .then((response) => {
        const token = response.data.header;
        const client = response.data.client;
        console.log("Client recebido", client);
        setUserContext({
          id: client.id,
          name: client.name,
          email: client.email,
          password: userData.password,
          address: client.address,
          cpf: client.cpf,
        });

        api
          .postTokenClient(token)
          .then((tokenResponse) => {
            console.log("Dados do cliente:", tokenResponse.data);

            setRedirectToHome(true);
          })
          .catch((tokenError) => {
            console.log(token);
            console.error("Erro ao obter token:", tokenError);
          });
      })
      .catch((error) => {
        console.error("Erro:", error);

        alert("Erro ao fazer login");
      });
  };

  if (redirectToHome) {
    return <Navigate to="/client/home" />;
  }

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
          <Link to="/*">
            <button type="button">Voltar</button>
          </Link>
          <button type="button" onClick={handleLogin}>
            Login
          </button>
          <Link to="/recover/client">
            <button type="button">Esqueci a Senha</button>
          </Link>
        </div>
      </form>
    </div>
  );
};
