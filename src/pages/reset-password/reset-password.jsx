import styles from "./styles.module.css";
import {
  Input,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";

export const ResetPasswordPage = () => {
  return (
    <div class={styles.body}>
      <div class={styles.form}>
        <h1 class={styles.title}>Восстановление пароля</h1>
        <PasswordInput
          // onChange={onChange}
          // value={value}
          placeholder="Введите новый пароль"
          name={"password"}
          extraClass="mb-6"
        />
        <Input
          type={"text"}
          placeholder={"Введите код из письма"}
          // onChange={(e) => setValue(e.target.value)}
          // value={value}
          // ref={inputRef}
          // onIconClick={onIconClick}
          name={"code"}
          error={false}
          errorText={"Ошибка"}
          size={"default"}
          extraClass="mb-6"
        />
        <div class={styles.button}>
          <Button htmlType="button" type="primary" size="large">
            Сохранить
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
