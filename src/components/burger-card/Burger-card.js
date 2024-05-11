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
import { useDrag } from "react-dnd";
import {
  GET_POPUP_INGREDIANT,
  INCREASE_INGREDIANT,
} from "../../services/actions/ingredientsData";
import {
  ADD_BUN,
  ADD_INGREDIENT,
  BUN,
} from "../../services/actions/constructor";

export const BurgerCard = ({ data }) => {
  const [isOpen, onTrigger] = React.useState(false);
  const dispatch = useDispatch();

  const open = () => {
    dispatch({ type: GET_POPUP_INGREDIANT, id: data._id });
    onTrigger(true);
  };

  const [{ opacity }, drag] = useDrag(
    () => ({
      type: data.type,
      end(item, monitor) {
        const dropResult = monitor.getDropResult();
        if (item && dropResult) {
          let clone = { ...data };
          clone.key = crypto.randomUUID();

          if (data.type === BUN) {
            dispatch({ type: ADD_BUN, bun: clone });
          } else {
            dispatch({ type: ADD_INGREDIENT, item: clone });
          }

          dispatch({ type: INCREASE_INGREDIANT, id: clone._id });
        }
      },
      collect: (monitor) => ({
        opacity: monitor.isDragging() ? 0.4 : 1,
      }),
    }),
    [data]
  );

  return (
    <>
      <div
        className={styles.card}
        data-id={data._id}
        onClick={open}
        ref={drag}
        style={{ opacity: opacity }}
      >
        {data.count > 0 && (
          <Counter
            count={data.count}
            size={data.count > 10 ? "small" : "default"}
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
};
