import styles from "../styles/Header.module.css";
import Moment from "react-moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faXmark,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../reducers/user";
import { deleteLists } from "../reducers/lists";
import { Modal } from "antd";

function Header() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);
  const [date, setDate] = useState("2050-11-22T23:59:59");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [signUpUsername, setSignUpUsername] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [signInUsername, setSignInUsername] = useState("");
  const [signInPassword, setSignInPassword] = useState("");

  useEffect(() => {
    setDate(new Date());
  }, []);

  const handleSignup = () => {
    fetch("http://localhost:3000/users/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: signUpUsername,
        password: signUpPassword,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          console.log(data);
          dispatch(
            login({
              username: signUpUsername,
              token: data.newDoc.token,
              id: data.newDoc._id,
            })
          );
          setSignUpUsername("");
          setSignUpPassword("");
          setIsModalVisible(false);
        }
      });
  };

  const handleSignin = () => {
    fetch("http://localhost:3000/users/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: signInUsername,
        password: signInPassword,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          console.log(data);
          dispatch(
            login({
              username: signInUsername,
              token: data.data.token,
              id: data.data._id,
            })
          );
          setSignInUsername("");
          setSignInPassword("");
          setIsModalVisible(false);
        }
      });
  };

  const showModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  let modalConnection;
  if (!user.isConnected) {
    modalConnection = (
      <div className={styles.userContainer}>
        <FontAwesomeIcon
          icon={faXmark}
          onClick={() => showModal()}
          className={styles.xmark}
        />
        <div className={styles.registerSection}>
          <p>Sign-up</p>
          <input
            type="text"
            placeholder="Username"
            id="signUpUsername"
            onChange={(e) => setSignUpUsername(e.target.value)}
            value={signUpUsername}
          />
          <input
            type="password"
            placeholder="Password"
            id="signUpPassword"
            onChange={(e) => setSignUpPassword(e.target.value)}
            value={signUpPassword}
          />
          <button id="register" onClick={() => handleSignup()}>
            Register
          </button>
        </div>
        <div className={styles.registerSection}>
          <p>Sign-in</p>
          <input
            type="text"
            placeholder="Username"
            id="signInUsername"
            onChange={(e) => setSignInUsername(e.target.value)}
            value={signInUsername}
          />
          <input
            type="password"
            placeholder="Password"
            id="signInPassword"
            onChange={(e) => setSignInPassword(e.target.value)}
            value={signInPassword}
          />
          <button id="connection" onClick={() => handleSignin()}>
            Connect
          </button>
        </div>
      </div>
    );
  }

  return (
    <header className={styles.containerHeader}>
      <div className={styles.left}>
        <img className={styles.img} src="./logo2.png" alt="Logo" />
        <h3 className={styles.title}>To do list</h3>
      </div>
      <div className={styles.center}>
        <h1 className={styles.title}>Bienvenue {user.username}!</h1>
        <Moment
          className={styles.date}
          date={date}
          format="MMM Do YYYY, h:mm:ss a"
        />
      </div>
      <div className={styles.right}>
        <FontAwesomeIcon
          onClick={showModal}
          icon={faUser}
          className={styles.user}
        />
        <FontAwesomeIcon
          icon={faRightFromBracket}
          onClick={() => dispatch(logout()) && dispatch(deleteLists())}
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
            {modalConnection}
          </Modal>
        </div>
      )}
    </header>
  );
}

export default Header;
