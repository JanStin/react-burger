import React from "react";
// import PropTypes from 'prop-types';
// import '@ya.praktikum/react-developer-burger-ui-components/dist/ui/common.css';
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { BurgerIngredientsTab } from '../burger-ingredients-tab/Burger-ingredients-tab';
import styles from "./styles.module.css";

export const BurgerIngredients = ( {data} ) => {
  const [state, setState] = React.useState({
    currentType: "bun",
    ingredientTypes: [
      {
        id: "bun",
        name: "Булки",
      },
      {
        id: "main",
        name: "Соусы",
      },
      {
        id: "sauce",
        name: "Начинки",
      },
    ],
    ingredients: []
  });

  React.useEffect(() => {
    if (data.data) {
      const ingredients = Object.values(data.data);
      setState({...state, ingredients: ingredients});
    }
  }, [data]);

  function setCurrentType (event) {
    setState({...state, currentType: event})
  }



  const { currentType, ingredientTypes, ingredients } = state;
  return (
    <>
      <h1 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h1>
      <div style={{ display: "flex" }}>
        {ingredientTypes.map((type) => (
          <Tab
            key={type.id}
            active={currentType === type.id}
            value={type.id}
            onClick={setCurrentType}
          >
            {type.name}
          </Tab>
        ))}
      </div>
      <div className={styles.body}>
        {
          ingredientTypes.map(type => {
            const dataTab = ingredients.filter(element => {
              return element.type === type.id ? element : false;
            });
            return <BurgerIngredientsTab title={type.name} data={dataTab} key={type.id} />
          })
        }
      </div>
    </>
  );
};

// BurgerIngredients.propTypes = {
//   icon: PropTypes.element.isRequired,
//   text: PropTypes.string.isRequired,
//   active: PropTypes.bool
// }
