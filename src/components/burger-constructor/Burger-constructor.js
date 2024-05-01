import React from "react";
import PropTypes from "prop-types";
import {
  CurrencyIcon,
  Button,
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Modal } from "../modal/Modal";
import { OrderDetails } from "../order-details/OrderDetails";
import styles from "./styles.module.css";

export const BurgerConstructor = ({ ingredientsList }) => {
  const [isOpen, onTrigger] = React.useState(false);

  const isLoading = React.useMemo(() => {
    return ingredientsList ? false : true;
  }, [ingredientsList]);

  const ingredients = React.useMemo(() => {
    let ingredients = Object.values(ingredientsList);
    const bun = ingredients.find((element) => element.type === "bun");
    ingredients = ingredients.filter((element) => element !== bun);

    return ingredients;
  }, [ingredientsList]);

  const bun = React.useMemo(() => {
    const ingredients = Object.values(ingredientsList);
    return ingredients.find((element) => element.type === "bun");
  }, [ingredientsList]);


  const sum = React.useMemo(() => {
    const result = ingredients.reduce(function (sum, elem) {
      return sum + elem.price;
    }, bun.price * 2);

    return result;
  }, [bun, ingredients]);

  return (
    <>
      {!isLoading && (
        <div className={styles.constructor}>
          <div className={styles.body}>
            <ConstructorElement
              type="top"
              isLocked={true}
              text={bun.name}
              price={bun.price}
              thumbnail={bun.image_mobile}
              extraClass={styles.bun}
            />
            <div className={styles.ingredients}>
              {ingredients.map((elem) => (
                <div className={styles.ingredient} key={elem._id}>
                  <DragIcon type="primary" />
                  <ConstructorElement
                    text={elem.name}
                    price={elem.price}
                    thumbnail={elem.image_mobile}
                  />
                </div>
              ))}
            </div>
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text={bun.name}
              price={bun.price}
              thumbnail={bun.image_mobile}
              extraClass={styles.bun}
            />
          </div>
          <div className={styles.bottom}>
            <div className={styles.price}>
              {sum}
              <CurrencyIcon type="primary" extraClass={styles.icon} />
            </div>
            <Button
              htmlType="button"
              type="primary"
              size="large"
              onClick={() => onTrigger(true)}
            >
              Оформить заказ
            </Button>
          </div>
        </div>
      )}

      {isOpen && (
        <Modal title="" onTrigger={onTrigger}>
          <OrderDetails />
        </Modal>
      )}
    </>
  );
};

BurgerConstructor.propTypes = {
  ingredientsList: PropTypes.array.isRequired,
};
