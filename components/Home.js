import styles from "../styles/Home.module.css";
import Header from "./Header";

function Home() {
  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>
        <div className={styles.card}>
          <h1>My lists</h1>
        </div>
        <div className={styles.card}>
          <h1>New List</h1>
        </div>
        <div className={styles.card}>
          <h1>Listes Partagés</h1>
        </div>
      </main>
    </div>
  );
}

export default Home;
