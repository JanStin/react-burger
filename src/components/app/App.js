import React from "react";
import Header from "../app-header/App-header";
import { BurgerIngredients } from "../burger-ingredients/Burger-ingredients";
import { BurgerConstructor } from "../burger-constructor/Burger-constructor";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./styles.module.css";
import { loadIngredients } from "../../services/actions/ingredientsData";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function App() {
  const dispatch = useDispatch();
  const { loading, ingredients, error } = useSelector(
    (state) => state.ingredients
  );
  useEffect(() => {
    dispatch(loadIngredients());
  }, [dispatch]);

  return (
    <>
      <div className={styles.app}>
        <Header />
        {loading && "Загрузка..."}
        {error && "Произошла ошибка"}
        {!loading && !error && ingredients.length > 0 && (
          <main className={styles.main}>
            <DndProvider backend={HTML5Backend}>
              <div className={styles.column}>
                <BurgerIngredients />
              </div>
              <div className={styles.column}>
                <BurgerConstructor />
              </div>
            </DndProvider>
          </main>
        )}
      </div>
    </>
  );
}

export default App;
