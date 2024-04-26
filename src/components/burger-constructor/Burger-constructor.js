import React from "react";
// import PropTypes from 'prop-types';
import {
  CurrencyIcon,
  Button,
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./styles.module.css";

export const BurgerConstructor = ({ data }) => {
  const [state, setState] = React.useState({
    top: [],
    ingredients: [],
    bottom: [],
    sum: 0,
    isLoading: true,
  });

  React.useEffect(() => {
    if (data.data) {
      let ingredients = Object.values(data.data);
      const bun = ingredients.find(element => element.type === "bun");
      ingredients = ingredients.filter(element => element !== bun);

      const sum = ingredients.reduce(function (sum, elem) {
        return sum + elem.price;
      }, bun.price * 2);

      setState({
        ...state,
        top: bun,
        ingredients: ingredients,
        bottom: bun,
        sum: sum,
        isLoading: false,
      });
    }
  }, [data]);

  const { top, ingredients, bottom, sum, isLoading } = state;

  return (
    <>
      {!isLoading && (
        <div className={styles.constructor}>
          <div className={styles.body}>
            <ConstructorElement
              type="top"
              isLocked={true}
              text={top.name}
              price={top.price}
              thumbnail={top.image_mobile}
              extraClass={styles.bun}
            />
            <div className={styles.ingredients}>
              {ingredients.map((elem) => (
                <div className={styles.ingredient}>
                  <DragIcon type="primary" />
                  <ConstructorElement
                    key={elem.id}
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
              text={bottom.name}
              price={bottom.price}
              thumbnail={bottom.image_mobile}
              extraClass={styles.bun}
            />
          </div>
          <div className={styles.bottom}>
            <div className={styles.price}>
              {sum}
              <CurrencyIcon type="primary" extraClass={styles.icon} />
            </div>
            <Button htmlType="button" type="primary" size="large">
              Оформить заказ
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

// BurgerIngredients.propTypes = {
//   icon: PropTypes.element.isRequired,
//   text: PropTypes.string.isRequired,
//   active: PropTypes.bool
// }
