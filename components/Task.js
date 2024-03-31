import styles from "../styles/Mark.module.css";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { deleteTask } from "../reducers/newlist";
import { useDispatch } from "react-redux";

function Task(props) {
  const [taskName, setTaskName] = useState("");
  const dispatch = useDispatch();

  /**supprimer une tache */
  const handledelete = () => {
    dispatch(deleteTask(props._id));
    fetch("http://localhost:3000/lists/deleteTask", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        taskId: props._id,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("delete data", data);
      });
  };

  return (
    <div className={styles.containerTask}>
      <text>{props.name}</text>
      <FontAwesomeIcon
        icon={faTrashCan}
        className={styles.xmark}
        onClick={() => handledelete()}
      />
    </div>
  );
}

export default Task;
