import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadIngredients } from "../../services/actions/ingredientsData";
import { useParams } from "react-router-dom";
import { GET_INGREDIENT } from "../../services/actions/ingredientsData";
import { IngredientDetails } from "../../components/ingredient-details/IngredientDetails";
import styles from "./styles.module.css";

export const IngredientsDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const popupData = useSelector((state) => state.ingredients.popupData);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(loadIngredients());
    };

    fetchData().then(() => {
      dispatch({ type: GET_INGREDIENT, id: id });
    });
  }, [id, dispatch]);

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
