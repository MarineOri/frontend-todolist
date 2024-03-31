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
import { deleteNewList } from "../reducers/newlist";
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
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    setDate(new Date());
  }, []);

  const handleSignup = () => {
    usernameValidity(signUpUsername) &&
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
          } else {
            setErrorMsg(data.error);
          }
        })
        .catch((error) => console.log(error));
  };

  const handleSignin = () => {
    usernameValidity(signInUsername) &&
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
          } else {
            setErrorMsg(data.error);
          }
        })
        .catch((error) => console.log(error));
  };

  const handleLogout = () => {
    dispatch(logout());
    dispatch(deleteLists());
    dispatch(deleteNewList());
  };

  const showModal = () => {
    setIsModalVisible(!isModalVisible);
    setErrorMsg("");
    setSignInPassword("");
    setSignInUsername("");
    setSignUpPassword("");
    setSignUpUsername("");
  };

  //username
  const usernameValidity = (username) => {
    const regex = /^[a-zA-Z0-9-çàéèêîô\s,.'-]{3,}$/; // accepte 3 caractères minimum
    if (username === "") {
      setErrorMsg("Le username est vide !");
      return;
    } else if (regex.test(username) === false) {
      setErrorMsg("Pseudo non valide (min. 3 caractères)");
      return;
    } else {
      setErrorMsg("");
      return true;
    }
  };

  let modalConnection;
  if (!user.token) {
    modalConnection = (
      <div className={styles.userContainer}>
        <FontAwesomeIcon
          icon={faXmark}
          onClick={() => showModal()}
          className={styles.xmark}
        />
        <div className={styles.registerSection}>
          <p>S'inscrire</p>
          <label htmlFor="Username">Username</label>
          <input
            type="text"
            placeholder="Username"
            id="signUpUsername"
            onChange={(e) => {
              setSignUpUsername(e.target.value);
              setErrorMsg("");
            }}
            value={signUpUsername}
          />
          <label htmlFor="Password">Password</label>
          <input
            type="password"
            placeholder="Password"
            id="signUpPassword"
            onChange={(e) => {
              setSignUpPassword(e.target.value);
              setErrorMsg("");
            }}
            value={signUpPassword}
          />
          <p className={styles.errorMsg}>{errorMsg}</p>
          <button id="register" onClick={() => handleSignup()}>
            Register
          </button>
        </div>
        <div className={styles.registerSection}>
          <p>Se connecter</p>
          <label htmlFor="Username">Username</label>
          <input
            type="text"
            placeholder="Username"
            id="signInUsername"
            onChange={(e) => {
              setSignInUsername(e.target.value);
              setErrorMsg("");
            }}
            value={signInUsername}
          />
          <label htmlFor="Password">Password</label>
          <input
            type="password"
            placeholder="Password"
            id="signInPassword"
            onChange={(e) => {
              setSignInPassword(e.target.value);
              setErrorMsg("");
            }}
            value={signInPassword}
          />
          <p className={styles.errorMsg}>{errorMsg}</p>
          <button id="connection" onClick={() => handleSignin()}>
            Connect
          </button>
        </div>
      </div>
    );
  }

  let userSection;
  user.token
    ? (userSection = (
        <div className={styles.logoutSection}>
          <FontAwesomeIcon
            icon={faRightFromBracket}
            onClick={() => handleLogout()}
          />
        </div>
      ))
    : isModalVisible
    ? (userSection = (
        <div className={styles.userclose}>
          <FontAwesomeIcon icon={faXmark} className={styles.xmark} />
        </div>
      ))
    : (userSection = (
        <div className={styles.userSection}>
          <FontAwesomeIcon
            onClick={showModal}
            icon={faUser}
            className={styles.user}
          />
        </div>
      ));

  return (
    <header className={styles.containerHeader}>
      <div className={styles.logoContainer}>
        <img className={styles.img} src="./logo2.png" alt="Logo" />
        <h3 className={styles.title}>To do list</h3>
        {userSection}
      </div>
      {/* <div className={styles.center}>
        <h1 className={styles.title}>Bienvenue {user.username}!</h1>
        <Moment
          className={styles.date}
          date={date}
          format="MMM Do YYYY, h:mm:ss a"
        />
      </div> */}
      {isModalVisible && (
        <div id="react-modals">
          <Modal
            getContainer="#react-modals"
            className={styles.modal}
            open={isModalVisible}
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
