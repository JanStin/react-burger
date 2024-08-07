import styles from "./styles.module.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "../../services/store";
import { useParams } from "react-router-dom";
import { ActionIngredientsTypes } from "../../services/actions/ingredientsData";
import { IngredientDetails } from "../../components/ingredient-details/ingredient-details";
import { TIngredient } from "../../utils/types";
import { TRootState } from "../../services/store";

export const IngredientDetailsPage = (): React.JSX.Element => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { popupData, ingredients } = useSelector(
    (state: TRootState) => state.ingredients
  );
  const ingredientsLength: number = Array.isArray(ingredients)
    ? ingredients.length
    : 0;

  useEffect(() => {
    if (ingredientsLength !== 0 && typeof id === "string") {
      dispatch({ type: ActionIngredientsTypes.GET_INGREDIENT, id: id });
    }
  }, [id, ingredientsLength, dispatch]);

  const isTIngredient = (data: any): data is TIngredient => {
    return data && typeof data === "object";
  };

  return (
    <div className={styles.body}>
      {isTIngredient(popupData) ? (
        <>
          <h1 className={styles.title}>Детали ингредиента</h1>
          <IngredientDetails />
        </>
      ) : popupData === false ? (
        "Загрузка..."
      ) : (
        "Ингредеент не найден!"
      )}
    </div>
  );
};
