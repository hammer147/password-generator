import type { NextPage } from 'next'
import { useRef } from 'react'
import Display from '../components/display'
import Header from '../components/header'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {

  // to copy the password to the clipboard
  const copyRef = useRef<HTMLInputElement>(null)

  return (
    <div className={styles.container}>
      <Header />
      <Display ref={copyRef} />
    </div>
  )
}

export default Home
