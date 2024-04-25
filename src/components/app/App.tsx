import React from "react";
import Header from "../app-header/App-header";
import { BurgerIngredients } from "../burger-ingredients/Burger-ingredients";
import { ingredients } from "../../utils/data.js";
import "./App.modules.css";

function App() {
  const [state, setState] = React.useState({});
  // const [types, setTypes] = React.useState({});

  React.useEffect(() => {
    setState({state: ingredients});
  }, []);

  // const {data} = state;
  return (
    <div className="app pl-4 pr-4">
      <Header />
      <main className="main">
        <div className="column pl-4 pr-4">
          <BurgerIngredients data={state} />
        </div>
        <div className="column pl-4 pr-4"></div>
      </main>
    </div>
  );
}

export default App;
