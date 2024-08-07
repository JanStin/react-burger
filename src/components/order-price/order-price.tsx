import React, { useMemo } from "react";
import { useSelector } from "../../services/store";
import { TRootState } from "../../services/store";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./styles.module.css";

type TOrderPriceProps = {
  ingredients: string[];
};

export const OrderPrice = ({
  ingredients,
}: TOrderPriceProps): React.JSX.Element => {
  const { ingredients: allIngredients } = useSelector(
    (state: TRootState) => state.ingredients
  );

  const totalPrice = useMemo(() => {
    if (allIngredients === null) {
      return 0;
    }

    const ingredientMap = new Map<string, number>();

    allIngredients.forEach((ingredient) => {
      ingredientMap.set(ingredient._id, ingredient.price);
    });

    return ingredients.reduce((total, id) => {
      const price = ingredientMap.get(id);
      return total + (price !== undefined ? price : 0);
    }, 0);
  }, [ingredients, allIngredients]);

  return (
    <div className={styles.price}>
      {totalPrice}
      <CurrencyIcon type="primary" />
    </div>
  );
};
