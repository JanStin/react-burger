import styles from "./styles.module.css";
import { Link } from "react-router-dom";
import { useCallback, MouseEvent, useEffect } from "react";
import { useDispatch, useSelector } from "../../services/store";
import { logout } from "../../services/actions/auth";
import { FeedList } from "../../components/feed-list/feed-list";
import { TOrderDetails } from "../../utils/types";
import {
  wsUserConnectionClosed,
  wsUserConnectionStart,
} from "../../services/actions/userFeed";

export const ProfileOrdersPage = (): React.JSX.Element => {
  const dispatch = useDispatch();
  const { wsConnected, error } = useSelector(state => state.feed);
  const { orders } = useSelector(state => state.userFeed);
  const user = useSelector(store => store.user.user);

  useEffect(() => {
    // Подключение к WebSocket
    dispatch(wsUserConnectionStart());

    return () => {
      dispatch(wsUserConnectionClosed());
    };
  }, [dispatch, user]);

  const logoutClick = useCallback(
    (e: MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      dispatch(logout());
    },
    [dispatch]
  );

  const sortByCreatedAt = (orders: TOrderDetails[]) => {
    return [...orders].sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return  dateB.getTime() - dateA.getTime();
    });
  };

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
        {error && orders === null && <p>Ошибка: {error}</p>}
        {!wsConnected && orders === null && <p>Подключение...</p>}
        {orders !== null && (
          <FeedList
            path="/profile/orders/"
            orders={sortByCreatedAt(orders.orders)}
            isShowStatus={true}
          />
        )}
      </div>
    </div>
  );
};
