import styles from "./styles.module.css";
import { FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";
import { FeedIcons } from "../feed-icons/feed-icons";
import { OrderPrice } from "../order-price/order-price";
import { getDate } from "../../utils/utils";
import { Link, useLocation } from "react-router-dom";
import { TOrderDetails } from "../../utils/types";

type TFeedList = {
  path: string;
  orders: TOrderDetails[];
  isShowStatus: boolean;
};

export const FeedList = ({
  path,
  orders,
  isShowStatus,
}: TFeedList): React.JSX.Element => {
  const location = useLocation();

  enum Status {
    "done" = "Выполнен",
    "created" = "Готовится",
    "pending" = "Создан",
  }

  const orderStatus = (orderStatus: string): string => {
    if (orderStatus in Status) {
      return Status[orderStatus as keyof typeof Status];
    }
    return "Неизвестный статус";
  };

  return (
    <ul className={styles.body}>
      {orders !== null &&
        orders.map((order) => (
          <li key={order._id} className={styles.order}>
            <Link
              key={order._id}
              // Тут мы формируем динамический путь для нашего ингредиента
              to={`${path}${order.number}`}
              // а также сохраняем в свойство background роут,
              // на котором была открыта наша модалка
              state={{ background: location }}
              className={styles.link}
            >
              <div className={styles.line}>
                <p className={styles.number}>#{order.number}</p>
                <FormattedDate date={getDate(order.createdAt)} />
              </div>
              {isShowStatus && (
                <p className={styles.status}>Статус: {orderStatus(order.status)}</p>
              )}
              <p className={styles.name}>Название: {order.name}</p>
              <div className={styles.line}>
                <div className={styles.ingredients}>
                  <FeedIcons order={order.ingredients} />
                </div>
                <OrderPrice ingredients={order.ingredients} />
              </div>
            </Link>
          </li>
        ))}
    </ul>
  );
};
