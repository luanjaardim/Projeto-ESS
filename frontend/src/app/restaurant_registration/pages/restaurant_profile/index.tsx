import { useState } from "react";

import { FaRegTrashAlt } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { FaSave } from "react-icons/fa";

import IconButton from "../../../../shared/components/IconButton";
import styles from "./index.module.css";
import Modal from "../../components/AlertModal";

const RestaurantProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleToggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleConfirmDelete = () => {};

  return (
    <>
      {isModalOpen && (
        <Modal
          setIsOpen={setIsModalOpen}
          title="Excluir restaurante"
          modalBody="Tem certeza que deseja excluir o restaurante? Todos os dados cadastrados serão excluídos permanentemente"
          leftButton={{
            backgroundColor: "rgb(0,0,0,0.2)",
            color: "black",
            text: "Cancelar",
            callback: handleConfirmDelete,
          }}
          rightButton={{
            backgroundColor: "#FD3939",
            color: "white",
            text: "Excluir",
            callback: handleConfirmDelete,
          }}
        />
      )}
      <h1 className={styles.title}>Meu perfil</h1>
      <div className={styles.pageWrapper}>
        <div className={styles.profileDataContainer}>
          <IconButton
            icon={isEditing ? FaSave : MdEdit}
            color={isEditing ? "#54b544" : "#251fa5"}
            text={isEditing ? "Salvar" : "Editar dados"}
            type="button"
            onClick={handleToggleEdit}
          />
          <input
            type="text"
            placeholder="Nome"
            className={styles.formField}
            disabled={!isEditing}
          />
          <input
            type="text"
            placeholder="E-mail"
            className={styles.formField}
            disabled={!isEditing}
          />
          <input
            type="text"
            placeholder="CNPJ"
            className={styles.formField}
            disabled={!isEditing}
          />
          <input
            type="password"
            placeholder="*********"
            className={styles.formField}
            disabled={!isEditing}
          />
          <IconButton
            icon={FaRegTrashAlt}
            color={isEditing ? "rgb(0,0,0,0.2)" : "#FD3939"}
            text="Excluir restaurante"
            type="button"
            onClick={() => setIsModalOpen(true)}
            disabled={isEditing}
          />
        </div>
      </div>
    </>
  );
};

export default RestaurantProfilePage;
