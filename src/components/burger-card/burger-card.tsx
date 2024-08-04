import styles from "./styles.module.css";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch } from "../../services/store";
import { useDrag, DragSourceMonitor } from "react-dnd";
import { Link, useLocation } from "react-router-dom";
import { ActionIngredientsTypes } from "../../services/actions/ingredientsData";
import { ActionConstructorTypes } from "../../services/actions/constructor";
import { TIngredient } from "../../utils/types";

type TBurgerCard = {
  data: TIngredient;
};

type TDragItem = {
  type: string;
};

type TDropResult = {
  [key: string]: any;
};

export const BurgerCard = ({ data }: TBurgerCard): React.JSX.Element => {
  const ingredientId: string = data._id;
  const dispatch = useDispatch();
  const location = useLocation();
  const BUN = "bun";

  const open = (): void => {
    dispatch({ type: ActionIngredientsTypes.GET_INGREDIENT, id: data._id });
    dispatch({ type: ActionIngredientsTypes.OPEN_POPUP });
  };

  const [{ opacity }, drag] = useDrag<
    TDragItem,
    TDropResult,
    { opacity: number }
  >(
    () => ({
      type: data.type,
      end(item: TDragItem | undefined, monitor: DragSourceMonitor) {
        const dropResult = monitor.getDropResult<TDragItem>();
        if (item && dropResult) {
          const clone = { ...data, key: crypto.randomUUID() };

          if (data.type === BUN) {
            dispatch({ type: ActionConstructorTypes.ADD_BUN, bun: clone });
          } else {
            dispatch({ type: ActionConstructorTypes.ADD_INGREDIENT, item: clone });
          }

          dispatch({
            type: ActionIngredientsTypes.INCREASE_INGREDIENT,
            id: clone._id,
          });
        }
      },
      collect: (monitor) => ({
        opacity: monitor.isDragging() ? 0.4 : 1,
      }),
    }),
    [data]
  );

  return (
    <Link
      key={ingredientId}
      // Тут мы формируем динамический путь для нашего ингредиента
      to={`/ingredients/${ingredientId}`}
      // а также сохраняем в свойство background роут,
      // на котором была открыта наша модалка
      state={{ background: location }}
      className={styles.link}
    >
      <div
        className={styles.card}
        data-id={data._id}
        onClick={open}
        ref={drag}
        style={{ opacity: opacity }}
      >
        {typeof data.count == "number" && data.count > 0 && (
          <Counter
            count={data.count}
            size={data.count > 10 ? "small" : "default"}
            extraClass={styles.number}
          />
        )}
        <img src={data.image} className={styles.image} alt={data.name} />
        <div className={styles.price}>
          {/** @ts-ignore */}
          <span className={styles.span}>{data.price}</span> <CurrencyIcon />
        </div>
        <p className={styles.name}>{data.name}</p>
      </div>
    </Link>
  );
};
