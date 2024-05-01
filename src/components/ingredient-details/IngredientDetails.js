import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.module.css";

export const IngredientDetails = ({ data }) => {
  return (
    <div className={styles.body}>
      <img className={styles.image} src={data.image_large} alt="" />
      <p className={styles.title}>{data.name}</p>
      <div className={styles.values}>
        <div className={styles.value}>
          <p>Калории,ккал</p>
          <p className={styles.number}>{data.calories}</p>
        </div>
        <div className={styles.value}>
          <p>Белки, г</p>
          <p className={styles.number}>{data.proteins}</p>
        </div>
        <div className={styles.value}>
          <p>Жиры, г</p>
          <p className={styles.number}>{data.fat}</p>
        </div>
        <div className={styles.value}>
          <p>Углеводы, г</p>
          <p className={styles.number}>{data.carbohydrates}</p>
        </div>
      </div>
    </div>
  );
};

IngredientDetails.propTypes = {
  data: PropTypes.object.isRequired,
};
