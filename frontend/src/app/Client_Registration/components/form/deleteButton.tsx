import styles from './deleteButton.module.css'
import { FaCheck } from 'react-icons/fa6';

function deleteButton({ text }){
  return(
    <div>
       <button className={styles.botao}>{text} </button>
    </div>
  )
}

export default deleteButton