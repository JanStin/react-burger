import React from "react";
import styles from "./styles.module.css";
import done from "../../images/done.png"

export const OrderDetails = () => {
  return (
    <div className={styles.body}>
      <p className={styles.numbers}>034536</p>
      <p className={styles.bigText}>идентификатор заказа</p>
      <img className={styles.image} src={done} alt="" />
      <p className={styles.text}>Ваш заказ начали готовить</p>
      <p className={styles.grayText}>Дождитесь готовности на орбитальной станции</p>
    </div>
  );
};

// Modal.propTypes = {
//   data: PropTypes.object.isRequired,
//   number: PropTypes.number,
// }
