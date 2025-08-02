'use client'
import styles from '@/styles/Loader.module.css'

export default function Loader() {
  return (
    <div className={styles.loaderContainer}>
      <div className={styles.spinner}></div>
      <h3 className={styles.loadingText}>Loading Notes...</h3>
    </div>
  )
}
