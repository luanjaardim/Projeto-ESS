import styles from './submitButton.module.css'
import { FaCheck } from 'react-icons/fa6';
function submitButton({ text }){
  return(
    <div>
       <button id="cadastrar" type='submit' className={styles.btn}> {text} 
       </button>
    </div>
  )
}

export default submitButton