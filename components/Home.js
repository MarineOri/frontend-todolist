import styles from "../styles/Home.module.css";
import Header from "./Header";
import Footer from "./Footer";
import List from "./List";
import Task from "./Task";
import ShowList from "./ShowList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShareNodes, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addList, addManyList, completeList } from "../reducers/lists";
import { addIdTtitle, addTask, deleteNewList } from "../reducers/newlist";
import { deleteList } from "../reducers/lists";

function Home() {
  const [listTitle, setListTitle] = useState("");
  const [taskName, setTaskName] = useState("");
  const user = useSelector((state) => state.user.value);
  const lists = useSelector((state) => state.lists.value);
  const newlist = useSelector((state) => state.newlist.value);
  // const showList = useSelector((state) => state.showList.value);
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
  }, [user]);

  useEffect(() => {
    user.token &&
      fetch(`http://localhost:3000/lists/share/${user.id}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.result) {
            dispatch(addManyList(data.data));
            console.log("data share", data.data);
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
        console.log("delete data", data);
        dispatch(deleteList(list._id));
      });
  };

  console.log('lists', lists);
  let tasksdisplay;
  let listsDisplay;
  lists && (listsDisplay = lists.map((list, i) => {
    return <List key={i} {...list} />
  }));
  //   lists.tasks &&
  //     (tasksdisplay = lists.tasks.map((task, k, l) => {
  //       console.log("j", j);
  //       console.log("list dans map", list);
  //       <Task key={k} {...task} completed={false} />;
  //       <FontAwesomeIcon
  //         icon={faTrashCan}
  //         className={styles.xmark}
  //         onClick={() => removeList(list)}
  //       />;
  //     }));
  //    : list.tasks.length === 0 ? (
  //     <div>
  //       <List key={i} {...list} />
  //       <FontAwesomeIcon
  //         icon={faTrashCan}
  //         className={styles.xmark}
  //         onClick={() => removeList(list)}
  //       />
  //       <p>Pas de tâches</p>
  //     </div>
  //   ) : (
  //     <div>
  //       <List key={j} {...list} />
  //       {tasksdisplay}
  //     </div>
  //   );
  // });

  /**afficher les taches de la nouvelle liste */
const newListTasks = newlist.tasks.map((task, i) => {
    return <Task key={i} {...task} />;
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
          console.log('test')
          dispatch(addIdTtitle({ id: data.newDoc._id, title: listTitle }));
          setListTitle("");
        }
      });
      console.log('newlist', newlist)
  };

  /**créer une tache en base de donnée */
  const creatTask = (e) => {
    e.preventDefault();
    newlist.id && taskName &&
      fetch("http://localhost:3000/lists/newTask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: taskName,
          listId: newlist.id,
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
        listId: newlist.id,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        dispatch(deleteNewList());
        console.log("delete data", data);
      });
  };

  /**vaolider une nouvelle liste */
  const handleValidateList = () => {
    dispatch(completeList(newlist));
    dispatch(deleteNewList());
  };

  const handleEye = () => {};

  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>
        <div className={styles.card}>
          <h1 className={styles.title}>Creat your list</h1>
          {user.token &&
            (newlist.title ? (
              <div className={styles.containerNew}>
                <p className={styles.newList}>
                  Current list : {newlist.title}
                </p>

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
                <div className={styles.tasksNew}>
                {newListTasks.reverse()}
                </div>
              </div>
            ) : (
              <div className={styles.containerAdd}>
                <div className={styles.inputContainer}>
                  <form
                    className={styles.addListForm}
                  >
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
        <div className={styles.card}>
          <h1 className={styles.title}>My Lists</h1>
          <div className={styles.containerMyLists}>
            <div className={styles.myList}>{listsDisplay}</div>
            <div className={styles.showList}><ShowList/></div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Home;
