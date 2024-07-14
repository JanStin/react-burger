import styles from "./styles.module.css";
import { Link } from "react-router-dom";

export const NotFoundPage = (): React.JSX.Element => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h1>404 Ошибка</h1>
          <p>Запращиваемой страницы не существует</p>
          <br />
          <br />
          <p>
            Вернутся на{" "}
            <Link to="/" className={styles.link}>
              главную
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
