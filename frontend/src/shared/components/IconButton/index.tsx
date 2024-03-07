import styles from "./index.module.css";
import { IconType } from "react-icons";

interface LogoButtonProps {
  icon: IconType;
  text: string;
  color: string;
  type?: "button" | "submit" | "reset";
}

const IconButton = ({ icon: Icon, text, type, color }: LogoButtonProps) => {
  return (
    <button
      className={styles.button}
      type={type}
      style={{ backgroundColor: color }}
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
