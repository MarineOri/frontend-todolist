import styles from "../styles/List.module.css";
import Task from "./Task";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addList, deleteList } from "../reducers/lists";

function List(props) {
  const user = useSelector((state) => state.user.value);
  const lists = useSelector((state) => state.lists.value);
  const dispatch = useDispatch();

  return (
    <div className={styles.containerList}>
      <h5>{props.title}</h5>
      {props.tasks.length ? (
        <div>
          <text> 0 taches réalisés sur {props.tasks.length}</text>
        </div>
      ) : (
        <text> pas de tâches pour cette liste</text>
      )}

      {/* <Task /> */}
    </div>
  );
}

export default List;
