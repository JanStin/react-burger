import styles from "./styles.module.css";
import {
  Input,
  EmailInput,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { registeration } from "../../services/actions/auth";

export const RegisterPage = () => {
  const [form, setValue] = useState({ name: "", email: "", password: "" });

  const dispatch = useDispatch();

  let register = useCallback(
    (e) => {
      e.preventDefault();
      console.log(form);
      dispatch(registeration(form));
    },
    [dispatch, form]
  );

  const onChange = (e) => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className={styles.body}>
      <div className={styles.main}>
        <h1 className={styles.title}>Регистрация</h1>
        <form className={styles.form}>
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
            <Button
              htmlType="button"
              type="primary"
              size="large"
              onClick={register}
            >
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
