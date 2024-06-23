import styles from "./styles.module.css";
import {
  EmailInput,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../services/actions/auth";

export const LoginPage = () => {
  const [form, setValue] = useState({ email: "", password: "" });
  const dispatch = useDispatch();

  const loginClick = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(login(form));
    },
    [dispatch, form]
  );

  const onChange = (e) => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className={styles.body}>
      <form className={styles.form}>
        <h1 className={styles.title}>Вход</h1>
        <EmailInput
          onChange={(e) => onChange(e)}
          value={form.email}
          name={"email"}
          placeholder="E-mail"
          isIcon={true}
          extraClass="mb-6"
        />
        <PasswordInput
          onChange={(e) => onChange(e)}
          value={form.password}
          name={"password"}
          extraClass="mb-6"
        />
        <div className={styles.button}>
          <Button htmlType="button" type="primary" size="large" onClick={loginClick}>
            Войти
          </Button>
        </div>
        <p className={styles.text}>
          Вы — новый пользователь?{" "}
          <Link to="/register" className={styles.link}>
            Зарегистрироваться
          </Link>
        </p>
        <p className={styles.text}>
          Забыли пароль?{" "}
          <Link to="/forgot-password" className={styles.link}>
            Восстановить пароль
          </Link>
        </p>
      </form>
    </div>
  );
};
