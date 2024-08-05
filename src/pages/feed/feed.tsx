import React, { useEffect } from "react";
import { useDispatch, useSelector } from "../../services/store";
import {
  wsConnectionStart,
  // wsConnectionClosed,
} from "../../services/actions/feed";
import { TRootState } from "../../services/store";
import styles from "./styles.module.css";

export const FeedPage = (): React.JSX.Element => {
  const dispatch = useDispatch();
  const { orders, wsConnected, error } = useSelector(
    (state: TRootState) => state.feed
  );

  useEffect(() => {
    // Подключение к WebSocket при монтировании компонента
    dispatch(wsConnectionStart());

    // Закрытие WebSocket при размонтировании компонента
    // return () => {
    //   dispatch(wsConnectionClosed());
    // };
  }, [dispatch]);

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
        <ul className={styles.column}>
          {orders.map((order) => (
            <li key={order._id}>
              <p>Номер заказа: {order.number}</p>
              <p>Название: {order.name}</p>
              <p>Статус: {order.status}</p>
            </li>
          ))}
        </ul>
        <div className={styles.column}></div>
      </div>
    </div>
  );
};
