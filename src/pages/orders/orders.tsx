import styles from "./styles.module.css";
import { Link } from "react-router-dom";
import { useCallback, MouseEvent } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../services/actions/auth";

export const ProfileOrdersPage = (): React.JSX.Element => {
  const dispatch = useDispatch();

  const logoutClick = useCallback(
    (e: MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      // @ts-ignore
      dispatch(logout());
    },
    [dispatch]
  );

  return (
    <div className={styles.body}>
      <div className={styles.side}>
        <Link to="/profile" className={styles.link}>
          Профиль
        </Link>
        <Link to="/profile/orders" className={styles.active}>
          История заказов
        </Link>
        <a className={styles.link} onClick={logoutClick} href="/logout">
          Выход
        </a>
      </div>
    </div>
  );
};
