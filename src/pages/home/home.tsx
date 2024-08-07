import { useSelector } from "../../services/store";
import { Main } from "../../components/main/main";
import { TRootState } from "../../services/store";

export const HomePage = (): React.JSX.Element => {
  const { loading, ingredients, error } = useSelector(
    (state: TRootState) => state.ingredients
  );

  return (
    <>
      {loading && "Загрузка..."}
      {error && "Произошла ошибка"}
      {!loading && !error && ingredients !== null && ingredients.length > 0 && <Main />}
    </>
  );
};
