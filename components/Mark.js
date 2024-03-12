import styles from "../styles/Mark.module.css";
import { useState } from "react";

function Mark() {
  const [taskName, setTaskName] = useState("");
  return (
    <div>
      <input
        type="text"
        placeholder="Task"
        id="taskName"
        onChange={(e) => setTaskName(e.target.value)}
        value={taskName}
        className={styles.addTask}
      />
    </div>
  );
}

export default Mark;
