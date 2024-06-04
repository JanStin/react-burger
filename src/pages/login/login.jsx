import styles from "./styles.module.css";
import {
  EmailInput,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";

export const LoginPage = () => {
  return (
    <div class={styles.body}>
      <div class={styles.form}>
        <h1 class={styles.title}>Вход</h1>
        <EmailInput
          // onChange={onChange}
          // value={value}
          name={"email"}
          placeholder="E-mail"
          isIcon={true}
          extraClass="mb-6"
        />
        <PasswordInput
          // onChange={onChange}
          // value={value}
          name={"password"}
          extraClass="mb-6"
        />
        <div class={styles.button}>
          <Button htmlType="button" type="primary" size="large">
            Войти
          </Button>
        </div>
        <p class={styles.text}>
          Вы — новый пользователь?{" "}
          <Link to="/register" className={styles.link}>
            Зарегистрироваться
          </Link>
        </p>
        <p class={styles.text}>
          Забыли пароль?{" "}
          <Link to="/forgot-password" className={styles.link}>
            Восстановить пароль
          </Link>
        </p>
      </div>
    </div>
  );
};
