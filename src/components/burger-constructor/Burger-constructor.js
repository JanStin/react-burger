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
import { useSelector } from "react-redux";

export const BurgerConstructor = () => {
  const [isOpen, onTrigger] = React.useState(false);
  const { bun, ingredients } = useSelector((state) => state.constructor);

  const sum = React.useMemo(() => {
    if (!bun || ingredients.length === 0) {
      return 0;
    }

    const result = ingredients.reduce(function (sum, elem) {
      return sum + elem.price;
    }, bun.price * 2);

    return result;
  }, [bun, ingredients]);

  return (
    <>
      <div className={styles.constructor}>
        <div className={styles.body}>
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
            <div className={styles.emptyBun}>Булка</div>
          )}
          <div className={styles.ingredients}>
            {ingredients && ingredients.length > 0 ? (
              ingredients.map((elem) => (
                <div className={styles.ingredient} key={elem._id}>
                  <DragIcon type="primary" />
                  <ConstructorElement
                    text={elem.name}
                    price={elem.price}
                    thumbnail={elem.image_mobile}
                  />
                </div>
              ))
            ) : (
              <div className={styles.emptyIngredients}>Начинки</div>
            )}
          </div>
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
            <div className={styles.emptyBun}>Булка</div>
          )}
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
