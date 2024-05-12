import React from "react";
import PropTypes from "prop-types";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { ModalOverlay } from "../modal-overlay/ModalOverlay";
import styles from "./styles.module.css";

export const Modal = ({ onTrigger, title, children }) => {
  const closeButton = "Escape";
  React.useEffect(() => {
    const close = (e) => {
      if (e.key === closeButton) {
        onTrigger();
      }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [onTrigger, children]);

  return (
    <ModalOverlay onTrigger={onTrigger}>
      <div className={styles.body}>
        <button className={styles.close} onClick={() => onTrigger()}>
          <CloseIcon type="primary" />
        </button>
        <div className={styles.top}>
          {title && <h2 className={styles.title}>{title}</h2>}
        </div>
        {children}
      </div>
    </ModalOverlay>
  );
};

Modal.propTypes = {
  onTrigger: PropTypes.func.isRequired,
  title: PropTypes.string,
  children: PropTypes.element.isRequired,
};
