'use client'

import styles from "./page.module.css";
import Dashboard from "./dashboard/page";

export default function Home() {
  return (
    <div className={styles.page}>
      <Dashboard> </Dashboard>
    </div>
  );
}
