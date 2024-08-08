import React, { useEffect } from "react";
import { useDispatch, useSelector } from "../../services/store";
import styles from "./styles.module.css";
import { FeedList } from "../../components/feed-list/feed-list";
import { FeedInfo } from "../../components/feed-info/feed-info";
import { wsConnectionClosed, wsConnectionStart } from "../../services/actions/feed";

export const FeedPage = (): React.JSX.Element => {
  const dispatch = useDispatch();
  useEffect(() => {
    // Подключение к WebSocket
    dispatch(wsConnectionStart());

    return () => {
      dispatch(wsConnectionClosed());
    };
  }, [dispatch]);

  const { wsConnected, error } = useSelector(state => state.feed);
  const { orders } = useSelector(state => state.feed);

  if (error) {
    return <p>Ошибка: {error}</p>;
  }

  if (!wsConnected) {
    return <p>Подключение...</p>;
  }

  return (
    <div>
      <h1>Лента заказов</h1>
      <div className={styles.main}>
        <div className={styles.column}>
          {orders !== null && <FeedList path="/feed/" orders={orders.orders} isShowStatus={false} />}
        </div>
        <div className={styles.column}>
          <FeedInfo />
        </div>
      </div>
    </div>
  );
};
