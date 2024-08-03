import styles from "./styles.module.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { GET_INGREDIENT } from "../../services/actions/ingredientsData";
import { TIngredient, TIngredientsArray } from "../../utils/types";
import { TRootState } from "../../services/store";

export type TIngredientDetails = {
  popupData: TIngredient | boolean;
} & TIngredientsArray;

export const IngredientDetails = (): React.JSX.Element => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { popupData, ingredients }: TIngredientDetails = useSelector(
    (state: TRootState) => state.ingredients
  );

  const ingredientsLength: number = Array.isArray(ingredients) ? ingredients.length : 0;

  useEffect(() => {
    if (ingredientsLength !== 0 && popupData === false) {
      dispatch({ type: GET_INGREDIENT, id: id });

    }
  }, [id, popupData, ingredientsLength, dispatch]);

  const isTIngredient = (data: any): data is TIngredient => {
    return (
      data &&
      typeof data === "object"
    );
  };

  return (
    <div className={styles.body}>
      {isTIngredient(popupData) && (
        <>
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
        </>
      )}
    </div>
  );
};
