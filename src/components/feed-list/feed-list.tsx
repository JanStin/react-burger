import styles from "./styles.module.css";
import { useSelector } from "../../services/store";
import { TRootState } from "../../services/store";
import { CurrencyIcon, FormattedDate  } from "@ya.praktikum/react-developer-burger-ui-components";
import { useCallback } from "react";
import { FeedIcons } from "../feed-icons/feed-icons";

export const FeedList = (): React.JSX.Element => {
  const { orders } = useSelector((state: TRootState) => state.feed);
  const { ingredients } = useSelector((state: TRootState) => state.ingredients);
  const isShowStatus: boolean = false;

  const sum = useCallback((order: string[]): number => {
    if (ingredients === null) {
      return 0;
    }

    const ingredientMap = new Map<string, number>();

    ingredients.forEach((ingredient) => {
      ingredientMap.set(ingredient._id, ingredient.price);
    });

    const result = order.reduce((total, id) => {
      const price = ingredientMap.get(id);
      return total + (price !== undefined ? price : 0);
    }, 0);

    return result;
  }, [ingredients]);

  return (
    <ul className={styles.body}>
      {orders.map((order) => (
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
            <div className={styles.price}>
              {sum(order.ingredients)}
              <CurrencyIcon type="primary" />
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};
