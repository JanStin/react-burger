import React, { useEffect } from "react";
import { useDispatch, useSelector } from "../../services/store";
import {
  wsConnectionStart,
  // wsConnectionClosed,
} from "../../services/actions/feed";
import { TRootState } from "../../services/store";
import styles from "./styles.module.css";
import { FeedList } from "../../components/feed-list/feed-list";
import { FeedInfo } from "../../components/feed-info/feed-info"

export const FeedPage = (): React.JSX.Element => {
  const dispatch = useDispatch();
  const { wsConnected, error } = useSelector((state: TRootState) => state.feed);

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
        <div className={styles.column}>
          <FeedList />
        </div>
        <div className={styles.column}>
          <FeedInfo />
        </div>
      </div>
    </div>
  );
};
