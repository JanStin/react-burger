import React from "react";
import Header from "../app-header/App-header";
import { BurgerIngredients } from "../burger-ingredients/Burger-ingredients";
import { BurgerConstructor } from "../burger-constructor/Burger-constructor";
import { ingredients } from "../../utils/data.js";
import styles from "./styles.module.css";

function App() {
  const [state, setState] = React.useState({});
  // const [types, setTypes] = React.useState({});

  React.useEffect(() => {
    setState({state: ingredients});
  }, []);

  // const {data} = state;
  return (
    <div className={styles.app}>
      <Header />
      <main className={styles.main}>
        <div className={styles.column}>
          <BurgerIngredients data={state} />
        </div>
        <div className={styles.column}>
          <BurgerConstructor data={state} />
        </div>
      </main>
    </div>
  );
}

export default App;
