import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.module.css";

const ButtonHeader = ({ icon, text, active }) => (
  <div className={styles.button + " " + (active ? styles.active : "")}>
    {icon}
    <p className="text text_type_main-default pl-2">{text}</p>
  </div>
);

ButtonHeader.propTypes = {
  icon: PropTypes.element.isRequired,
  text: PropTypes.string.isRequired,
  active: PropTypes.bool,
};

export default ButtonHeader;
