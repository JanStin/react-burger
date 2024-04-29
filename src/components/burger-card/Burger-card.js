import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.module.css";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { ModalOverlay } from "../modal-overlay/ModalOverlay";
import { Modal } from "../modal/Modal";
import { IngredientDetails } from "../ingredient-details/IngredientDetails";

export const BurgerCard = ({ number, data }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <>
      <div
        className={styles.card}
        data-id={data._id}
        onClick={() => setIsOpen(true)}
      >
        {(number > 0) && (
          <Counter count={number} size={number > 10 ? "small" : "default"} extraClass={styles.number} />
        )}
        <img src={data.image} className={styles.image} alt={data.name} />
        <div className={styles.price}>
          <span className={styles.span}>{data.price}</span> <CurrencyIcon />
        </div>
        <p className={styles.name}>{data.name}</p>
      </div>
      {isOpen && (
        <ModalOverlay setIsOpen={setIsOpen}>
          <Modal title="Детали ингредиента">
            <IngredientDetails data={data} />
          </Modal>
        </ModalOverlay>
      )}
    </>
  );
};

BurgerCard.propTypes = {
  data: PropTypes.object.isRequired,
  number: PropTypes.number,
};
