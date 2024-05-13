import { useMemo, useRef, useState } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { BurgerIngredientsTab } from "../burger-ingredients-tab/Burger-ingredients-tab";
import { Modal } from "../modal/Modal";
import { IngredientDetails } from "../ingredient-details/IngredientDetails";
import styles from "./styles.module.css";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { CLOSE_POPUP } from "../../services/actions/ingredientsData";

export const BurgerIngredients = () => {
  const dispatch = useDispatch();
  const [currentType, setCurrentType] = useState("bun");
  const { ingredients, popupIsOpen } = useSelector(
    (state) => state.ingredients
  );
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

  const listRef = useRef(null);
  const listRefCurrent = listRef.current;

  const heightContainer = useMemo(() => {
    if (listRefCurrent !== null) {
      return listRefCurrent.getBoundingClientRect().height;
    } else {
      return 0;
    }
  }, [listRefCurrent]);

  const scrollToSection = (index) => {
    const listNode = Array.from(listRefCurrent.children).filter(
      (element) => element.dataset.id === index
    )[0];

    listNode.scrollIntoView({
      behavior: "smooth",
    });
  };

  const onClosePoup = () => {
    dispatch({ type: CLOSE_POPUP });
  };

  const handleScroll = () => {
    const listNodes = Array.from(listRefCurrent.children).reverse();
    let currentTab = currentType;

    listNodes.forEach((element) => {
      const top = element.getBoundingClientRect().top;

      if (top > 0 && top < heightContainer) {
        currentTab = element.dataset.id;
      }
    });

    if (currentTab !== currentType) {
      setCurrentType(currentTab);
    }
  };

  const handleTabClick = (e) => {
    scrollToSection(e);
    setCurrentType(e);
  };

  return (
    <>
      <h1 className={styles.title}>Соберите бургер</h1>
      <div className={styles.tabs}>
        {ingredientTypes.map((type) => (
          <Tab
            key={type.id}
            active={currentType === type.id}
            value={type.id}
            onClick={(e) => handleTabClick(e)}
          >
            {type.name}
          </Tab>
        ))}
      </div>
      <div className={styles.body} ref={listRef} onScroll={handleScroll}>
        {ingredientTypes.map((type) => {
          const dataTab = ingredients.filter(
            (element) => element.type === type.id
          );
          return (
            <BurgerIngredientsTab
              title={type.name}
              ingredients={dataTab}
              key={type.id}
              id={type.id}
            />
          );
        })}
      </div>
      {popupIsOpen && (
        <Modal title="Детали ингредиента" onTrigger={onClosePoup}>
          <IngredientDetails />
        </Modal>
      )}
    </>
  );
};
