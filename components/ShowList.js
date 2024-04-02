import styles from "../styles/List.module.css";
import { useSelector, useDispatch } from "react-redux";
import Task from "./Task";
import { deleteTaskShow } from "../reducers/showList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

function ShowList(props) {
const showList = useSelector((state)=> state.showList.value);
const dispatch = useDispatch();

const deleteTask = (idTask) => {
dispatch(deleteTaskShow(idTask));
}
  /**afficher les taches de liste */
  const showTasks = showList.tasks.map((task, i) => {
    return <Task key={i} {...task} deleteTask={deleteTask}/>
  });

return (
    <div className={styles.containerShowList}>
        <h4 className={styles.text}>{showList.title}</h4>
        <p className={styles.text}>{showTasks}</p>
       
    </div>
);
}
export default ShowList;