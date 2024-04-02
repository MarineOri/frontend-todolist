import styles from "../styles/Header.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faXmark,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../reducers/user";
import { deleteLists } from "../reducers/lists";
import { deleteNewList } from "../reducers/newlist";
import { Modal } from "antd";
import { deleteShowList } from "../reducers/showList";

function Header() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [signUpUsername, setSignUpUsername] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [signInUsername, setSignInUsername] = useState("");
  const [signInPassword, setSignInPassword] = useState("");
  const [errorMsgUp, setErrorMsgUp] = useState("");
  const [errorMsgIn, setErrorMsgIn] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();
    usernameUpValidity(signUpUsername) &&
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
            setErrorMsgUp(data.error);
          }
        });
    // .catch((error) => console.log(error));
  };

  const handleSignin = (e) => {
    e.preventDefault();
    usernameInValidity(signInUsername) &&
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
            setErrorMsgIn(data.error);
          }
        });
    // .catch((error) => console.log(error));
  };

  const handleLogout = () => {
    dispatch(logout());
    dispatch(deleteLists());
    dispatch(deleteNewList());
    dispatch(deleteShowList())
  };

  const showModal = () => {
    setIsModalVisible(!isModalVisible);
    setErrorMsgIn("");
    setErrorMsgUp("");
    setSignInPassword("");
    setSignInUsername("");
    setSignUpPassword("");
    setSignUpUsername("");
  };

  const usernameUpValidity = (username) => {
    const regex = /^[a-zA-Z0-9-çàéèêîô\s,.'-]{3,}$/;
    if (regex.test(username) === false) {
      setErrorMsgUp("Minimum 3 letters");
      return;
    } else {
      setErrorMsgIn("");
      setErrorMsgUp("");
      return true;
    }
  };

  const usernameInValidity = (username) => {
    const regex = /^[a-zA-Z0-9-çàéèêîô\s,.'-]{3,}$/;
    if (regex.test(username) === false) {
      username === signInUsername && setErrorMsgIn("Minimum 3 letters");
      return;
    } else {
      setErrorMsgIn("");
      setErrorMsgUp("");
      return true;
    }
  };

  let modalConnection = (
    <div className={styles.userContainer}>
      <div className={styles.registerSection}>
        <p className={styles.titleRegister}>S'inscrire</p>
        <form onSubmit={handleSignin} className={styles.signupForm}>
          <label htmlFor="Username" className={styles.label}>
            Username
          </label>
          <input
            className={styles.inputUpUsername}
            type="text"
            placeholder="Username..."
            id="signUpUsername"
            onChange={(e) => {
              setSignUpUsername(e.target.value);
              setErrorMsgUp("");
            }}
            value={signUpUsername}
          />
          <label htmlFor="Password" className={styles.label}>
            Password
          </label>
          <input
            className={styles.inputUpPass}
            type="password"
            placeholder="Password..."
            id="signUpPassword"
            onChange={(e) => {
              setSignUpPassword(e.target.value);
              setErrorMsgUp("");
            }}
            value={signUpPassword}
          />
          <p className={styles.errorMsg}>{errorMsgUp}</p>
          <button
            id="register"
            onClick={(e) => handleSignup(e)}
            className={styles.btn}
          >
            OK
          </button>
        </form>
      </div>
      <FontAwesomeIcon
        icon={faXmark}
        onClick={() => showModal()}
        className={styles.xmark}
      />
      <div className={styles.registerSection}>
        <p className={styles.titleRegister}>Se connecter</p>
        <form onSubmit={handleSignin} className={styles.signinForm}>
          <label htmlFor="Username" className={styles.label}>
            Username
          </label>
          <input
            className={styles.inputInUsername}
            type="text"
            placeholder="Username..."
            id="signInUsername"
            onChange={(e) => {
              setSignInUsername(e.target.value);
              setErrorMsgIn("");
            }}
            value={signInUsername}
          />
          <label htmlFor="Password" className={styles.label}>
            Password
          </label>
          <input
            className={styles.inputInPass}
            type="password"
            placeholder="Password..."
            id="signInPassword"
            onChange={(e) => {
              setSignInPassword(e.target.value);
              setErrorMsgIn("");
            }}
            value={signInPassword}
          ></input>
          <p className={styles.errorMsg}>{errorMsgIn}</p>
          <button
            id="connection"
            onClick={(e) => handleSignin(e)}
            className={styles.btn}
          >
            OK
          </button>
        </form>
      </div>
    </div>
  );

  return (
    <header className={styles.containerHeader}>
      <div className={styles.logoContainer}>
        <img className={styles.img} src="./logo2.png" alt="Logo" />
        <h3 className={styles.title}>To do list</h3>

        {user.token ? (
          <div className={styles.logoutSection}>
            <FontAwesomeIcon
              icon={faRightFromBracket}
              onClick={() => handleLogout()}
              className={styles.logout}
            />
            <p className={styles.text}>Bienvenue {user.username}!</p>
          </div>
        ) : (
          <div className={styles.userSection}>
            <FontAwesomeIcon
              onClick={showModal}
              icon={faUser}
              className={styles.user}
            />
          </div>
        )}
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
            {modalConnection}
          </Modal>
        </div>
      )}
    </header>
  );
}

export default Header;
