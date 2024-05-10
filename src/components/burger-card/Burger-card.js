import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.module.css";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Modal } from "../modal/Modal";
import { IngredientDetails } from "../ingredient-details/IngredientDetails";
import { useDispatch } from "react-redux";
import { GET_POPUP_INGREDIANT } from "../../services/actions/ingredientsData";

export const BurgerCard = ({ number, data }) => {
  const [isOpen, onTrigger] = React.useState(false);
  const dispatch = useDispatch();

  const open = () => {
    dispatch({ type: GET_POPUP_INGREDIANT, id: data._id });
    onTrigger(true);
  };

  return (
    <>
      <div className={styles.card} data-id={data._id} onClick={open}>
        {number > 0 && (
          <Counter
            count={number}
            size={number > 10 ? "small" : "default"}
            extraClass={styles.number}
          />
        )}
        <img src={data.image} className={styles.image} alt={data.name} />
        <div className={styles.price}>
          <span className={styles.span}>{data.price}</span> <CurrencyIcon />
        </div>
        <p className={styles.name}>{data.name}</p>
      </div>
      {isOpen && (
        <Modal title="Детали ингредиента" onTrigger={onTrigger}>
          <IngredientDetails />
        </Modal>
      )}
    </>
  );
};

BurgerCard.propTypes = {
  data: PropTypes.object.isRequired,
  number: PropTypes.number,
};
