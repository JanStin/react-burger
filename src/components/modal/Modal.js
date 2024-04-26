import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.module.css";

export const Modal = ({ setIsOpen, title }) => {
  return (
    <>
      {/* <div className={styles.body} onClick={() => setIsOpen(false)} /> */}
      <div className={styles.body}>
        <h2>{title}</h2>
        {/* <div className={styles.modal}>
      </div> */}
      </div>
    </>
  );
};

// Modal.propTypes = {
//   data: PropTypes.object.isRequired,
//   number: PropTypes.number,
// }
