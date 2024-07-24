import React from "react";
import styles from "./styles.module.css";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

type TButtonHeader = {
  icon: React.JSX.Element;
  href: string;
  text: string;
};

const ButtonHeader = ({
  icon,
  href,
  text,
}: TButtonHeader): React.JSX.Element => {
  const location = useLocation();

  const isActive = () => {
    if (location.pathname === href) {
      return true;
    }

    const arrayOfPathname = location.pathname.split("/");
    const arrayOfHref = href.split("/");
    if (arrayOfPathname[1] === arrayOfHref[1]) {
      return true;
    }

    return false;
  };

  const active = isActive();

  return (
    <Link
      className={styles.button + " " + (active ? styles.active : "")}
      to={href}
    >
      {icon}
      <p className="text text_type_main-default pl-2">{text}</p>
    </Link>
  );
};

export default React.memo(ButtonHeader);
