import styles from "./index.module.css";
import { FiCheckCircle } from "react-icons/fi";

const Modal = ({ setIsOpen }) => {
  return (
    <>
      <div className={styles.darkBG} onClick={() => setIsOpen(false)} />
      <div className={styles.centered}>
        <div className={styles.modal}>
          <FiCheckCircle
            style={{ color: "#54B544", width: "50px", height: "50px" }}
          />
          <div className={styles.modalContent}>Cadastro feito com sucesso!</div>
          <div className={styles.modalActions}>
            <div className={styles.actionsContainer}>
              <button
                className={styles.deleteBtn}
                onClick={() => setIsOpen(false)}
              >
                Fazer login
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
