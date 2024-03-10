import styles from "./index.module.css";
import { IconType } from "react-icons";

interface LogoButtonProps {
  icon: IconType;
  text: string;
  color: string;
  id: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  onClick?: () => void;
}

const IconButton = ({
  icon: Icon,
  text,
  type,
  color,
  onClick,
  disabled,
  id,
}: LogoButtonProps) => {
  return (
    <button
      id={id}
      className={styles.button}
      type={type}
      style={{
        backgroundColor: color,
        cursor: disabled ? "not-allowed" : "pointer",
      }}
      onClick={onClick}
      disabled={disabled}
    >
      <div className={styles.iconWrapper}>
        <Icon />
      </div>
      <div className={styles.textWrapper}>
        <span>{text}</span>
      </div>
    </button>
  );
};

export default IconButton;
