import styles from "./index.module.css";
import IconButton from "../../../../shared/components/IconButton";
import CheckIcon from "../../../../shared/assets/whiteCheck.svg";

const RestaurantRegistration = () => {
  return (
    <div className={styles.pageWrapper}>
      <form action="" className={styles.registrationForm}>
        <input type="text" placeholder="Nome" />
        <input type="text" placeholder="E-mail" />
        <input type="text" placeholder="CNPJ" />
        <input type="password" placeholder="Senha" />
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
