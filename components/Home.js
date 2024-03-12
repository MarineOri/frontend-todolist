import styles from "../styles/Home.module.css";
import Header from "./Header";
import List from "./List";

function Home() {
  const createTask = () => {};

  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>
        <div className={styles.card}>
          <h1>Creat your list</h1>
          <div className={styles.containerAdd}>
            <h4>Add a List</h4>
            <input type="text" placeholder="List" id="ListName" />
            <button id="add" className={styles.button}>
              Add
            </button>
          </div>
          <div className={styles.containerAdd}>
            <h4>Add a task</h4>
            <input type="text" placeholder="Task" id="taskName" />
            <button
              id="add"
              onClick={() => createTask()}
              className={styles.button}
            >
              Add
            </button>
          </div>
          {/* <List /> */}
        </div>
        <div className={styles.card}>
          <h1>My Lists</h1>
        </div>
        <div className={styles.card}>
          <h1>Listes Partagés</h1>
        </div>
      </main>
    </div>
  );
}

export default Home;
