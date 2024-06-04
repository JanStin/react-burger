import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadIngredients } from "../../services/actions/ingredientsData";
import { useParams } from "react-router-dom";
import { GET_INGREDIENT } from "../../services/actions/ingredientsData";
import { IngredientDetails } from "../../components/ingredient-details/ingredient-details";
import styles from "./styles.module.css";

export const IngredientsDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { popupData, ingredients } = useSelector((state) => state.ingredients);
  const ingredientsLength = Array.isArray(ingredients) ? ingredients.length : 0;

  useEffect(() => {
    if (ingredientsLength === 0) {
      const fetchData = async () => {
        await dispatch(loadIngredients());
      };

      fetchData().then(() => {
        dispatch({ type: GET_INGREDIENT, id: id });
      });
    }
  }, [id, ingredientsLength, dispatch]);

  return (
    <div class={styles.body}>
      {popupData !== undefined && popupData ? (
        <IngredientDetails />
      ) : popupData === false ? (
        "Загрузка..."
      ) : (
        "Ингредеент не найден!"
      )}
    </div>
  );
};
