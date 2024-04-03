import styles from "../styles/List.module.css";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import Task from "./Task";
import { deleteTaskShow, addTaskShow } from "../reducers/showList";

function ShowList(props) {
  const showList = useSelector((state) => state.showList.value);
  const user = useSelector((state) => state.user.value);
  const dispatch = useDispatch();
  const [taskName, setTaskName] = useState("");

  const deleteTask = (idTask) => {
    dispatch(deleteTaskShow(idTask));
  };
  /**afficher les taches de liste */
  let showTasks;
  showList.tasks &&
    (showTasks = showList.tasks.map((task, i) => {
      return <Task key={i} {...task} deleteTask={deleteTask} />;
    }));

  /**créer une tache en base de donnée */
  const creatTask = (e) => {
    e.preventDefault();
    taskName &&
      fetch("http://localhost:3000/lists/newTask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: taskName,
          listId: showList.id,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.result) {
            dispatch(addTaskShow(data.newDoc));
            setTaskName("");
          }
        });
  };

  return (
        <div className={styles.containerShowList}>
          <p className={styles.title}>List : {showList.title}</p>
          <div className={styles.container}>
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
          </div>
          <div className={styles.tasksNew}>
            {showTasks && showTasks.reverse()}
          </div>
        </div>
  );
}

export default ShowList;
