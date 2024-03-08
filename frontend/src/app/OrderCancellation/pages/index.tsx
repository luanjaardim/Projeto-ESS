import {useState} from 'react';
import './style.css';



export const OrdersPage = () => {
  // Estado para controlar a exibição da janela modal
  const [modalOpen, setModalOpen] = useState(false);

  // Função para abrir a janela modal
  const openModal = () => {
    setModalOpen(true);
  };

  // Função para fechar a janela modal
  const closeModal = () => {
    setModalOpen(false);
  };


  return (
    <div className="orders-page">
      <header className="header">
        <div className="back-button">Voltar</div>
        <div className="app-name">iBreno ;) </div>
        <div className="user-info">
          <div className="user-name">João</div>
          <img src="src/app/OrderCancellation/pages/mobolado.png" alt="Ícone do usuário" className="user-icon" />
          <button className="profile-button"></button>
        </div>
      </header>
      <main className="order-list">
        <div className="orders-title">Pedidos</div> {/* Caixa de indicação "Pedidos" */}
        <div className="order">
          <div className="order-label">Pedido #1</div> {/* Rótulo do pedido */}
          <div className="order-details">
            <div className="item-and-price">
              <div className="item"><br />Item 1</div>
              <div className="price">R$ 10,00</div>
            </div>
            <div className="total">Total: R$ 10,00</div>
          </div>
          <div className="order-actions">
            <div className="action-left">
              <div className="status">Status: Em andamento</div>
              <div className="time">Tempo estimado: 01:23</div>
            </div>
            <button className="cancel-button" onClick={openModal}> Cancelar <br /> Pedido
            </button>
          </div>
        </div>
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
