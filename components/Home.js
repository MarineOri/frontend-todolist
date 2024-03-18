import styles from "../styles/Home.module.css";
import Header from "./Header";
import List from "./List";
import Task from "./Task";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addList, deleteList } from "../reducers/lists";

function Home() {
  const [listTitle, setListTitle] = useState("");
  const [listId, setListId] = useState("");
  const [taskName, setTaskName] = useState("");
  const user = useSelector((state) => state.user.value);
  const lists = useSelector((state) => state.lists.value);
  const dispatch = useDispatch();

  /**affichage des listes de l'utilisateur à l'ouverture */
  useEffect(() => {
    // user.token
    //   ? fetch(`http://localhost:3000/lists/${user.id}`)
    //       .then((response) => response.json())
    //       .then((data) => {
    //         if (data.result) {
    //           dispatch(addList(data.data));
    //         }
    //       })
    //   : setListId("");
    user.token &&
      fetch(`http://localhost:3000/lists/${user.id}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.result) {
            dispatch(addList(data.data));
          }
        });
  }, [user]);
  console.log("data list user", lists);
  console.log("user", user);

  let tasksdisplay;
  const listsDisplay = lists.map((list, i) => {
    lists.tasks &&
      (tasksdisplay = lists.tasks.map((task, j) => {
        <Task key={j} {...task} />;
      }));
    return lists.length === 0 ? (
      <text>Pas de Listes</text>
    ) : list.tasks.length === 0 ? (
      <div>
        <List key={i} {...list} />
        <text>Pas de tâches</text>
      </div>
    ) : (
      <div>
        <List key={i} {...list} />
        {tasksdisplay}
      </div>
    );
  });

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
          setListId(data.newDoc._id);
          console.log("id list", data);
        }
      });
  };
  const creatTask = () => {
    fetch("http://localhost:3000/lists/newTask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: taskName,
        isFinished: false,
        listId: listId,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          setTaskName("");
        }
      });
  };

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
              onChange={(e) => setTaskName(e.target.value)}
            />
            <button
              id="add"
              onClick={() => creatTask()}
              className={styles.button}
            >
              Add
            </button>
          </div>
        </div>
        <div className={styles.card}>
          <h1>My Lists</h1>
          {listsDisplay}
        </div>
        <div className={styles.card}>
          <h1>Listes Partagés</h1>
        </div>
      </main>
    </div>
  );
}

export default Home;
