import React from "react";
import PropTypes from "prop-types";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./styles.module.css";

export const Modal = ({ setIsOpen, title, children }) => {
  return (
    <div className={styles.body}>
      <div className={styles.close} onClick={() => setIsOpen(false)}>
        <CloseIcon type="primary" />
      </div>
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
  setIsOpen: PropTypes.func,
  title: PropTypes.string,
  number: PropTypes.element,
}
