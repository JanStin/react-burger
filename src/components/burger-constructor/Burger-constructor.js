import React from "react";
import {
  CurrencyIcon,
  Button,
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Modal } from "../modal/Modal";
import { OrderDetails } from "../order-details/OrderDetails";
import styles from "./styles.module.css";
import { useSelector, useDispatch } from "react-redux";
import { useDrop } from "react-dnd";
import { BUN, REMOVE_INGREDIENT } from "../../services/actions/constructor";

export const BurgerConstructor = ({ allowedDropEffect }) => {
  const [isOpen, onTrigger] = React.useState(false);
  const { bun, ingredients } = useSelector((state) => state.constructor);
  const dispatch = useDispatch();
  const dropAnotherType = ["main", "sauce"];

  const sum = React.useMemo(() => {
    if (!bun || ingredients === undefined || ingredients.length === 0) {
      return 0;
    }

    const result = ingredients.reduce(function (sum, elem) {
      return sum + elem.price;
    }, bun.price * 2);

    return result;
  }, [bun, ingredients]);

  const collect = (monitor) => ({
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),
  });

  const [{ canDrop, isOver }, dropBunTop] = useDrop(
    () => ({
      accept: BUN,
      collect: (monitor) => collect(monitor),
    }),
    [allowedDropEffect]
  );

  const [, dropBunBottom] = useDrop(
    () => ({
      accept: BUN,
      collect: (monitor) => collect(monitor),
    }),
    [allowedDropEffect]
  );

  const [, dropIngredients] = useDrop(
    () => ({
      accept: dropAnotherType,
      collect: (monitor) => collect(monitor),
    }),
    [allowedDropEffect]
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
              ingredients.map((elem) => (
                <div
                  className={styles.ingredient}
                  key={elem.key}
                  data-key={elem.key}
                >
                  <DragIcon type="primary" />
                  <ConstructorElement
                    text={elem.name}
                    price={elem.price}
                    thumbnail={elem.image_mobile}
                    handleClose={() =>
                      dispatch({ type: REMOVE_INGREDIENT, key: elem.key })
                    }
                  />
                </div>
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
