import styles from "./index.module.css";
import IconButton from "../../../../shared/components/IconButton";
import CheckIcon from "../../../../shared/assets/whiteCheck.svg";

const RestaurantRegistration = () => {
  return (
    <div className={styles.pageWrapper}>
      <form action="" className={styles.registrationForm}>
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
