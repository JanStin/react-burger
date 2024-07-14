import styles from "./styles.module.css";
import {
  EmailInput,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import { useCallback, useState, ChangeEvent, FormEvent } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../services/actions/auth";

type TLoginForm = {
  email: string;
  password: string;
};

export const LoginPage = (): React.JSX.Element => {
  const [form, setValue] = useState<TLoginForm>({ email: "", password: "" });
  const dispatch = useDispatch();

  const submitClick = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      // @ts-ignore
      dispatch(login(form));
    },
    [dispatch, form]
  );

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className={styles.body}>
      <form className={styles.form} onSubmit={submitClick}>
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
          value={form.password as string}
          name={"password"}
          extraClass="mb-6"
        />
        <div className={styles.button}>
          <Button htmlType="submit" type="primary" size="large">
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
