import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.module.css";
import { BurgerCard } from "../burger-card/Burger-card";

export const BurgerIngredientsTab = ({ title, data }) => {
  return (
    <div className="mb-10">
      <h2 className="text text_type_main-medium mt-10 mb-5">{title}</h2>
      <div className={styles.section}>
        {data.map((item) => (
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
  data: PropTypes.array.isRequired,
};
