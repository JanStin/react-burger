import React from "react";
import Header from "../app-header/App-header";
import { BurgerIngredients } from "../burger-ingredients/Burger-ingredients";
import { BurgerConstructor } from "../burger-constructor/Burger-constructor";
import { ingredients } from "../../utils/data.js";
import styles from "./styles.module.css";

function App() {
  const [state, setState] = React.useState({
    data: [],
    isLoading: true,
    hasError: false,
  });

  React.useEffect(() => {
    setState({ ...state, hasError: false, isLoading: true });
    fetch(`https://norma.nomoreparties.space/api/ingredients`)
      .then((res) => res.json())
      .then(data =>
        setState({ ...state, data, isLoading: false, hasError: false })
      )
      .catch((e) => {
        setState({ ...state, hasError: true, isLoading: false });
      });
  }, []);

  const { data, isLoading, hasError } = state;
  return (
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
  );
}

export default App;
