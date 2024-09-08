import { useEffect } from "react";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { ModalOverlay } from "../modal-overlay/modal-overlay";
import styles from "./styles.module.css";

type TModal = {
  onTrigger: () => void;
  title?: string;
  children: React.JSX.Element;
};

export const Modal = ({
  onTrigger,
  title,
  children,
}: TModal): React.JSX.Element => {
  const closeButton = "Escape";
  useEffect(() => {
    const close = (e: KeyboardEvent): void => {
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
        <button className={styles.close} onClick={() => onTrigger()} data-test-id="close">
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
