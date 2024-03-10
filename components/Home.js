import styles from "../styles/Home.module.css";
import Header from "./Header";

function Home() {
  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>
        <h1 className={styles.title}>To do list !</h1>
      </main>
    </div>
  );
}

export default Home;
