import styles from "../styles/Home.module.css";
import Header from "./Header";
import Footer from "./Footer";
import List from "./List";
import Task from "./Task";
import ShowList from "./ShowList";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addList, addShare, completeList } from "../reducers/lists";
import {
  addIdTtitle,
  addTask,
  deleteNewList,
  deleteTaskNew,
} from "../reducers/newlist";
import { deleteList } from "../reducers/lists";

function Home() {
  const [listTitle, setListTitle] = useState("");
  const [taskName, setTaskName] = useState("");
  const user = useSelector((state) => state.user.value);
  const lists = useSelector((state) => state.lists.value.lists);
  const share = useSelector((state) => state.lists.value.share);
  const newlist = useSelector((state) => state.newlist.value);
  const showList = useSelector((state) => state.showList.value);
  const dispatch = useDispatch();

  /**affichage des listes de l'utilisateur à l'ouverture */
  useEffect(() => {
    user.token &&
      fetch(`http://localhost:3000/lists/${user.id}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.result) {
            dispatch(addList(data.data));
          }
        });
  }, [user, showList, newlist]);

  useEffect(() => {
    user.token &&
      fetch(`http://localhost:3000/lists/share/${user.id}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.result) {
            dispatch(addShare(data.data));
          }
        });
  }, [user]);
 
  /**supprimer une liste */
  const removeList = (list) => {
    dispatch(deleteList(list._id));
    fetch("http://localhost:3000/lists/deleteList", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        listId: list._id,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        dispatch(deleteList(list._id));
      });
  };

  let listsDisplay;
  let combinedList = lists.concat(share);
  lists &&
    (listsDisplay = combinedList.map((list, i) => {
      return <List key={i} {...list} />;
    }));

  const deleteTask = (idTask) => {
    dispatch(deleteTaskNew(idTask));
  };
  /**afficher les taches de la nouvelle liste */
  const newListTasks = newlist.tasks.map((task, i) => {
    return <Task key={i} {...task} deleteTask={deleteTask} />;
  });

  /**créer une liste en base de données */
  const creatList = () => {
    listTitle &&
      fetch("http://localhost:3000/lists/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: listTitle,
          userId: user.id,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.result) {
            dispatch(addIdTtitle({ id: data.newDoc._id, title: listTitle }));
            setListTitle("");
          }
        });
  };

  /**créer une tache en base de donnée */
  const creatTask = (e) => {
    e.preventDefault();
    newlist._id &&
      taskName &&
      fetch("http://localhost:3000/lists/newTask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: taskName,
          listId: newlist._id,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.result) {
            dispatch(addTask(data.newDoc));
            setTaskName("");
          }
        });
  };

  /**supprimer une liste en creation*/
  const handledeleteNewList = () => {
    fetch("http://localhost:3000/lists/deleteList", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        listId: newlist._id,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        dispatch(deleteNewList());
      });
  };

  /**vaolider une nouvelle liste */
  const handleValidateList = () => {
    dispatch(completeList(newlist));
    dispatch(deleteNewList());
  };

  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>
        <div className={styles.cardLeft}>
          <h1 className={styles.title}>Creat your list</h1>
          {user.token &&
            (newlist.title ? (
              <div className={styles.containerNew}>
                <p className={styles.newList}>Current list : {newlist.title}</p>

                <form className={styles.addListForm}>
                  <label htmlFor="Add a task" className={styles.label}>
                    Add a task
                  </label>
                  <input
                    type="text"
                    placeholder="add a task"
                    value={taskName}
                    className={styles.input}
                    onChange={(e) => setTaskName(e.target.value)}
                  />
                  <button
                    id="add"
                    onClick={(e) => creatTask(e)}
                    className={styles.btn}
                  >
                    Add
                  </button>
                </form>
                <div className={styles.tasksNew}>{newListTasks.reverse()}</div>
              </div>
            ) : (
              <div className={styles.containerAdd}>
                <div className={styles.inputContainer}>
                  <form className={styles.addListForm}>
                    <label htmlFor="Add a List" className={styles.label}>
                      Add a List
                    </label>
                    <input
                      onChange={(e) => setListTitle(e.target.value)}
                      className={styles.input}
                      value={listTitle}
                      type="text"
                      placeholder="add a list"
                    ></input>
                  </form>
                  <button
                    id="add"
                    className={styles.btn}
                    onClick={() => creatList()}
                  >
                    Add
                  </button>
                </div>
              </div>
            ))}
          {newlist.title && (
            <div className={styles.btnDeleteCancel}>
              <button
                id="ok"
                className={styles.btn}
                onClick={() => user.token && handleValidateList()}
              >
                OK
              </button>
              <button
                id="cancel"
                className={styles.btn}
                onClick={() => handledeleteNewList()}
              >
                Delete
              </button>
            </div>
          )}
        </div>

        {user.token ? (
          <div className={styles.cardRight}>
            <h1 className={styles.title}>My Lists</h1>
            <div className={styles.containerMyLists}>
              <div className={styles.myList}>
                {listsDisplay}
              </div>
              {showList.id && (
                <div className={styles.showList}>
                  <ShowList />
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className={styles.cardRight}>
            <p className={styles.log}>Log in or create an account !!</p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default Home;
