import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.module.css";

const ButtonHeader = ({ icon, href, text, active }) => (
  <a className={styles.button + " " + (active ? styles.active : "")} href={href}>
    {icon}
    <p className="text text_type_main-default pl-2">{text}</p>
  </a>
);

ButtonHeader.propTypes = {
  icon: PropTypes.element.isRequired,
  text: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  active: PropTypes.bool,
};

export default React.memo(ButtonHeader);
