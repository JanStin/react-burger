import styles from "./styles.module.css";
import { useSelector } from "react-redux";

export const IngredientDetails = () => {
  const popupData = useSelector((state) => state.ingredients.popupData);

  return (
    <div className={styles.body}>
      <img className={styles.image} src={popupData.image_large} alt="" />
      <p className={styles.title}>{popupData.name}</p>
      <div className={styles.values}>
        <div className={styles.value}>
          <p>Калории,ккал</p>
          <p className={styles.number}>{popupData.calories}</p>
        </div>
        <div className={styles.value}>
          <p>Белки, г</p>
          <p className={styles.number}>{popupData.proteins}</p>
        </div>
        <div className={styles.value}>
          <p>Жиры, г</p>
          <p className={styles.number}>{popupData.fat}</p>
        </div>
        <div className={styles.value}>
          <p>Углеводы, г</p>
          <p className={styles.number}>{popupData.carbohydrates}</p>
        </div>
      </div>
    </div>
  );
};
