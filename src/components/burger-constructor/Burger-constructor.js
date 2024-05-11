import { useCallback, useState, useMemo } from "react";
import {
  CurrencyIcon,
  Button,
  ConstructorElement,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Modal } from "../modal/Modal";
import { OrderDetails } from "../order-details/OrderDetails";
import { BurgerConstructorIngredient } from "../burger-constructor-ingredient/Burger-constructor-ingredient";
import styles from "./styles.module.css";
import { useSelector, useDispatch } from "react-redux";
import { useDrop } from "react-dnd";
import {
  BUN,
  CHANGE_ORDER_INGREDIENTS,
} from "../../services/actions/constructor";
import { DECREASE_INGREDIANT } from "../../services/actions/ingredientsData";

export const BurgerConstructor = () => {
  const [isOpen, onTrigger] = useState(false);
  const { bun, ingredients } = useSelector((state) => state.constructor);
  const dispatch = useDispatch();
  const dropAnotherType = ["main", "sauce"];

  const collect = (monitor) => ({
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),
  });

  const dropBun = () => {
    if (bun !== undefined) {
      dispatch({ type: DECREASE_INGREDIANT, id: bun._id });
    }
  };

  const [{ canDrop, isOver }, dropBunTop] = useDrop(
    () => ({
      accept: BUN,
      drop: () => dropBun(),
      collect: (monitor) => collect(monitor),
    }),
    [bun]
  );

  const [, dropBunBottom] = useDrop(
    () => ({
      accept: BUN,
      drop: () => dropBun(),
      collect: (monitor) => collect(monitor),
    }),
    [bun]
  );

  const [, dropIngredients] = useDrop(
    () => ({
      accept: dropAnotherType,
      collect: (monitor) => collect(monitor),
    }),
    []
  );

  function selectBackgroundColor(isActive, canDrop) {
    if (isActive) {
      return "darkgreen";
    } else if (canDrop) {
      return "darkkhaki";
    } else {
      return "#222";
    }
  }

  const isActive = canDrop && isOver;
  const backgroundColor = selectBackgroundColor(isActive, canDrop);

  const sum = useMemo(() => {
    if (!bun || ingredients === undefined || ingredients.length === 0) {
      return 0;
    }

    const result = ingredients.reduce(function (sum, elem) {
      return sum + elem.price;
    }, bun.price * 2);

    return result;
  }, [bun, ingredients]);

  const moveIngredients = useCallback((dragIndex, hoverIndex) => {
    dispatch({
      type: CHANGE_ORDER_INGREDIENTS,
      toIndex: hoverIndex,
      fromIndex: dragIndex,
    });
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <div className={styles.constructor}>
        <div className={styles.body}>
          <div ref={dropBunTop}>
            {bun ? (
              <ConstructorElement
                type="top"
                isLocked={true}
                text={bun.name}
                price={bun.price}
                thumbnail={bun.image_mobile}
                extraClass={styles.bun}
              />
            ) : (
              <div className={styles.emptyBun} style={{ backgroundColor }}>
                Булка
              </div>
            )}
          </div>
          <div className={styles.ingredients} ref={dropIngredients}>
            {ingredients && ingredients.length > 0 ? (
              ingredients.map((elem, index) => (
                <BurgerConstructorIngredient
                  key={elem.key}
                  id={elem.key}
                  index={index}
                  elem={elem}
                  moveIngredients={moveIngredients}
                />
              ))
            ) : (
              <div className={styles.emptyIngredients}>Начинки</div>
            )}
          </div>
          <div ref={dropBunBottom}>
            {bun ? (
              <ConstructorElement
                type="bottom"
                isLocked={true}
                text={bun.name}
                price={bun.price}
                thumbnail={bun.image_mobile}
                extraClass={styles.bun}
              />
            ) : (
              <div className={styles.emptyBun} style={{ backgroundColor }}>
                Булка
              </div>
            )}
          </div>
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

      {isOpen && (
        <Modal title="" onTrigger={onTrigger}>
          <OrderDetails />
        </Modal>
      )}
    </>
  );
};
