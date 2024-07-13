import styles from "./styles.module.css";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch } from "react-redux";
import { useDrag, DragSourceMonitor } from "react-dnd";
import { Link, useLocation } from "react-router-dom";
import {
  GET_INGREDIENT,
  OPEN_POPUP,
  INCREASE_INGREDIENT,
} from "../../services/actions/ingredientsData";
import {
  ADD_BUN,
  ADD_INGREDIENT,
  BUN,
} from "../../services/actions/constructor";
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

  const open = (): void => {
    dispatch({ type: GET_INGREDIENT, id: data._id });
    dispatch({ type: OPEN_POPUP });
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
            dispatch({ type: ADD_BUN, bun: clone });
          } else {
            dispatch({ type: ADD_INGREDIENT, item: clone });
          }

          dispatch({ type: INCREASE_INGREDIENT, id: clone._id });
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
