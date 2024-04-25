import React from "react";
// import PropTypes from 'prop-types';
import "./Burger-ingredients-tab.module.css";
import { BurgerCard } from "../burger-card/Burger-card";

export const BurgerIngredientsTab = ({ title, data }) => {
  return (
    <div className="mb-10">
      <h2 className="text text_type_main-medium mt-10 mb-5">{title}</h2>
      <div className="section">
        {data.map((item) => (
          <BurgerCard
            key={item._id}
            data={item}
            number={false}
            // onClick={this.setCurrentType}
          />
        ))}
      </div>
    </div>
  );
};

// BurgerIngredientsTab.propTypes = {
//   icon: PropTypes.element.isRequired,
//   text: PropTypes.string.isRequired,
//   active: PropTypes.bool
// }
