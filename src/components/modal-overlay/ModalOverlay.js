import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.module.css";
import { createPortal } from "react-dom";

export const ModalOverlay = ({ setIsOpen, children }) => {
  const id = document.getElementById("modal-root");
  const modal = (
    <>
      <div className={styles.overflow} onClick={() => setIsOpen(false)} />
      <div className={styles.centered}>{children}</div>
    </>
  );

  return createPortal(modal, id);
};

ModalOverlay.propTypes = {
  setIsOpen: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
};
