import styles from "./styles.module.css";
import React, { useMemo } from "react";
import { useSelector } from "../../services/store";
import { TRootState } from "../../services/store";

type TFeedIcons = {
  order: string[];
};

export const FeedIcons = ({ order }: TFeedIcons): React.JSX.Element => {
  const { ingredients } = useSelector(state => state.ingredients);
  const icons = useMemo(() => {
    if (!ingredients) {
      return [];
    }

    const ingredientMap = new Map<string, string>();

    ingredients.forEach((ingredient) => {
      ingredientMap.set(ingredient._id, ingredient.image);
    });

    const result: string[] = [];
    order.forEach((ingredientId) => {
      const image = ingredientMap.get(ingredientId);
      if (typeof image === "string") {
        result.push(image);
      }
    });

    return result;
  }, [order, ingredients]);

  const maxIconsToShow = 6;
  const displayedIcons = icons.slice(0, maxIconsToShow);
  const remainingIconsCount = icons.length - maxIconsToShow;

  return (
    <div className={styles.line}>
      {displayedIcons.map((icon, index) => (
        <div className={styles.icon} key={index} style={{ transform: `translateX(-${index * 12}px)`, zIndex: (maxIconsToShow - index) }}>
          <img
            src={icon}
            alt={`ingredient-${index}`}
            className={styles.image}
          />
        </div>
      ))}
      {remainingIconsCount > 0 && (
        <div className={styles.icon} style={{ transform: `translateX(-${maxIconsToShow * 12}px)` }}>
          +{remainingIconsCount}
        </div>
      )}
    </div>
  );
};
