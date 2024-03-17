import styles from "../styles/List.module.css";
import Task from "./Task";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

function List() {
  const user = useSelector((state) => state.user.value);
  /**affichege des listes de l'utilisateur à l'ouverture */
  useEffect(() => {
    fetch(`http://localhost:3000/lists/${user.id}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          console.log("data list user", data);
        }
      });
  }, []);

  // const lists =

  return (
    <div className={styles.container}>
      <Task />
    </div>
  );
}

export default List;
