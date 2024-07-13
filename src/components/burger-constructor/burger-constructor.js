import { useCallback, useMemo } from "react";
import {
  CurrencyIcon,
  Button,
  ConstructorElement,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Modal } from "../modal/modal";
import { OrderDetails } from "../order-details/order-details";
import { BurgerConstructorIngredient } from "../burger-constructor-ingredient/Burger-constructor-ingredient";
import styles from "./styles.module.css";
import { useSelector, useDispatch } from "react-redux";
import { useDrop } from "react-dnd";
import {
  BUN,
  CHANGE_ORDER_INGREDIENTS,
} from "../../services/actions/constructor";
import { DECREASE_INGREDIENT } from "../../services/actions/ingredientsData";
import { postOrder, CLOSE_ORDER } from "../../services/actions/order";
import { useNavigate } from "react-router-dom";

export const BurgerConstructor = () => {
  const { isOpenPoup } = useSelector((state) => state.order);
  const { bun, ingredients } = useSelector((state) => state.constructor);
  const ingredientsLength = Array.isArray(ingredients) ? ingredients.length : 0;
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user.user);
  const navigate = useNavigate();
  const dropAnotherType = ["main", "sauce"];

  const collect = (monitor) => ({
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),
  });

  const dropBun = () => {
    if (bun !== undefined) {
      dispatch({ type: DECREASE_INGREDIENT, id: bun._id });
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
    [ingredients]
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
    if (!bun || ingredientsLength === 0) {
      return 0;
    }

    const result = ingredients.reduce(function (sum, elem) {
      return sum + elem.price;
    }, bun.price * 2);

    return result;
    // eslint-disable-next-line
  }, [bun, ingredientsLength]);

  const moveIngredients = useCallback((dragIndex, hoverIndex) => {
    dispatch({
      type: CHANGE_ORDER_INGREDIENTS,
      toIndex: hoverIndex,
      fromIndex: dragIndex,
    });
    // eslint-disable-next-line
  }, []);

  const onOrder = () => {
    if (!bun || ingredientsLength === 0) {
      return;
    }

    if (!user) {
      navigate("/login");
      return;
    }

    let postIngredients = ingredients.map((item) => item._id);
    postIngredients.unshift(bun._id);
    postIngredients.push(bun._id);
    dispatch(postOrder(postIngredients));
  };

  const onCloseOrder = () => {
    dispatch({ type: CLOSE_ORDER });
  };

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
            onClick={() => onOrder()}
          >
            Оформить заказ
          </Button>
        </div>
      </div>

      {isOpenPoup && (
        <Modal title="" onTrigger={onCloseOrder}>
          <OrderDetails />
        </Modal>
      )}
    </>
  );
};
