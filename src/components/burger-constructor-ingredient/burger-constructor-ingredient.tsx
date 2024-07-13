import { useRef } from "react";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./styles.module.css";
import { useDispatch } from "react-redux";
import {
  useDrag,
  useDrop,
  DropTargetMonitor,
  DragSourceMonitor,
} from "react-dnd";
import { REMOVE_INGREDIENT } from "../../services/actions/constructor";
import { DECREASE_INGREDIENT } from "../../services/actions/ingredientsData";
import { TIngredient } from "../../utils/types";

type TBurgerConstructorIngredient = {
  id: string;
  elem: TIngredient;
  index: number;
  moveIngredients: (dragIndex: number, hoverIndex: number) => void;
};

type TDragObject = {
  index: number;
  id: string;
  type: string;
};

type TDropCollectedProps = {
  handlerId: string | symbol | null;
};

export const BurgerConstructorIngredient = ({
  id,
  elem,
  index,
  moveIngredients,
}: TBurgerConstructorIngredient): React.JSX.Element => {
  const ref = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const position = "ingredient";

  const handleClose = (elem: TIngredient): void => {
    dispatch({ type: DECREASE_INGREDIENT, id: elem._id });
    dispatch({ type: REMOVE_INGREDIENT, key: elem.key });
  };

  const [{ handlerId }, drop] = useDrop<
    TDragObject,
    never,
    TDropCollectedProps
  >({
    accept: position,
    collect(monitor: DropTargetMonitor): TDropCollectedProps {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: TDragObject, monitor: DropTargetMonitor): void {
      if (!ref.current) {
        return;
      }
      const dragIndex: number = item.index;
      const hoverIndex: number = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();

      if (!clientOffset) {
        return;
      }

      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      moveIngredients(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag<
    TDragObject,
    never,
    { isDragging: boolean }
  >({
    type: position,
    item: (): TDragObject => {
      return { id, index, type: position };
    },
    collect: (monitor: DragSourceMonitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity: number = isDragging ? 0 : 1;

  drag(drop(ref));

  return (
    <div
      className={styles.ingredient}
      ref={ref}
      style={{ opacity }}
      data-handler-id={handlerId}
    >
      <DragIcon type="primary" />
      <ConstructorElement
        text={elem.name}
        price={elem.price}
        thumbnail={elem.image_mobile}
        handleClose={() => handleClose(elem)}
      />
    </div>
  );
};
