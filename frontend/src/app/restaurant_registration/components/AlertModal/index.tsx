import { IconType } from "react-icons";
import styles from "./index.module.css";

interface ModalParams {
  setIsOpen: (isOpen: boolean) => void;
  title?: string;
  modalBody?: IconType | string;
  bodyStyle?: { color: string; width: string; height: string };
  leftButton?: {
    color: string;
    backgroundColor: string;
    text: string;
    callback: () => void;
  };
  rightButton?: {
    color: string;
    backgroundColor: string;
    text: string;
    callback: () => void;
  };
}

const Modal = ({
  setIsOpen,
  title,
  modalBody: ModalBody,
  bodyStyle,
  leftButton,
  rightButton,
}: ModalParams) => {
  return (
    <>
      <div className={styles.darkBG} onClick={() => setIsOpen(false)} />
      <div className={styles.centered}>
        <div className={styles.modal}>
          <div className={styles.modalHeader}>
            {title && <h5 className={styles.heading}>{title}</h5>}
          </div>

          <div className={styles.modalContent}>
            {ModalBody &&
              (typeof ModalBody === "string" ? (
                ModalBody
              ) : (
                <ModalBody style={bodyStyle} />
              ))}
          </div>
          <div className={styles.modalActions}>
            <div className={styles.actionsContainer}>
              {leftButton && (
                <button
                  className={styles.optionBtn}
                  style={{
                    backgroundColor: leftButton.backgroundColor,
                    color: leftButton.color,
                  }}
                  onClick={() => {
                    setIsOpen(false);
                    leftButton.callback();
                  }}
                >
                  {leftButton.text}
                </button>
              )}

              {rightButton && (
                <button
                  className={styles.optionBtn}
                  style={{
                    backgroundColor: rightButton.backgroundColor,
                    color: rightButton.color,
                  }}
                  onClick={() => {
                    setIsOpen(false);
                    rightButton.callback();
                  }}
                >
                  {rightButton.text}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
