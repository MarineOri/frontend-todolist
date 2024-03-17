import styles from "../styles/Home.module.css";
import Header from "./Header";
import List from "./List";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

function Home() {
  const [listTitle, setListTitle] = useState("");
  const user = useSelector((state) => state.user.value);

  /**créer une liste en base de données */
  const creatList = () => {
    fetch("http://localhost:3000/lists/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: listTitle,
        tasks: [],
        userId: user.id,
        access: [],
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          setListTitle("");
        }
      });
  };
  const creatTask = () => {};

  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>
        <div className={styles.card}>
          <h1 className={styles.title}>Creat your list</h1>
          <div className={styles.containerAdd}>
            <h5>Add a List</h5>
            <div className={styles.inputContainer}>
              <input
                onChange={(e) => setListTitle(e.target.value)}
                className={styles.input}
                value={listTitle}
                type="text"
                placeholder="add a list"
              />
            </div>
            <button
              id="add"
              className={styles.button}
              onClick={() => creatList()}
            >
              Add
            </button>
          </div>
          <div className={styles.containerAdd}>
            <h4>Add a task</h4>
            <input
              type="text"
              placeholder="Task"
              id="taskName"
              className={styles.input}
            />
            <button
              id="add"
              onClick={() => createTask()}
              className={styles.button}
            >
              Add
            </button>
          </div>
          <List />
        </div>
        <div className={styles.card}>
          <h1>My Lists</h1>
          <List />
        </div>
        <div className={styles.card}>
          <h1>Listes Partagés</h1>
        </div>
      </main>
    </div>
  );
}

export default Home;
