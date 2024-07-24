import styles from "./styles.module.css";
import { createPortal } from "react-dom";
import React from "react";

type TModalOverlay = {
  onTrigger: () => void;
  children: React.JSX.Element
}

export const ModalOverlay = ({ onTrigger, children }: TModalOverlay): React.JSX.Element => {
  const id = document.getElementById("modal-root")!;
  const modal = (
    <>
      <div className={styles.overflow} onClick={() => onTrigger()} />
      <div className={styles.centered}>{children}</div>
    </>
  );

  return createPortal(modal, id);
};
