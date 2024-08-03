import { useMemo, useRef, useState } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { BurgerIngredientsTab } from "../burger-ingredients-tab/burger-ingredients-tab";
import styles from "./styles.module.css";
import { useSelector } from "react-redux";
import { TIngredientType, TIngredientsArray } from "../../utils/types";
import { TRootState } from "../../services/store";

export const BurgerIngredients = (): React.JSX.Element => {
  const [currentType, setCurrentType] = useState<TIngredientType>("bun");
  const { ingredients }: TIngredientsArray = useSelector(
    (state: TRootState) => state.ingredients
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

  const listRef = useRef<HTMLDivElement>(null);
  const listRefCurrent: HTMLDivElement | null = listRef.current;

  const heightContainer = useMemo((): number => {
    if (listRefCurrent !== null) {
      return listRefCurrent.getBoundingClientRect().height;
    } else {
      return 0;
    }
  }, [listRefCurrent]);

  const scrollToSection = (index: string): void => {
    if (listRefCurrent) {
      const listNode: HTMLElement = Array.from(listRefCurrent.children).filter(
        (element: Element) => (element as HTMLElement).dataset.id === index
      )[0] as HTMLElement;

      if (listNode) {
        listNode.scrollIntoView({
          behavior: "smooth",
        });
      }
    }
  };

  const handleScroll = (): void => {
    if (listRefCurrent) {
      const listNodes: HTMLElement[] = Array.from(
        listRefCurrent.children
      ).reverse() as HTMLElement[];
      let currentTab: TIngredientType = currentType;

      listNodes.forEach((element) => {
        const top = element.getBoundingClientRect().top;

        if (top > 0 && top < heightContainer) {
          currentTab = element.dataset.id as TIngredientType;
        }
      });

      if (currentTab !== currentType) {
        setCurrentType(currentTab);
      }
    }
  };

  const handleTabClick = (e: TIngredientType): void => {
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
            onClick={(e) => handleTabClick(e as TIngredientType)}
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
    </>
  );
};
