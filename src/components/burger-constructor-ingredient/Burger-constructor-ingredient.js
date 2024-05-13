import { useRef } from "react";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./styles.module.css";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { useDrag, useDrop } from "react-dnd";
import { REMOVE_INGREDIENT } from "../../services/actions/constructor";
import { DECREASE_INGREDIENT } from "../../services/actions/ingredientsData";

export const BurgerConstructorIngredient = ({
  id,
  elem,
  index,
  moveIngredients,
}) => {
  const ref = useRef(null);
  const dispatch = useDispatch();
  const position = "ingredient";

  const handleClose = (elem) => {
    dispatch({ type: DECREASE_INGREDIENT, id: elem._id });
    dispatch({ type: REMOVE_INGREDIENT, key: elem.key });
  };

  const [{ handlerId }, drop] = useDrop({
    accept: position,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
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
  const [{ isDragging }, drag] = useDrag({
    type: position,
    item: () => {
      return { id, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const opacity = isDragging ? 0 : 1;
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

BurgerConstructorIngredient.propTypes = {
  id: PropTypes.string.isRequired,
  elem: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  moveIngredients: PropTypes.func.isRequired,
};
