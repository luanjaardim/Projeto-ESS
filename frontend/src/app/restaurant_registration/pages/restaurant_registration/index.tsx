import { useState } from "react";

import styles from "./index.module.css";
import IconButton from "../../../../shared/components/IconButton";
import CheckIcon from "../../../../shared/assets/whiteCheck.svg";
import Modal from "../../components/LoginSucceededModal";

const RestaurantRegistration = () => {
  const [isModalOpen, setIsOpen] = useState(false);
  return (
    <div className={styles.pageWrapper}>
      {isModalOpen && <Modal setIsOpen={setIsOpen} />}
      <form
        action=""
        className={styles.registrationForm}
        onSubmit={(e) => {
          setIsOpen(true);
          e.preventDefault();
        }}
      >
        <input type="text" placeholder="Nome" className={styles.formField} />
        <input type="text" placeholder="E-mail" className={styles.formField} />
        <input type="text" placeholder="CNPJ" className={styles.formField} />
        <input
          type="password"
          placeholder="Senha"
          className={styles.formField}
        />
        <IconButton
          icon={CheckIcon}
          color="#54b544"
          text="Cadastrar"
          type="submit"
        />
      </form>
    </div>
  );
};

export default RestaurantRegistration;
