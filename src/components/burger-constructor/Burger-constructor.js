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
  const [state, setState] = React.useState({});

  React.useEffect(() => {
    if (data.state) {
      let ingredients = Object.values(data.state);
      const sum = ingredients.reduce(function (sum, elem) {
        return sum + elem.price;
      }, 0);
      const topBun = ingredients.shift();
      const bottomBun = ingredients.pop();

      setState({
        ...state,
        top: topBun,
        ingredients: ingredients,
        bottom: bottomBun,
        sum: sum,
      });
    }
  }, [data]);

  const { top, ingredients, bottom, sum } = state;
  return (
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
  );
};

// BurgerIngredients.propTypes = {
//   icon: PropTypes.element.isRequired,
//   text: PropTypes.string.isRequired,
//   active: PropTypes.bool
// }
