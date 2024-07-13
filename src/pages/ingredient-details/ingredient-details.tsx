import styles from "./styles.module.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { GET_INGREDIENT } from "../../services/actions/ingredientsData";
import { IngredientDetails, TIngredientDetails } from "../../components/ingredient-details/ingredient-details";
import { TIngredient, TRootState } from "../../utils/types";

export const IngredientDetailsPage = (): React.JSX.Element => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { popupData, ingredients }: TIngredientDetails = useSelector(
    (state: TRootState) => state.ingredients
  );
  const ingredientsLength: number = Array.isArray(ingredients) ? ingredients.length : 0;

  useEffect(() => {
    if (ingredientsLength !== 0) {
      dispatch({ type: GET_INGREDIENT, id: id });
    }
  }, [id, ingredientsLength, dispatch]);

  const isTIngredient = (data: any): data is TIngredient => {
    return (
      data &&
      typeof data === "object"
    );
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
