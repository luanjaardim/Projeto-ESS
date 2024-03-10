
import {useState, useEffect, useContext} from 'react';
import './style.css';
import APIService from '../../../shared/components/APIService';
import { UserContext } from '../../../Provider';
import { Navigate, useNavigate } from 'react-router-dom';

import { Snackbar } from "@mui/material";
import Slide from "@mui/material/Slide";
import Alert from "@mui/material/Alert";

export var ordersSize = 0;


export const OrdersPage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [orders, setOrders] = useState([]);
  const [items, setItems] = useState([]);
  const { user, setUserContext } = useContext(UserContext); 
  const [count, setCounter] = useState(0);
  const [reason, setReason] = useState(''); 
  const [password, setPassword] = useState(''); 
  const [orderToCancel, setOrderToCancel] = useState(0);
  const [orderOpen, setOrderOpen] = useState(false);
  const [ansStatus, setAnsStatus] = useState("normal"); 
  const [snackbarMessage, setSnackbarMessage] = useState<string>("Erro!");
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);

  const handleSnackbarClose = () => {
    setIsSnackbarOpen(false);
  };

  const handleSnackbarOpen = () => {
    setIsSnackbarOpen(true);
  };

  const setStatus = (nStatus) => {
    setAnsStatus(nStatus);
  } 

  const setCancel = (val) => {
    setOrderToCancel(val);
  }

  const setCtr = () => {
    setCounter(count+1);
  }

  const openOrder = () => {
    setOrderOpen(true);
  }

  const closeOrder = () => {
    setOrderOpen(false);
  }

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const navigate = useNavigate();
  const goBackToHome = () => {
    navigate('/client/home');
  };

  const api = new APIService();

  const handleMotivoChange = (event) => {
    setReason(event.target.value);
  };

  const handleSenhaChange = (event) => {
    setPassword(event.target.value);
  };


  useEffect(() => {
    const fetchOrders = async () => {
      try {
        var response = await api.getOrders(user?.id, user?.password);
        setOrders(response.data); // Define os pedidos no estado
        ordersSize = orders.length;
        console.log(ordersSize);
        response = await api.getAllItems();
        setItems(response.data);
      } catch (error) {
        console.error('Erro ao obter os pedidos:', error);
      }
      setUserContext({ id: 10349, password: "senha_userId10349", nome: "Hugo" });
    };

    fetchOrders();


    if (ansStatus !== "normal") {
      const timer = setTimeout(() => {
      setStatus("normal");
      }, 3500); 
      return () => clearTimeout(timer);
    };

  }, [count, ansStatus]);

  const handleConfirmCancelamento = () => {
      if (
        reason === "" 
      ) {
        setSnackbarMessage("Preencha o campo de motivo!");
        handleSnackbarOpen();
        return;
      }
      else if (password === ""){
        setSnackbarMessage("Preencha o campo de senha!");
        handleSnackbarOpen();
        return;
      }
      try {
        //await api.cancelOrder(user?.id, orderToCancel, password, reason);
        setStatus("funcionou");
      }
      
       catch (error) {
        var ans = error.response;
        if (ans.data.message == "Pedido não cancelado: pedido já cancelado!") {
          setStatus("ja cancelado");
          //console.log("ja cancelado colocado");
        } 
        else if (ans.data.message == "Pedido não cancelado: pedido já foi aceito!") {
          setStatus("ja aceito");
          //console.log("ja aceito colocado");
        }
        else if (ans.data.message == "Pedido não cancelado: tempo limite excedido!") {
          setStatus("tempo limite");
          //console.log("tempo limite colocado");
        } 
        else if (ans.data.message == "Pedido não cancelado: senha incorreta!") {
          setStatus("senha incorreta");
          //console.log("senha incorreta colocada");
        }
        else console.error('Erro ao cancelar o pedido:', error);
      }
      closeModal();
      setCtr();
  };
  return (
    <div className="orders-page-cancPg">
      <header className="header-cancPg">
        <div className="back-button-cancPg" onClick={goBackToHome}>Voltar</div>
        <div className="app-name-cancPg">iBreno ;) </div>
        <div className="user-info-cancPg">
          <div className="user-name-cancPg">{user?.nome}</div>
          <img src="src/app/OrderCancellation/pages/mobolado.png" alt="Ícone do usuário" className="user-icon-cancPg" />
          <button className="profile-button-cancPg"></button>
        </div>
      </header>
      <main className="order-list-cancPg">
        <div className="orders-title-cancPg">Pedidos {!orderOpen ? (<span className="arrow-icon-cancPg" onClick={() => {setCtr(); openOrder();}}> 
        <img src="src/app/OrderCancellation/pages/rArrow.png" alt="right arrow" className="arrow-icon-cancPg" /></span>) : 
        (<span className="arrow-icon-cancPg" onClick={() => {setCtr(); closeOrder();}}>
        <img src="src/app/OrderCancellation/pages/dArrow.png" alt="down arrow" className="arrow-icon-cancPg" /></span>)}</div>
        {orderOpen && (
          <div>
            {orders.filter(order => order.status !== "Nao finalizado").map((order, index) => (
              <div className="order-cancPg" key={index}>
                <div className="order-label-cancPg">Pedido #{order.id}</div> 
                <div className="order-details-cancPg">
                {order.products.map((product, index) => {
                  const item = items.find((item) => item.id === product.itemId);
                  return (<div className="item-and-price-cancPg" key={index}>
                    <div className="item-cancPg">{item?.name}</div>
                    <div className="price-cancPg">{product.quantity} X R$ {item?.price.toFixed(2)}</div>
                  </div>
                )
                })}
                  <div className="total-cancPg">Total: R${order.price.toFixed(2)}</div>
                </div>
                <div className="order-actions-cancPg">
                  <div className="action-left-cancPg">
                    <div className="status-cancPg">
                      Status: {order.status === "Cancelado" ? (
                        <span className="status-cancelado-cancPg">Cancelado</span>
                      ) : order.status === "Aceito" ? (
                        <span className="status-aceito-cancPg">Aceito</span>
                      ) : (
                        <span className="status-pendente-cancPg">{order.status}</span>
                      )}
                    </div>
                    <div className="time-cancPg">Tempo estimado: {order.time}</div>
                  </div>
                  <button className="cancel-button-cancPg" onClick={() => {openModal(); setCancel(order.id);}}> Cancelar <br /> Pedido
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
      {modalOpen && (
        <div className="modal-cancPg">
          <div className="modal-content-cancPg">
            <span className="close-button-cancPg" onClick={closeModal}>
              &times;
            </span>
            <h2 className="modal-title-cancPg">Você tem certeza que quer cancelar seu pedido?</h2>
            <div className="modal-body-cancPg">
            <div className="input-group-cancPg">
                <label htmlFor="motivo">Motivo do cancelamento:</label>
                <input type="text-reason" id="motivo" value={reason} onChange={handleMotivoChange} placeholder="Digite o motivo aqui" />
              </div>
              <div className="input-group-cancPg">
                <label htmlFor="senha">Insira sua senha:</label>
                <input type="password" id="senha" value={password} onChange={handleSenhaChange} placeholder="Digite sua senha aqui" />
              </div>
            </div>
            <button className="confirm-button-cancPg" onClick={handleConfirmCancelamento}>Confirmar Cancelamento</button>
          </div>
        </div>
      )}
      {ansStatus !== "normal" && (
        <div className={ansStatus === "funcionou" ? "success-tab-cancPg" : "error-tab-cancPg"}>
          <span className={ansStatus === "funcionou" ? "close-button-info-green-cancPg" : "close-button-info-cancPg"} onClick={() => setStatus("normal")}>&times;</span>
          <p>{ansStatus === "ja cancelado" ? "Pedido já cancelado!" :
          ansStatus === "ja aceito" ? "Pedido já foi aceito!" :
          ansStatus === "tempo limite" ? "Tempo limite excedido!" :
          ansStatus === "senha incorreta" ? "Senha incorreta!" :
          ansStatus === "funcionou" ? "Cancelamento bem sucedido!" : ""}</p>
        </div>
      )}
      <Snackbar
          open={isSnackbarOpen}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          TransitionComponent={(props) => <Slide {...props} direction="up" />}
        >
          <Alert
            onClose={handleSnackbarClose}
            severity="error"
            variant="filled"
            sx={{ width: "100%" }}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
    </div>
  );
};

export default OrdersPage;