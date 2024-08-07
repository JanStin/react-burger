import styles from "./styles.module.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { TRootState, useSelector } from "../../services/store";
import { TOrder } from "../../services/actions/feed";
import { api } from "../../utils/api";
import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { OrderPrice } from "../order-price/order-price";
import { getDate } from "../../utils/utils";

export const DetailsOfOrder = (): React.JSX.Element => {
  const { number } = useParams<{ number: string }>();
  const { orders } = useSelector((state: TRootState) => state.feed);
  const { ingredients } = useSelector((state: TRootState) => state.ingredients);
  const [order, setOrder] = useState<TOrder | null | false>(false);

  useEffect(() => {
    const fetchOrder = (orderNumber: string) => {
      api
        .fetchOrder(orderNumber)
        .then((data) => {
          if (data.success && data.orders.length === 1) {
            setOrder(data.orders[0]);
          } else {
            setOrder(null);
          }
        })
        .catch((error) => {
          console.error("Ошибка в запросе: ", error);
          setOrder(null);
        });
    };

    if (typeof number === "string") {
      if (orders !== null) {
        const byOrder =
          orders.orders.find((item) => item._id === number) || null;
        if (byOrder !== null) {
          setOrder(byOrder);
        } else {
          fetchOrder(number);
        }
      } else {
        fetchOrder(number);
      }
    }
  }, [number, orders]);

  enum Status {
    "done" = "Выполнен",
    "created" = "Готовится",
    "pending" = "В ожидании",
  }

  const orderStatus = (orderStatus: string): string => {
    if (orderStatus in Status) {
      return Status[orderStatus as keyof typeof Status];
    }
    return "Неизвестный статус";
  };

  if (order === null) {
    return <div className={styles.body}>Такого заказа нет</div>;
  }

  if (order === false) {
    return <div className={styles.body}>Загрузка</div>;
  }

  const countMap = order?.ingredients.reduce((acc, id) => {
    acc[id] = (acc[id] || 0) + 1;
    return acc;
  }, {} as { [key: string]: number });

  const enrichedIngredients = ingredients
    ?.map((ingredient) => ({
      ...ingredient,
      count: countMap[ingredient._id] || 0,
    }))
    .filter((item) => item.count > 0);

  return (
    <div className={styles.body}>
      <p className={styles.number}>#{order.number}</p>
      <p className={styles.name}>{order.name}</p>
      <p className={styles.status}>{orderStatus(order.status)}</p>
      <p className={styles.name}>Состав:</p>
      <ul className={styles.compound}>
        {typeof enrichedIngredients !== "undefined" &&
          enrichedIngredients.map((item) => (
            <li key={item._id} className={styles.position}>
              <div className={styles.icon}>
                <img className={styles.image} src={item.image_mobile} alt={item.name} />
              </div>
              <p className={styles.title}>{item.name}</p>
              <div className={styles.price}>
                <p className={styles.number}>
                  {item.count} x {item.price}
                </p>
                <CurrencyIcon type="primary" />
              </div>
            </li>
          ))}
      </ul>
      <div className={styles.line}>
        <FormattedDate date={getDate(order.createdAt)} />
        <OrderPrice ingredients={order.ingredients} />
      </div>
    </div>
  );
};
