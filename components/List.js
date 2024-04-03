import styles from "../styles/List.module.css";
import Task from "./Task";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addShowList, deleteShowList } from "../reducers/showList";
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
  const lists = useSelector((state) => state.lists.value.lists);
  const share = useSelector((state) => state.lists.value.share);
  const show = useSelector((state) => state.showList.value);
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
        if(data){
        dispatch(deleteList(props._id));
        }
      });
  };

  //*afficher tous les utilisateurs sur la modale
  const showModal = () => {
    setIsModalVisible(!isModalVisible);
    fetch("http://localhost:3000/users")
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          setUsersShare(data.data.filter((e) => e._id !== user.id));
        }
      });
  };
  let usersDisplay;
  (usersShare.length === 1) && 
  (usersDisplay =
      <div>
        <button
          className={styles.btn}
          id="register"
          onClick={() => handleShare(usersShare[0]._id)}
        >
          {usersShare[0].username}
        </button>
      </div>
  );
(usersShare.length > 1) &&
    (usersDisplay = usersShare.map((e) => {
      return (
        <div>
          <button
            className={styles.btn}
            id="register"
            onClick={() => handleShare(e._id)}
          >
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
        <p className={styles.textShare}>Share to which user</p>
        <div className={styles.shareUsers}>{usersDisplay}</div>
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
      });
  };

  //*afficher les détails d'une liste
  const handleEye = () => {
    dispatch(deleteShowList());
    let showList = lists.find((list) => list._id === props._id);
    let shareList = share.find((list) => list._id === props._id);

    if (showList) {
      dispatch(
        addShowList({
          id: showList._id,
          title: showList.title,
          tasks: showList.tasks,
        })
      )}
      
      if(shareList) {
          dispatch(
            addShowList({
              id: shareList._id,
              title: shareList.title,
              tasks: shareList.tasks,
            })
          )
          }
  };

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
            open={isModalVisible}
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
