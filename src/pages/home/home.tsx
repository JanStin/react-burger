import { useSelector } from "react-redux";
import { Main } from "../../components/main/main";
import { TIngredientsReducer, TRootState } from "../../utils/types";

export const HomePage = (): React.JSX.Element => {
  const { loading, ingredients, error }: TIngredientsReducer = useSelector(
    (state: TRootState) => state.ingredients
  );

  return (
    <>
      {loading && "Загрузка..."}
      {error && "Произошла ошибка"}
      {!loading && !error && ingredients.length > 0 && <Main />}
    </>
  );
};
