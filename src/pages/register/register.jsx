import styles from "./styles.module.css";
import {
  Input,
  EmailInput,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";

export const RegisterPage = () => {
  return (
    <div class={styles.body}>
      <div class={styles.form}>
        <h1 class={styles.title}>Регистрация</h1>
        <Input
          type={"text"}
          placeholder={"Имя"}
          // onChange={(e) => setValue(e.target.value)}
          // value={value}
          // ref={inputRef}
          // onIconClick={onIconClick}
          name={"name"}
          error={false}
          errorText={"Ошибка"}
          size={"default"}
          extraClass="mb-6"
        />
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
            Зарегистрироваться
          </Button>
        </div>
        <p class={styles.text}>
          Уже зарегистрированы?{" "}
          <Link to="/login" className={styles.link}>
            Войти
          </Link>
        </p>
      </div>
    </div>
  );
};
