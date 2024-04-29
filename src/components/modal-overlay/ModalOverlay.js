import React from "react";
import PropTypes from "prop-types";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./styles.module.css";
import { createPortal } from "react-dom";

export const ModalOverlay = ({ setIsOpen, children }) => {
  React.useEffect(() => {
    const close = (e) => {
      if (e.keyCode === 27) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [setIsOpen, children]);

  const id = document.getElementById("modal-root");
  const modal = (
    <>
      <div className={styles.overflow} onClick={() => setIsOpen(false)} />
      <div className={styles.centered}>
        <button className={styles.close} onClick={() => setIsOpen(false)}>
          <CloseIcon type="primary" />
        </button>
        {children}
      </div>
    </>
  );

  return createPortal(modal, id);
};

ModalOverlay.propTypes = {
  setIsOpen: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
};
