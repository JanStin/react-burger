import styles from "./styles.module.css";
import { Link } from "react-router-dom";
import { useCallback, MouseEvent } from "react";
import { TRootState, useDispatch, useSelector } from "../../services/store";
import { logout } from "../../services/actions/auth";
import { FeedList } from "../../components/feed-list/feed-list";

export const ProfileOrdersPage = (): React.JSX.Element => {
  const dispatch = useDispatch();
  const { orders } = useSelector((state: TRootState) => state.userFeed);

  const logoutClick = useCallback(
    (e: MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
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
      <div className={styles.main}>
        {orders !== null && (
          <FeedList
            path="/profile/orders/"
            orders={orders.orders}
            isShowStatus={true}
          />
        )}
      </div>
    </div>
  );
};
