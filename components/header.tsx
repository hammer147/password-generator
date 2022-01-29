import { FaKey } from 'react-icons/fa'
import styles from './header.module.css'

const Header = () => {
  return (
    <div className={styles.header}>
      <h1>Password Generator</h1>
      <div className={styles.keyIcon}><FaKey /></div>
    </div>
  )
}

export default Header
