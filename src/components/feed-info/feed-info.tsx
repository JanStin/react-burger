import styles from "./styles.module.css";
import { useSelector } from "../../services/store";
import { TRootState } from "../../services/store";

export const FeedInfo = (): React.JSX.Element => {
  const { orders } = useSelector(state => state.feed);
  const done = "done";

  if (orders === null) {
    return <></>;
  }

  return (
    <div>
      <div className={styles.section}>
        <div className={styles.column}>
          <p className={styles.label}>Готовы:</p>
          <ul className={styles.list}>
            {orders.orders
              .filter((order) => order.status === done)
              .map((order) => (
                <li className={`${styles.number} ${styles.numberColor}`} key={order._id}>
                  {order.number}
                </li>
              ))}
          </ul>
        </div>
        <div className={styles.column}>
          <p className={styles.label}>В работе:</p>
          <ul className={styles.list}>
            {orders.orders
              .filter((order) => order.status !== done)
              .map((order) => (
                <li className={styles.number} key={order._id}>
                  {order.number}
                </li>
              ))}
          </ul>
        </div>
      </div>
      <p className={styles.title}>Выполнено за все время:</p>
      <p className={styles.total}>{orders.total}</p>
      <p className={styles.title}>Выполнено за сегодня:</p>
      <p className={styles.total}>{orders.totalToday}</p>
    </div>
  );
};
