import { useCallback, useMemo } from "react";
import {
  CurrencyIcon,
  Button,
  ConstructorElement,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Modal } from "../modal/modal";
import { OrderDetails } from "../order-details/order-details";
import { BurgerConstructorIngredient } from "../burger-constructor-ingredient/burger-constructor-ingredient";
import styles from "./styles.module.css";
import { useDispatch, useSelector } from "../../services/store";
import { useDrop, DropTargetMonitor } from "react-dnd";
import { ActionConstructorTypes } from "../../services/actions/constructor";
import { ActionIngredientsTypes } from "../../services/actions/ingredientsData";
import { postOrder, ActionOrderTypes } from "../../services/actions/order";
import { useNavigate } from "react-router-dom";
import { TIngredient, TIngredientsArray, TUser } from "../../utils/types";

type TBurgerConstructor = {
  bun: null | TIngredient;
} & TIngredientsArray;

type TCollectProps = {
  isOver: boolean;
  canDrop: boolean;
};

type TDragObject = {
  index: number;
  id: string;
  type: string;
};

export const BurgerConstructor = (): React.JSX.Element => {
  const BUN = "bun";
  const isOpenPoup = useSelector(
    state => state.order.isOpenPoup
  );
  const isLoading = useSelector(
    state => state.order.loading
  );
  const { bun, ingredients }: TBurgerConstructor = useSelector(
    state => state.constructor
  );
  const user: TUser | null = useSelector(store => store.user.user);
  const ingredientsLength: number = Array.isArray(ingredients)
    ? ingredients.length
    : 0;
  const dropAnotherType = ["main", "sauce"];
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const collect = (monitor: DropTargetMonitor): TCollectProps => ({
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),
  });

  const dropBun = (): void => {
    if (bun && typeof bun !== "boolean") {
      dispatch({ type: ActionIngredientsTypes.DECREASE_INGREDIENT, id: bun._id });
    }
  };

  const [{ canDrop, isOver }, dropBunTop] = useDrop<
    TDragObject,
    void,
    TCollectProps
  >(
    () => ({
      accept: BUN,
      drop: () => dropBun(),
      collect: (monitor) => collect(monitor),
    }),
    [bun]
  );

  const [, dropBunBottom] = useDrop<TDragObject, void, TCollectProps>(
    () => ({
      accept: BUN,
      drop: () => dropBun(),
      collect: (monitor) => collect(monitor),
    }),
    [bun]
  );

  const [, dropIngredients] = useDrop<TDragObject, void, TCollectProps>(
    () => ({
      accept: dropAnotherType,
      collect: (monitor) => collect(monitor),
    }),
    [ingredients]
  );

  function selectBackgroundColor(isActive: boolean, canDrop: boolean): string {
    if (isActive) {
      return "darkgreen";
    } else if (canDrop) {
      return "darkkhaki";
    } else {
      return "#222";
    }
  }

  const isActive: boolean = canDrop && isOver;
  const backgroundColor = selectBackgroundColor(isActive, canDrop);

  const sum = useMemo(() => {
    if (!bun || ingredientsLength === 0 || typeof bun === "boolean") {
      return 0;
    }

    const result = ingredients.reduce(function (
      sum: number,
      elem: TIngredient
    ): number {
      return sum + elem.price;
    },
    bun.price * 2);

    return result;
    // eslint-disable-next-line
  }, [bun, ingredientsLength]);

  const moveIngredients = useCallback(
    (dragIndex: number, hoverIndex: number): void => {
      dispatch({
        type: ActionConstructorTypes.CHANGE_ORDER_INGREDIENTS,
        toIndex: hoverIndex,
        fromIndex: dragIndex,
      });
    },
    // eslint-disable-next-line
    []
  );

  const onOrder = (): void => {
    if (!bun || ingredientsLength === 0 || typeof bun === "boolean") {
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

  const onCloseOrder = (): void => {
    dispatch({ type: ActionOrderTypes.CLOSE_ORDER });
  };

  return (
    <>
      {/** @ts-ignore */}
      <div className={styles.constructor}>
        <div className={styles.body}>
          <div ref={dropBunTop} data-test-id="bun-constructor">
            {bun && typeof bun !== "boolean" ? (
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
          <div className={styles.ingredients} ref={dropIngredients} data-test-id="constructor">
            {ingredients && ingredients.length > 0 ? (
              ingredients.map((elem, index) => (
                <BurgerConstructorIngredient
                  key={elem.key}
                  id={elem.key as string}
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
            {bun && typeof bun !== "boolean" ? (
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
            {/** @ts-ignore */}
            <CurrencyIcon type="primary" extraClass={styles.icon} />
          </div>
          <Button
            htmlType="button"
            type="primary"
            size="large"
            onClick={() => onOrder()}
            disabled={isLoading}
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
