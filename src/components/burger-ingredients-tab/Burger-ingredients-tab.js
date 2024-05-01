import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.module.css";
import { BurgerCard } from "../burger-card/Burger-card";

export const BurgerIngredientsTab = ({ title, ingredients }) => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.section}>
        {ingredients.map((item) => (
          <BurgerCard
            key={item._id}
            data={item}
            number={1}
            // onClick={}
          />
        ))}
      </div>
    </div>
  );
};

BurgerIngredientsTab.propTypes = {
  title: PropTypes.string.isRequired,
  ingredients: PropTypes.array.isRequired,
};
