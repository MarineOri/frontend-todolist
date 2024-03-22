import styles from "../styles/List.module.css";
import Task from "./Task";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addList, deleteList } from "../reducers/lists";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShareNodes, faXmark } from "@fortawesome/free-solid-svg-icons";
import { Modal } from "antd";

function List(props) {
  const user = useSelector((state) => state.user.value);
  const lists = useSelector((state) => state.lists.value);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [usersShare, setUsersShare] = useState("");
  const dispatch = useDispatch();

  // /**supprimer une liste */
  // const deleteList = () => {
  //   dispatch(deleteList(props._id));
  //   fetch("http://localhost:3000/lists/deleteList", {
  //     method: "DELETE",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({
  //       listId: props._id,
  //     }),
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log("delete data", data);
  //     });
  // };

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
  console.log("usersShare", usersShare);
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

  /**partager une liste */
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
      <FontAwesomeIcon icon={faShareNodes} onClick={showModal} />
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
