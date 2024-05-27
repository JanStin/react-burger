import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { BurgerIngredients } from "../burger-ingredients/Burger-ingredients";
import { BurgerConstructor } from "../burger-constructor/Burger-constructor";
import styles from "./styles.module.css";

export const Main = () => {
  return (
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
  );
};
