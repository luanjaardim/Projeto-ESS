import styles from './submitButton.module.css'
import { FaCheck } from 'react-icons/fa6';


function updateBUtton({ text }){
  return(
    <div>
       <button onSubmit={ha} type='button' className={styles.btn}> {text} 
       </button>
    </div>
  )
}

export default updateBUtton