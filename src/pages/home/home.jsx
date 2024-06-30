import { useSelector } from "react-redux";
import { Main } from "../../components/main/main"

export const HomePage = () => {
  const { loading, ingredients, error } = useSelector(
    (state) => state.ingredients
  );

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
