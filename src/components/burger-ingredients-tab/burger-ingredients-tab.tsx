import styles from "./styles.module.css";
import { BurgerCard } from "../burger-card/burger-card";
import { TIngredientsArray } from "../../utils/types";

type TBurgerIngredientsTab = {
  title: string;
  id: string;
} & TIngredientsArray;

export const BurgerIngredientsTab = ({
  title,
  id,
  ingredients,
}: TBurgerIngredientsTab): React.JSX.Element => {
  return (
    <div className={styles.container} data-id={id}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.section}>
        {ingredients.map((item) => (
          <BurgerCard key={item._id} data={item} />
        ))}
      </div>
    </div>
  );
};
