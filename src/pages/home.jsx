import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadIngredients } from "../services/actions/ingredientsData";
import { Main } from "../components/main/main"


export const Home = () => {
  const dispatch = useDispatch();
  const { loading, ingredients, error } = useSelector(
    (state) => state.ingredients
  );
  useEffect(() => {
    dispatch(loadIngredients());
  }, [dispatch]);

  return (
    <>
      {loading && "Загрузка..."}
      {error && "Произошла ошибка"}
      {!loading && !error && ingredients.length > 0 && (
        <Main />
      )}
    </>
  );
};
