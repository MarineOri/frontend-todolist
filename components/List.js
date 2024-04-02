import styles from "../styles/List.module.css";
import Task from "./Task";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addShowList } from "../reducers/showList";
import { deleteList } from "../reducers/lists";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShareNodes,
  faXmark,
  faEye,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { Modal } from "antd";

function List(props) {
  const user = useSelector((state) => state.user.value);
  const lists = useSelector((state) => state.lists.value);
  const showList = useSelector((state) => state.showList.value);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [usersShare, setUsersShare] = useState("");
  const dispatch = useDispatch();

  /**supprimer une liste */
  const handledeleteList = () => {
    dispatch(deleteList(props._id));
    fetch("http://localhost:3000/lists/deleteList", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        listId: props._id,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("delete data", data);
        dispatch(deleteList(props._id))
      });
  };

  //*afficher tous les utilisateurs sur la modale
  const showModal = () => {
    setIsModalVisible(!isModalVisible);
    fetch("http://localhost:3000/users")
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          setUsersShare(data.data);
        }
      });
  };
  let usersDisplay;
  usersShare &&
    (usersDisplay = usersShare.map((e) => {
      console.log(e);
      return (
        <div>
          <button id="register" onClick={() => handleShare(e._id)}>
            {e.username}
          </button>
        </div>
      );
    }));
  //*La modale
  let modalChoice = (
    <div className={styles.userContainer}>
      <FontAwesomeIcon
        icon={faXmark}
        onClick={() => showModal()}
        className={styles.xmark}
      />
      <div className={styles.registerSection}>
        <p>Partager à quel utilisateur</p>
        {usersDisplay}
      </div>
    </div>
  );

  //*partager une liste
  const handleShare = (id) => {
    showModal();
    fetch("http://localhost:3000/lists/share", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: id,
        listId: props._id,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("share data", data);
      });
  };

  //*afficher les détails d'une liste
  const handleEye = () => {
    const showList = lists.find((list) => list._id === props._id);
    console.log('variable', showList);
    dispatch(addShowList({id: showList._id, title: showList.title, tasks: showList.tasks }));
  };
console.log('show', showList)
  return (
    <div className={styles.containerList}>
      <p className={styles.text}>{props.title}</p>
      {/* <p className={styles.text}>{props.tasks.length} tasks</p> */}
      <div className={styles.containerIcon}>
        <FontAwesomeIcon
          icon={faShareNodes}
          onClick={showModal}
          className={styles.icon}
        />
        <FontAwesomeIcon
          icon={faTrashCan}
          className={styles.icon}
          onClick={() => handledeleteList()}
        />
        <FontAwesomeIcon
          icon={faEye}
          className={styles.icon}
          onClick={() => handleEye()}
        />
      </div>
      {isModalVisible && (
        <div id="react-modals">
          <Modal
            getContainer="#react-modals"
            className={styles.modal}
            visible={isModalVisible}
            closable={false}
            footer={null}
          >
            {modalChoice}
          </Modal>
        </div>
      )}
    </div>
  );
}

export default List;
