import styles from "../styles/Task.module.css";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { deleteTask } from "../reducers/newlist";
import { useDispatch } from "react-redux";

function Task(props) {
  const [checkedList, setCheckedList] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);
  const dispatch = useDispatch();

  /**supprimer une tache */
  const handledelete = () => {
    fetch("http://localhost:3000/lists/deleteTask", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        taskId: props._id,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          props.deleteTask(props._id)
          // dispatch(deleteTask(props._id));
        }
      });

  };

  const handleSelect = (event) => {
    const v = event.target.v;
    const isChecked = event.target.checked;
    console.log('isChecked',isChecked);
    setIsCompleted(isChecked);
    isChecked ? setCheckedList(v) : setCheckedList("");
  };

  let textStyle = {};
  if (isCompleted) {
    textStyle = { textDecoration: "line-through" };
  }
  console.log('checked',checkedList);

  return (
    <div className={styles.containerTask}>
      <div className={styles.checkedBox}>
        <input
          type="checkbox"
          name="tasks"
          value={props.name}
          onChange={handleSelect}
          className={styles.completeCheckbox}
        ></input>
        <label style={textStyle} className={styles.label}>{props.name}</label>
      </div>
      <div className={styles.icon}>
        <FontAwesomeIcon
          icon={faTrashCan}
          className={styles.icon}
          onClick={(props) => {handledelete(props)}}/>
      </div>
    </div>
  );
}

export default Task;
