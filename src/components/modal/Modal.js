import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.module.css";

export const Modal = ({ title, children }) => {
  return (
    <div className={styles.body}>
      <div className={styles.top}>
        {
          title && (<h2 className={styles.title}>{title}</h2>)
        }
      </div>
        {children}
    </div>
  );
};

Modal.propTypes = {
  title: PropTypes.string,
  children: PropTypes.element.isRequired,
}
