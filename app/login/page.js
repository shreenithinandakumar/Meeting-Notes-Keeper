import { signIn } from 'next-auth/react';
import styles from '@/styles/LoginPage.module.css';

export default function Login() {
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Welcome to your Meeting Notes Keeper</h1>
      <p className={styles.paragraph}>Login using GitHub to manage your notes</p>
      <button onClick={() => signIn('github')} className={styles.loginBtn}>
        Login with GitHub
      </button>
    </div>
  );
}
