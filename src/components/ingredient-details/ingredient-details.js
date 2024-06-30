import styles from "./styles.module.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { GET_INGREDIENT } from "../../services/actions/ingredientsData";

export const IngredientDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { popupData, ingredients } = useSelector((state) => state.ingredients);
  const ingredientsLength = Array.isArray(ingredients) ? ingredients.length : 0;

  useEffect(() => {
    if (ingredientsLength !== 0 && popupData === false) {
      dispatch({ type: GET_INGREDIENT, id: id });
    }
  }, [id, popupData, ingredientsLength, dispatch]);

  return (
    <div className={styles.body}>
      <img className={styles.image} src={popupData.image_large} alt="" />
      <p className={styles.title}>{popupData.name}</p>
      <div className={styles.values}>
        <div className={styles.value}>
          <p>Калории,ккал</p>
          <p className={styles.number}>{popupData.calories}</p>
        </div>
        <div className={styles.value}>
          <p>Белки, г</p>
          <p className={styles.number}>{popupData.proteins}</p>
        </div>
        <div className={styles.value}>
          <p>Жиры, г</p>
          <p className={styles.number}>{popupData.fat}</p>
        </div>
        <div className={styles.value}>
          <p>Углеводы, г</p>
          <p className={styles.number}>{popupData.carbohydrates}</p>
        </div>
      </div>
    </div>
  );
};
