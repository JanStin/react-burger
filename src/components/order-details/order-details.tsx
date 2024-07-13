import styles from "./styles.module.css";
import done from "../../images/done.png";
import { useSelector } from "react-redux";
import React from "react";
import { TRootState, TOrderResponse } from "../../utils/types";

type TOrderDetails = {
  loading: boolean;
  order: TOrderResponse | null;
  error: boolean;
};

export const OrderDetails = (): React.JSX.Element => {
  const { loading, order, error }: TOrderDetails = useSelector(
    (state: TRootState) => state.order
  );

  const isTOrder = (data: any): data is TOrderResponse => {
    return data && typeof data === "object" && "order" in data;
  };

  return (
    <div className={styles.body}>
      {loading && "Загрузка..."}
      {error && "Произошла ошибка"}
      {!loading && !error && isTOrder(order) && (
        <>
          <p className={styles.numbers}>{order.order.number}</p>
          <p className={styles.bigText}>идентификатор заказа</p>
          <img className={styles.image} src={done} alt="" />
          <p className={styles.text}>Ваш заказ начали готовить</p>
          <p className={styles.grayText}>
            Дождитесь готовности на орбитальной станции
          </p>
        </>
      )}
    </div>
  );
};
