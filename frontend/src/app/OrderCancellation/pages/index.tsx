import {useState, useEffect, useContext} from 'react';
import './style.css';
import APIService from '../../../shared/components/APIService';
import { UserContext } from '../../../Provider';
import { Navigate, useNavigate } from 'react-router-dom';
//import { OrderItemsList } from '../../components/RestaurantList/index';


export const OrdersPage = () => {
  const [modalOpen, setModalOpen] = useState(false)
  const [orders, setOrders] = useState([]);;
  const { user, setUserContext } = useContext(UserContext);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const navigate = useNavigate();
  const goBackToHome = () => {
    navigate('/home');
  };

  const api = new APIService();

  useEffect(() => {
    // Função para obter os pedidos da API
    const fetchOrders = async () => {
      try {
        const response = await api.getOrders(user?.id, user?.password);
        setOrders(response.data); // Define os pedidos no estado
      } catch (error) {
        console.error('Erro ao obter os pedidos:', error);
      }
      setUserContext({ id: 10349, password: "senha_userId10349", nome: "Hugo" });
    };

    // Chama a função para obter os pedidos da API
    fetchOrders();
  }, []); // Executa somente uma vez após a montagem do componente

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
        <div className="orders-title">Pedidos</div> {/* Caixa de indicação "Pedidos" */}
        {orders.map((order, index) => (
          <div className="order" key={index}>
            <div className="order-label">Pedido #{order.id}</div> {/* Rótulo do pedido */}
            <div className="order-details">
            {order.products.map((products, index) => (
            <div className="item-and-price" key={index}>
              <div className="item">{products.itemId}</div>
              <div className="price">{products.quantity} X R$ 10.00</div>
            </div>
            ))}
              <div className="total">Total: R${order.price.toFixed(2)}</div>
            </div>
            <div className="order-actions">
              <div className="action-left">
                <div className="status">Status: {order.status}</div>
                <div className="time">Tempo estimado: {order.time}</div>
              </div>
              <button className="cancel-button" onClick={openModal}> Cancelar <br /> Pedido
              </button>
            </div>
          </div>
        ))}
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
                <input type="text" id="motivo" placeholder="Digite o motivo aqui" />
              </div>
              <div className="input-group">
                <label htmlFor="senha">Insira sua senha:</label>
                <input type="password" id="senha" placeholder="Digite sua senha aqui" />
              </div>
            </div>
            <button className="confirm-button">Confirmar Cancelamento</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
