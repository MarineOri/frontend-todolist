import styles from "../styles/Task.module.css";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { updateTask } from "../reducers/showList";
import { useDispatch } from "react-redux";

function Task(props) {
  // const [checkedList, setCheckedList] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [taskName, setTaskName] = useState("");
  const [update, setUpdate] = useState("false");
  const dispatch = useDispatch();

  useEffect(() => {
    setIsChecked(props.isFinished);
  }, []);

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
          props.deleteTask(props._id);
        }
      });
  };

  //* valider une date
  const handleSelect = (event) => {
    // const v = event.target.v;
    // const isChecked = event.target.checked;
    // isChecked ? setCheckedList(v) : setCheckedList("");
    fetch("http://localhost:3000/lists/isFinished", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        taskId: props._id,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          setIsChecked(!isChecked);
        }
      });
  };

  //*modifier une tache
  const handleUpdate = () => {
    fetch("http://localhost:3000/lists/nameTask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        taskId: props._id,
        name: taskName,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          dispatch(updateTask({ id: props._id, name: taskName }));
          setUpdate(!update);
        }
      });
  };

  let textStyle = {};
  if (isChecked) {
    textStyle = { textDecoration: "line-through" };
  }

  let tagUpdate = (
    <div className={styles.containerInput}>
      <form className={styles.addListForm}>
      <label
        htmlFor="update a task"
        className={styles.label}
        onSubmit={handleUpdate}
      >
        Update
      </label>
      <input
        type="text"
        placeholder="update a task"
        value={taskName}
        className={styles.input}
        onChange={(e) => setTaskName(e.target.value)}
      />
    </form>
    </div>
  );

  return (
    <div className={styles.containerTask}>
      {!update ? (
        tagUpdate
      ) : (
        <div className={styles.checkedBox}>
          <input
            type="checkbox"
            name="tasks"
            value={props.name}
            onChange={handleSelect}
            checked={isChecked}
            className={styles.completeCheckbox}
          ></input>
          <label style={textStyle} className={styles.label}>
            <div onClick={() => setUpdate(!update)}>{props.name}</div>
          </label>
        </div>
      )}
{update ? (<div className={styles.icon}>
        <FontAwesomeIcon
          icon={faTrashCan}
          className={styles.icon}
          onClick={(props) => {
            handledelete(props);
          }}
        />
      </div>) : (<div className={styles.containerBtn}><button className={styles.btn} onClick={handleUpdate}>Ok</button></div>)}
    </div>
  );
}

export default Task;
