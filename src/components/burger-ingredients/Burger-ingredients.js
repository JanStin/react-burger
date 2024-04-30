import React from "react";
import PropTypes from "prop-types";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { BurgerIngredientsTab } from "../burger-ingredients-tab/Burger-ingredients-tab";
import styles from "./styles.module.css";

export const BurgerIngredients = ({ ingredientsList }) => {
  const [ingredientsData, setIngredientsData] = React.useState({
    currentType: "bun",
    ingredients: [],
  });

  const ingredientTypes = [
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
  ];

  React.useEffect(() => {
    if (ingredientsList) {
      const ingredients = Object.values(ingredientsList);
      setIngredientsData({ ...ingredientsData, ingredients: ingredients });
    }
    // eslint-disable-next-line
  }, [ingredientsList]);

  function setCurrentType(event) {
    setIngredientsData({ ...ingredientsData, currentType: event });
  }

  const { currentType, ingredients } = ingredientsData;
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
        {ingredientTypes.map((type) => {
          const dataTab = ingredients.filter((element) => {
            return element.type === type.id ? element : false;
          });
          return (
            <BurgerIngredientsTab
              title={type.name}
              ingredients={dataTab}
              key={type.id}
            />
          );
        })}
      </div>
    </>
  );
};

BurgerIngredients.propTypes = {
  ingredientsList: PropTypes.array.isRequired,
};
