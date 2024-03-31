import styles from "../styles/Footer.module.css";
import Moment from "react-moment";
import { useState, useEffect } from "react";

function Footer() {
  const [date, setDate] = useState("2050-11-22T23:59:59");

  useEffect(() => {
    setDate(new Date());
  }, [date]);

  return (
    <div className={styles.footerContainer}>
      <Moment
        className={styles.date}
        date={date}
        format="MMM Do YYYY, h:mm:ss a"
      />
    </div>
  );
}

export default Footer;
