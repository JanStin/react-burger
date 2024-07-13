import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { BurgerIngredients } from "../burger-ingredients/burger-ingredients";
import { BurgerConstructor } from "../burger-constructor/burger-constructor";
import styles from "./styles.module.css";

export const Main = (): React.JSX.Element => {
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
