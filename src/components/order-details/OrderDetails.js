import styles from "./styles.module.css";
import done from "../../images/done.png";
import { useSelector } from "react-redux";

export const OrderDetails = () => {
  const { loading, order, error } = useSelector((state) => state.order);

  return (
    <div className={styles.body}>
      {loading && "Загрузка..."}
      {error && "Произошла ошибка"}
      {!loading && !error && order && (
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
