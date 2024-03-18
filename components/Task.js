import styles from "../styles/Mark.module.css";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShareNodes, faTrashCan } from "@fortawesome/free-solid-svg-icons";

function Task() {
  const [taskName, setTaskName] = useState("");

  const handleMark = () => {
    fetch("http://localhost:3000/lists/newTask/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: taskName,
        isFinished: false,
        author: user.id,
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.result) {
            setTaskName("");
          }
        }),
    });
  };

  return (
    <div className={styles.containerTask}>
      {/* <label className={styles.container}>
        <input type="checkbox" />
        <svg viewBox="0 0 64 64" height="2em" width="2em">
          <path
            d="M 0 16 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 16 L 32 48 L 64 16 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 16"
            pathLength="575.0541381835938"
            className={styles.path}
          ></path>
        </svg>
      </label> */}
      {/* <input
        type="checkbox"
        onClick={() => dispatch(completeTask(props.id))}
        checked={props.completed}
        className={styles.completeCheckbox}
      /> */}
      <text>props.name</text>
      <input
        type="text"
        placeholder="New Task"
        id="taskName"
        onChange={(e) => setTaskName(e.target.value)}
        value={taskName}
        className={styles.addTask}
      />
      <button id="add" className={styles.button}>
        Add
      </button>
      <FontAwesomeIcon icon={faShareNodes} />
      <FontAwesomeIcon icon={faTrashCan} className={styles.xmark} />
    </div>
  );
}

export default Task;
