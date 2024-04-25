import React from "react";
import PropTypes from "prop-types";
import "./Burger-card.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

export const BurgerCard = ({ number, data }) => {
  return (
    <div className="card" data-id={data._id}>
      {number && <div>{number}</div>}
      <img src={data.image} className="image mb-1 ml-4 mr-4" alt={data.name} />
      <div className="price mb-1 text text_type_digits-default">
        {data.price} <CurrencyIcon />
      </div>
      <p className="name text text_type_main-small">{data.name}</p>
    </div>
  );
};

// BurgerCard.propTypes = {
//   data: PropTypes.object.isRequired,
//   number: PropTypes.number,
// }
