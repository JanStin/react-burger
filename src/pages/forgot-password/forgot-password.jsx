import styles from "./styles.module.css";
import {
  EmailInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";

export const ForgotPasswordPage = () => {
  return (
    <div class={styles.body}>
      <div class={styles.form}>
        <h1 class={styles.title}>Восстановление пароля</h1>
        <EmailInput
          // onChange={onChange}
          // value={value}
          name={"email"}
          placeholder="Укажите e-mail"
          isIcon={false}
          extraClass="mb-6"
        />
        <div class={styles.button}>
          <Button htmlType="button" type="primary" size="large">
            Восстановить
          </Button>
        </div>
        <p class={styles.text}>
          Вспомнили пароль?{" "}
          <Link to="/login" className={styles.link}>
            Войти
          </Link>
        </p>
      </div>
    </div>
  );
};
