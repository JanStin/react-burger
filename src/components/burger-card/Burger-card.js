import React from "react";
import PropTypes from "prop-types";
import styles from './styles.module.css';
import { CurrencyIcon, Counter } from "@ya.praktikum/react-developer-burger-ui-components";

export const BurgerCard = ({ number, data }) => {
  return (
    <div className={styles.card} data-id={data._id}>
      {number && <Counter count={1} size="default" extraClass={styles.number} />}
      <img src={data.image} className={styles.image} alt={data.name} />
      <div className={styles.price}>
        <span className={styles.span}>{data.price}</span> <CurrencyIcon />
      </div>
      <p className={styles.name}>{data.name}</p>
    </div>
  );
};

BurgerCard.propTypes = {
  data: PropTypes.object.isRequired,
  number: PropTypes.number,
}
