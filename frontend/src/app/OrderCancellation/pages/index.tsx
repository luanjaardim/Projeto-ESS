
import {useState, useEffect, useContext} from 'react';
import './style.css';
import APIService from '../../../shared/components/APIService';
import { UserContext } from '../../../Provider';
import { Navigate, useNavigate } from 'react-router-dom';

export const OrdersPage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [orders, setOrders] = useState([]);
  const [items, setItems] = useState([]);
  const { user, setUserContext } = useContext(UserContext); 
  const [count, setCounter] = useState(0);
  const [reason, setReason] = useState(''); // Estado para armazenar o motivo do cancelamento
  const [password, setPassword] = useState(''); // Estado para armazenar a senha
  const [orderToCancel, setOrderToCancel] = useState(0);
  const [orderOpen, setOrderOpen] = useState(false);

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
        response = await api.getAllItems();
        setItems(response.data);
      } catch (error) {
        console.error('Erro ao obter os pedidos:', error);
      }
      setUserContext({ id: 10349, password: "senha_userId10349", nome: "Hugo" });
    };
    fetchOrders();
  }, [count]);

  const handleConfirmCancelamento = async () => {
      try {
        var response = await api.cancelOrder(user?.id, orderToCancel, password, reason);
        console.log(response);
      } catch (error) {
        console.error('Erro ao obter os pedidos:', error);
      }
      closeModal();
      setCtr();
  };

  return (
    <div className="orders-page">
      <header className="header">
        <div className="back-button" onClick={goBackToHome}>Voltar</div>
        <div className="app-name">iBreno ;) </div>
        <div className="user-info">
          <div className="user-name">{user?.nome}</div>
          <img src="src/app/OrderCancellation/pages/mobolado.png" alt="Ícone do usuário" className="user-icon" />
          <button className="profile-button"></button>
        </div>
      </header>
      <main className="order-list">
        <div className="orders-title">Pedidos {!orderOpen ? (<span className="arrow-icon" onClick={() => {setCtr(); openOrder();}}> 
        <img src="src/app/OrderCancellation/pages/rArrow.png" alt="right arrow" className="arrow-icon" /></span>) : 
        (<span className="arrow-icon" onClick={() => {setCtr(); closeOrder();}}>
        <img src="src/app/OrderCancellation/pages/dArrow.png" alt="down arrow" className="arrow-icon" /></span>)}</div>
        {orderOpen && (
          <div>
            {orders.filter(order => order.status !== "Nao finalizado").map((order, index) => (
              <div className="order" key={index}>
                <div className="order-label">Pedido #{order.id}</div> {/* Rótulo do pedido */}
                <div className="order-details">
                {order.products.map((product, index) => {
                  const item = items.find((item) => item.id === product.itemId);
                  return (<div className="item-and-price" key={index}>
                    <div className="item">{item?.name}</div>
                    <div className="price">{product.quantity} X R$ {item?.price.toFixed(2)}</div>
                  </div>
                )
                })}
                  <div className="total">Total: R${order.price.toFixed(2)}</div>
                </div>
                <div className="order-actions">
                  <div className="action-left">
                    <div className="status">
                      Status: {order.status === "Cancelado" ? (
                        <span className="status-cancelado">Cancelado</span>
                      ) : order.status === "Aceito" ? (
                        <span className="status-aceito">Aceito</span>
                      ) : (
                        <span className="status-pendente">{order.status}</span>
                      )}
                    </div>
                    <div className="time">Tempo estimado: {order.time}</div>
                  </div>
                  <button className="cancel-button" onClick={() => {openModal(); setCancel(order.id);}}> Cancelar <br /> Pedido
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
      {modalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-button" onClick={closeModal}>
              &times;
            </span>
            <h2 className="modal-title">Você tem certeza que quer cancelar seu pedido?</h2>
            <div className="modal-body">
            <div className="input-group">
                <label htmlFor="motivo">Motivo do cancelamento:</label>
                <input type="text" id="motivo" value={reason} onChange={handleMotivoChange} placeholder="Digite o motivo aqui" />
              </div>
              <div className="input-group">
                <label htmlFor="senha">Insira sua senha:</label>
                <input type="password" id="senha" value={password} onChange={handleSenhaChange} placeholder="Digite sua senha aqui" />
              </div>
            </div>
            <button className="confirm-button" onClick={handleConfirmCancelamento}>Confirmar Cancelamento</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrdersPage;