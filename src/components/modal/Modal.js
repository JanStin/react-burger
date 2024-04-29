import React from "react";
import PropTypes from "prop-types";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./styles.module.css";

export const Modal = ({ setIsOpen, title, children }) => {
  React.useEffect(() => {
    const close = (e) => {
      if (e.keyCode === 27) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [setIsOpen, children]);

  return (
    <div className={styles.body}>
      <button className={styles.close} onClick={() => setIsOpen(false)}>
        <CloseIcon type="primary" />
      </button>
      <div className={styles.top}>
        {title && <h2 className={styles.title}>{title}</h2>}
      </div>
      {children}
    </div>
  );
};

Modal.propTypes = {
  setIsOpen: PropTypes.func.isRequired,
  title: PropTypes.string,
  children: PropTypes.element.isRequired,
};
