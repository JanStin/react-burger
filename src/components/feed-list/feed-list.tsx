import styles from "./styles.module.css";
import { useSelector } from "../../services/store";
import { TRootState } from "../../services/store";
import { FormattedDate  } from "@ya.praktikum/react-developer-burger-ui-components";
import { FeedIcons } from "../feed-icons/feed-icons";
import { OrderPrice } from "../order-price/order-price";


export const FeedList = (): React.JSX.Element => {
  const { orders } = useSelector((state: TRootState) => state.feed);
  const isShowStatus: boolean = false;

  return (
    <ul className={styles.body}>
      {orders !== null && orders.orders.map((order) => (
        <li key={order._id} className={styles.order}>
          <div className={styles.line}>
            <p className={styles.number}>#{order.number}</p>
            <FormattedDate date={new Date(order.createdAt)}/>
          </div>
          {isShowStatus && (
            <p className={styles.status}>Статус: {order.status}</p>
          )}
          <p className={styles.name}>Название: {order.name}</p>
          <div className={styles.line}>
            <div className={styles.ingredients}>
              <FeedIcons order={order.ingredients} />
            </div>
            <OrderPrice ingredients={order.ingredients} />
          </div>
        </li>
      ))}
    </ul>
  );
};
