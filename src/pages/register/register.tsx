import styles from "./styles.module.css";
import {
  Input,
  EmailInput,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useCallback, useState, FormEvent, ChangeEvent } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { registeration } from "../../services/actions/auth";

type TRegisterPage = {
  name: string;
  email: string;
  password: string;
};

export const RegisterPage = (): React.JSX.Element => {
  const [form, setValue] = useState<TRegisterPage>({
    name: "",
    email: "",
    password: "",
  });

  const dispatch = useDispatch();

  const register = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      // @ts-ignore
      dispatch(registeration(form));
    },
    [dispatch, form]
  );

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className={styles.body}>
      <div className={styles.main}>
        <h1 className={styles.title}>Регистрация</h1>
        <form className={styles.form} onSubmit={register}>
          {/** @ts-ignore */}
          <Input
            type={"text"}
            placeholder={"Имя"}
            onChange={(e) => onChange(e)}
            value={form.name}
            name={"name"}
            error={false}
            errorText={"Ошибка"}
            size={"default"}
            extraClass="mb-6"
          />
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
            <Button htmlType="submit" type="primary" size="large">
              Зарегистрироваться
            </Button>
          </div>
        </form>
        <p className={styles.text}>
          Уже зарегистрированы?{" "}
          <Link to="/login" className={styles.link}>
            Войти
          </Link>
        </p>
      </div>
    </div>
  );
};
