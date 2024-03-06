import { ButtonHTMLAttributes, SVGProps } from "react";
import styles from "./index.module.css";

interface LogoButtonProps {
  icon: string;
  text: string;
  color: string;
  type?: "button" | "submit" | "reset";
}

const IconButton = ({ icon, text, type, color }: LogoButtonProps) => {
  return (
    <button
      className={styles.button}
      type={type}
      style={{ backgroundColor: color }}
    >
      <div className={styles.iconWrapper}>
        <img src={icon} alt="Icon" className={styles.buttonIcon} />
      </div>
      <div className={styles.textWrapper}>
        <span>{text}</span>
      </div>
    </button>
  );
};

export default IconButton;
