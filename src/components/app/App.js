import React from "react";
import Header from "../app-header/App-header";
import { BurgerIngredients } from "../burger-ingredients/Burger-ingredients";
import { BurgerConstructor } from "../burger-constructor/Burger-constructor";
import styles from "./styles.module.css";

function App() {
  const ingredientsURL = "https://norma.nomoreparties.space/api/ingredients";
  const [ingredientsData, setIngredientsData] = React.useState({
    data: [],
    isLoading: true,
    hasError: false,
  });

  React.useEffect(() => {
    setIngredientsData({
      ...ingredientsData,
      hasError: false,
      isLoading: true,
    });
    fetch(ingredientsURL)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Ответ сети был не ok.");
        }
        return res.json();
      })
      .then((data) => {
        if (data.success) {
          setIngredientsData({
            ...ingredientsData,
            data,
            isLoading: false,
            hasError: false,
          });
        } else {
          setIngredientsData({
            ...ingredientsData,
            hasError: true,
            isLoading: false,
          });
        }
      })
      .catch((e) => {
        setIngredientsData({
          ...ingredientsData,
          hasError: true,
          isLoading: false,
        });
      });
    // eslint-disable-next-line
  }, []);

  const { data, isLoading, hasError } = ingredientsData;
  return (
    <>
      <div className={styles.app}>
        <Header />
        {isLoading && "Загрузка..."}
        {hasError && "Произошла ошибка"}
        {!isLoading && !hasError && (
          <main className={styles.main}>
            <div className={styles.column}>
              <BurgerIngredients data={data} />
            </div>
            <div className={styles.column}>
              <BurgerConstructor data={data} />
            </div>
          </main>
        )}
      </div>
    </>
  );
}

export default App;
