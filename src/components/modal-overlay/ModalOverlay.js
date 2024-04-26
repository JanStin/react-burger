import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.module.css";

export const ModalOverlay = ({ setIsOpen, children }) => {
  React.useEffect(() => {
    const close = (e) => {
      if (e.keyCode === 27) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);

  return (
    <>
      <div className={styles.overflow} onClick={() => setIsOpen(false)} />
      <div className={styles.centered}>
        {children}
      </div>
    </>
  );
};

// Modal.propTypes = {
//   data: PropTypes.object.isRequired,
//   number: PropTypes.number,
// }
